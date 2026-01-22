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
import { themes } from '@/styles/theme';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function MaresPage() {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

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
        if (!resp.ok) return;
        const json = await resp.json();
        setStatesList(json.states || []);
      } catch (e) {
        // ignore
      }
    };
    loadStates();
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    const loadHarbors = async () => {
      try {
        const resp = await fetch(`/api/tides/harbors?state=${encodeURIComponent(selectedState)}`);
        if (!resp.ok) return;
        const json = await resp.json();
        setHarborsList(json.harbors || []);
      } catch (e) {
        // ignore
      }
    };
    loadHarbors();
  }, [selectedState]);

  useEffect(() => {
    // if user selected a harbor manually, fetch tabua for it
    if (!selectedHarbor) return;
    const loadTabua = async () => {
      try {
        const resp = await fetch(`/api/tides/by-harbor?harbor=${encodeURIComponent(selectedHarbor)}&date=${selectedDate}`);
        if (!resp.ok) return;
        const json = await resp.json();
        const arr = json?.tabua?.data || json?.tabua || [];
        setManualTides(arr);
      } catch (e) {
        // ignore
      }
    };
    loadTabua();
  }, [selectedHarbor, selectedDate]);
console.log('tides', tides);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
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

          {location && !geoLoading && (
            <Alert severity="success" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  Localização: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  {location.accuracy && ` (precisão: ±${location.accuracy.toFixed(0)}m)`}
                </Typography>
              </Box>
            </Alert>
          )}

          {/* Seletor de Data */}
          {location && (
            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                type="date"
                label="Data"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: new Date().toISOString().split('T')[0],
                }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${themes.colors.Azul} 0%, ${themes.colors.AzulEscuro} 100%)`,
                  color: '#fff',
                }}
                onClick={() => {
                  // refresh manual fetch when user is manual selecting
                  if (selectedHarbor) setSelectedHarbor((s) => s);
                }}
              >
                Atualizar
              </Button>
            </Box>
          )}

          {/* Fallback: selecionar estado/porto caso localização não esteja disponível */}
          {!location && !geoLoading && (
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

          {/* Erro na API */}
          {tideError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {tideError}
            </Alert>
          )}

          {/* Dados de Marés (geolocal ou manual) */}
          {manualTides && manualTides.length > 0 && (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {manualTides.map((tide: any, idx: number) => (
                <TideCard key={`m-${idx}`} tide={tide} />
              ))}
            </Box>
          )}

          {(!manualTides || manualTides.length === 0) && tides && tides.length > 0 && (
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
