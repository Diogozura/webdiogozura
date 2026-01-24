import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  TextField,
} from '@mui/material';
import Head from 'next/head';
import Base from '@/src/components/common/Base';
import { useGeolocation } from '@/src/hooks/useGeolocation';
import { useTideAPI } from '@/src/hooks/useTideAPI';
import { useEffect } from 'react';
import TideCard from '@/src/components/TideCard';
import HarborTabua from '@/src/components/HarborTabua';
import { themes } from '@/styles/theme';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';

export default function MaresPage() {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  // initialize with today's date using UTC date to avoid timezone shift
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    // use toISOString to get UTC date, then extract YYYY-MM-DD
    const isoDate = now.toISOString().split('T')[0];
    return isoDate;
  });

  const shiftDate = (deltaDays: number) => {
    setSelectedDate((prev) => {
      const base = prev ? new Date(`${prev}T00:00:00Z`) : new Date();
      base.setUTCDate(base.getUTCDate() + deltaDays);
      return base.toISOString().split('T')[0];
    });
  };

  const formatDateBR = (iso: string) => {
    const [y, m, d] = iso.split('-').map((n) => Number(n));
    if (!y || !m || !d) return iso;
    return `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`;
  };

  const tideOptions = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        date: selectedDate,
      }
    : null;

  const { data: tides, loading: tideLoading, error: tideError } = useTideAPI(tideOptions);

  // States / harbors selection when geolocation not permitted
  const [statesList, setStatesList] = React.useState<any[]>([]);
  const [selectedState, setSelectedState] = React.useState<string | null>(null);
  const [harborsList, setHarborsList] = React.useState<any[]>([]);
  const [selectedHarbor, setSelectedHarbor] = React.useState<string | null>(null);
  const [manualTides, setManualTides] = React.useState<any[] | null>(null);

  useEffect(() => {
    // fetch states for fallback selector
    const loadStates = async () => {
      try {
        const resp = await fetch('/api/tides/states');
        if (!resp.ok) {
          console.error('loadStates: resp not ok', resp.status);
          return;
        }
        const json = await resp.json();
        console.log('loadStates response:', json);
        setStatesList(json.states || []);
      } catch (e) {
        console.error('loadStates error:', e);
      }
    };
    loadStates();
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    const loadHarbors = async () => {
      try {
        const resp = await fetch(`/api/tides/harbors?state=${encodeURIComponent(selectedState)}`);
        if (!resp.ok) {
          console.error('loadHarbors: resp not ok', resp.status);
          return;
        }
        const json = await resp.json();
        console.log('loadHarbors response:', json);
        setHarborsList(json.harbors || []);
      } catch (e) {
        console.error('loadHarbors error:', e);
      }
    };
    loadHarbors();
  }, [selectedState]);

  useEffect(() => {
    // if user selected a harbor manually, fetch tabua for it
    if (!selectedHarbor) return;
    const loadTabua = async () => {
      try {
        // call the explicit tabua-mare proxy which maps to /api/v2/tabua-mare/{harbor}/{month}/{days}
        // parse selectedDate as YYYY-MM-DD to avoid UTC timezone shifts
        const parts = String(selectedDate).split('-').map((v) => Number(v));
        const year = parts[0] || new Date().getFullYear();
        const month = parts[1] || (new Date().getMonth() + 1);
        const day = parts[2] || new Date().getDate();
        const daysParam = encodeURIComponent(`[${day}]`);
        const resp = await fetch(`/api/tides/tabua-mare?harbor=${encodeURIComponent(selectedHarbor)}&month=${month}&days=${daysParam}`);
        if (!resp.ok) {
          console.error('loadTabua: resp not ok', resp.status);
          return;
        }
        const json = await resp.json();
        console.log('loadTabua (tabua-mare) response:', json);
        // Normalize response shapes:
        // - { months: [...] } -> [obj]
        // - { data: [ { months: [...] } ] } -> data array
        // - array -> use as-is
        if (!json) {
          setManualTides([]);
        } else if (Array.isArray(json)) {
          setManualTides(json);
        } else if (json.months) {
          setManualTides([json]);
        } else if (Array.isArray(json.data) && json.data.length > 0) {
          setManualTides(json.data);
        } else {
          setManualTides([]);
        }
      } catch (e) {
        console.error('loadTabua error:', e);
      }
    };
    loadTabua();
  }, [selectedHarbor, selectedDate]);
console.log('tides', tides);
  // additional UI data
  const [harborDetails, setHarborDetails] = React.useState<any | null>(null);
  const [geoTabuaResult, setGeoTabuaResult] = React.useState<any | null>(null);

  const fetchHarborDetails = async (id: string) => {
    try {
      setHarborDetails(null);
      const resp = await fetch(`/api/tides/harbors-by-ids?ids=${encodeURIComponent(id)}`);
      if (!resp.ok) throw new Error('Falha ao obter detalhes do porto');
      const json = await resp.json();
      console.log('fetchHarborDetails response:', json);
      setHarborDetails(json.harbors || json);
    } catch (e: any) {
      console.error('fetchHarborDetails error:', e);
      setHarborDetails({ error: e.message || String(e) });
    }
  };

  const fetchGeoTabua = async (lat: number, lng: number, stateCode: string, dateStr: string) => {
    try {
      setGeoTabuaResult(null);
      const resp = await fetch(`/api/tides/geo-tabua?lat=${encodeURIComponent(String(lat))}&lng=${encodeURIComponent(String(lng))}&state=${encodeURIComponent(stateCode)}&date=${encodeURIComponent(dateStr)}`);
      if (!resp.ok) throw new Error('Falha ao obter tábua por geolocalização');
      const json = await resp.json();
      console.log('fetchGeoTabua response:', json);
      setGeoTabuaResult(json.geo || json);
      // if geo returned a tabua, map to manualTides for display
      const arr = json?.geo?.data || json?.geo?.tabua?.data || json?.geo?.tabua || [];
      if (Array.isArray(arr)) setManualTides(arr);
    } catch (e: any) {
      console.error('fetchGeoTabua error:', e);
      setGeoTabuaResult({ error: e.message || String(e) });
    }
  };
  return (
    <>
      <Head>
        <title>Marés — Diogo zura</title>
      </Head>
      <Base>
        <Container
          maxWidth="md"
          sx={{
            py: { xs: 4, md: 8 },
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Título */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Marés
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Informações de marés para sua localização
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="textSecondary">
                Dados de marés: Marinha do Brasil — fornecedor da API:&nbsp;
                <a href="https://tabuamare.devtu.qzz.io/docs" target="_blank" rel="noopener noreferrer">tabuamare.devtu.qzz.io/docs</a>
              </Typography>
            </Box>
          </Box>

          {/* Status de Localização */}
          {geoLoading && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>Obtendo sua localização...</Typography>
            </Box>
          )}

          {geoError && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {geoError}
            </Alert>
          )}

          

          {/* Controles de navegação de data (carrossel simples) */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => shiftDate(-1)}
              aria-label="Dia anterior"
              sx={{ minWidth: 44, width: 48, height: 48, borderRadius: '999px', p: 0.5, borderColor: `${themes.colors.Azul}55` }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>

            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
                {selectedDate ? formatDateBR(selectedDate) : '—'}
              </Typography>
            </motion.div>

            <Button
              variant="outlined"
              onClick={() => shiftDate(1)}
              aria-label="Próximo dia"
              sx={{ minWidth: 44, width: 48, height: 48, borderRadius: '999px', p: 0.5, borderColor: `${themes.colors.Azul}55` }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </Box>

          {/* Fallback: selecionar estado/porto caso localização não esteja disponível */}
          {(!location || geoError) && !geoLoading && (
            <Box sx={{ mb: 4 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Não foi possível obter sua localização. Escolha seu estado abaixo para procurar portos.
              </Alert>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  select
                  label="Estado"
                  value={selectedState || ''}
                  onChange={(e) => setSelectedState(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 220 }}
                >
                  <option value="">— Escolher estado —</option>
                  {statesList.map((s) => (
                    <option key={s.code || s} value={s.code || s}>
                      {s.name || s}
                    </option>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Porto"
                  value={selectedHarbor || ''}
                  onChange={(e) => setSelectedHarbor(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 320 }}
                >
                  <option value="">— Escolher porto —</option>
                  {harborsList.map((h) => (
                    <option key={h.id || h} value={h.card || h.slug || h.id || h}>
                      {h.name || h.harbor_name || h}
                    </option>
                  ))}
                </TextField>
                <Button
                  variant="outlined"
                  onClick={() => selectedHarbor && fetchHarborDetails(selectedHarbor)}
                  sx={{ height: 40 }}
                >
                  Ver detalhes
                </Button>
              </Box>
            </Box>
          )}

          {/* Carregando Marés */}
          {(tideLoading || (!location && selectedHarbor && !manualTides)) && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Carregando dados de marés...</Typography>
            </Box>
          )}

          {/* Mostrar detalhes do porto, se houver */}
          {harborDetails && (
            <Box sx={{ my: 2 }}>
              <Alert severity={harborDetails.error ? 'error' : 'info'}>
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{JSON.stringify(harborDetails, null, 2)}</pre>
              </Alert>
            </Box>
          )}

          {/* Botão para buscar tábua usando geolocalização dentro do estado selecionado */}
          {location && selectedState && (
            <Box sx={{ mb: 2 }}>
              <Button variant="outlined" onClick={() => fetchGeoTabua(location.latitude, location.longitude, selectedState, selectedDate)}>
                Buscar tábua no estado selecionado (geo)
              </Button>
            </Box>
          )}

          {/* Erro na API */}
          {tideError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {tideError}
            </Alert>
          )}

          {/* Dados de Marés (geolocal ou manual) */}
          {/** If the data contains harbor/months structure, use HarborTabua */}
          {manualTides && manualTides.length > 0 && manualTides[0]?.months && (
            <HarborTabua tabua={manualTides[0]} selectedDate={selectedDate} />
          )}

          {tides && tides.length > 0 && (tides[0] as any).months && (
            <HarborTabua tabua={tides[0]} selectedDate={selectedDate} />
          )}

          {/** Otherwise, if we have array of simple tide day objects, render TideCard */}
          {manualTides && Array.isArray(manualTides) && manualTides.length > 0 && !manualTides[0]?.months && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {manualTides.map((tide: any, idx: number) => (
                <TideCard key={`m-${idx}`} tide={tide} />
              ))}
            </Box>
          )}

          {tides && Array.isArray(tides) && tides.length > 0 && !(tides[0] as any).months && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {tides.map((tide, idx) => (
                <TideCard key={idx} tide={tide} />
              ))}
            </Box>
          )}

          {( (manualTides && manualTides.length === 0) || (tides && tides.length === 0) ) && !tideLoading && !tideError && (
            <Alert severity="info">
              Nenhum dado de marés disponível para esta data e localização.
            </Alert>
          )}
        </Container>
      </Base>
    </>
  );
}
