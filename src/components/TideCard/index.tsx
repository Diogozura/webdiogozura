import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid, Chip, LinearProgress } from '@mui/material';
import { TideData } from '@/src/hooks/useTideAPI';
import { themes } from '@/styles/theme';
import WaterIcon from '@mui/icons-material/Water';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface TideCardProps {
  tide: TideData;
  loading?: boolean;
  error?: string | null;
}

export default function TideCard({ tide, loading, error }: TideCardProps) {
  if (loading) {
    return (
      <Card sx={{ textAlign: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando informações de marés...</Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${themes.colors.Azul}15 0%, transparent 100%)`,
        border: `2px solid ${themes.colors.Azul}`,
        borderRadius: 2,
        p: 3,
      }}
    >
      <CardContent>
        {/* Status atual (enchendo / esvaziando) */}
        {(!loading && !error) && (() => {
          // coletar eventos de maré disponíveis
          const events: { type: 'high' | 'low'; timeStr: string; height?: number | null; when?: Date }[] = [];
          if (tide.high_tide_1) events.push({ type: 'high', timeStr: tide.high_tide_1, height: tide.high_tide_1_height });
          if (tide.low_tide_1) events.push({ type: 'low', timeStr: tide.low_tide_1, height: tide.low_tide_1_height });
          if (tide.high_tide_2) events.push({ type: 'high', timeStr: tide.high_tide_2, height: tide.high_tide_2_height });
          if (tide.low_tide_2) events.push({ type: 'low', timeStr: tide.low_tide_2, height: tide.low_tide_2_height });

          const parseTime = (dateStr: string, timeStr: string) => {
            if (!timeStr) return null;
            // try ISO date (YYYY-MM-DD)
            const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr || '');
            try {
              if (isoMatch) {
                // create Date from dateStr + time
                return new Date(`${dateStr}T${timeStr}:00`);
              }
            } catch (e) {
              // fallback
            }
            // fallback: use today's date with provided time
            const now = new Date();
            const [hh, mm] = (timeStr || '00:00').split(':').map((s) => parseInt(s, 10) || 0);
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
            return d;
          };

          const enriched = events
            .map((ev) => ({ ...ev, when: parseTime(tide.date, ev.timeStr) }))
            .filter((e) => e.when instanceof Date && !isNaN(e.when.getTime()))
            .sort((a, b) => (a.when!.getTime() - b.when!.getTime()));

          const now = new Date();
          // find next event
          const nextIdx = enriched.findIndex((e) => e.when!.getTime() > now.getTime());
          const next = nextIdx >= 0 ? enriched[nextIdx] : enriched[0] || null;
          const prev = nextIdx > 0 ? enriched[nextIdx - 1] : (enriched.length > 0 ? enriched[enriched.length - 1] : null);

          let isRising: boolean | null = null;
          let progress = 0;
          if (prev && next) {
            isRising = prev.type === 'low' && next.type === 'high';
            const total = next.when!.getTime() - prev.when!.getTime();
            const elapsed = now.getTime() - prev.when!.getTime();
            progress = Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));
          }

          // próximos picos
          const nextHigh = enriched.find((e) => e.type === 'high' && e.when!.getTime() >= now.getTime());
          const nextLow = enriched.find((e) => e.type === 'low' && e.when!.getTime() >= now.getTime());

          return (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                <Chip
                  label={isRising == null ? 'Status: —' : isRising ? 'Enchendo' : 'Esvaziando'}
                  color={isRising ? 'primary' : 'default'}
                  sx={{ fontWeight: 700 }}
                />
                {nextHigh && (
                  <Typography variant="body2">Próxima Maré Alta: {nextHigh.timeStr}</Typography>
                )}
                {nextLow && (
                  <Typography variant="body2">Próxima Maré Baixa: {nextLow.timeStr}</Typography>
                )}
              </Box>
              {prev && next && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 2 }} />
                    <Typography variant="caption">Progresso: {progress}%</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })()}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WaterIcon sx={{ mr: 1, color: themes.colors.Azul }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Marés — {tide.date}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Maré Alta 1 */}
          {tide.high_tide_1 && (
            <Grid size={{xs: 12, sm: 6}} >
              <Box sx={{ p: 2, bgcolor: 'rgba(26, 200, 237, 0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ color: themes.colors.Azul, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Maré Alta 1
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: themes.colors.Azul }}>
                  {tide.high_tide_1}
                </Typography>
                {tide.high_tide_1_height && (
                  <Chip
                    label={`${tide.high_tide_1_height.toFixed(2)}m`}
                    size="small"
                    sx={{ mt: 1, bgcolor: themes.colors.Azul, color: '#fff' }}
                  />
                )}
              </Box>
            </Grid>
          )}

          {/* Maré Baixa 1 */}
          {tide.low_tide_1 && (
            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ p: 2, bgcolor: 'rgba(255, 116, 119, 0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingDownIcon sx={{ color: themes.colors.Vermelho, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Maré Baixa 1
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: themes.colors.Vermelho }}>
                  {tide.low_tide_1}
                </Typography>
                {tide.low_tide_1_height && (
                  <Chip
                    label={`${tide.low_tide_1_height.toFixed(2)}m`}
                    size="small"
                    sx={{ mt: 1, bgcolor: themes.colors.Vermelho, color: '#fff' }}
                  />
                )}
              </Box>
            </Grid>
          )}

          {/* Maré Alta 2 (se existir) */}
          {tide.high_tide_2 && (
            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ p: 2, bgcolor: 'rgba(26, 200, 237, 0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ color: themes.colors.Azul, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Maré Alta 2
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: themes.colors.Azul }}>
                  {tide.high_tide_2}
                </Typography>
                {tide.high_tide_2_height && (
                  <Chip
                    label={`${tide.high_tide_2_height.toFixed(2)}m`}
                    size="small"
                    sx={{ mt: 1, bgcolor: themes.colors.Azul, color: '#fff' }}
                  />
                )}
              </Box>
            </Grid>
          )}

          {/* Maré Baixa 2 (se existir) */}
          {tide.low_tide_2 && (
            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ p: 2, bgcolor: 'rgba(255, 116, 119, 0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingDownIcon sx={{ color: themes.colors.Vermelho, mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Maré Baixa 2
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: themes.colors.Vermelho }}>
                  {tide.low_tide_2}
                </Typography>
                {tide.low_tide_2_height && (
                  <Chip
                    label={`${tide.low_tide_2_height.toFixed(2)}m`}
                    size="small"
                    sx={{ mt: 1, bgcolor: themes.colors.Vermelho, color: '#fff' }}
                  />
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
