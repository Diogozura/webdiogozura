import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid, Chip } from '@mui/material';
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
