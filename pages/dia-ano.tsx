import React from 'react';
import moment from 'moment';
import {
  Box, Typography, LinearProgress, Container, Tooltip, useMediaQuery,
  useTheme,
} from '@mui/material';
import Base from '@/src/components/common/Base';
import Head from 'next/head';
import Image from 'next/image';
import { themes } from '@/styles/theme';
import NavCards from '@/src/components/Cards/NavCards';

const DaysProgress: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(moment());

  // configura locale do moment
  React.useEffect(() => {
    try {
      require('moment/locale/pt-br');
      moment.locale('pt-br');
    } catch (e) {
      // ignore
    }
  }, []);

  // Atualiza o estado a cada segundo
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      setCurrentTime(now); // Atualiza a hora
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Atualiza os dias percorridos se o dia mudar (a cada 00:00)
  React.useEffect(() => {
    const checkMidnight = setInterval(() => {
      const now = moment();
      if (now.dayOfYear() !== currentTime.dayOfYear()) {
        setCurrentTime(now); // Atualiza para o novo dia
      }
    }, 1000);

    return () => clearInterval(checkMidnight); // Limpa o intervalo ao desmontar o componente
  }, [currentTime]);

  // Obtém a data atual e o ano atual
  const today = moment();
  const year = today.year();
  console.log('year', year)

  // Calcula o total de dias no ano atual
  const totalDaysInYear = today.isLeapYear() ? 366 : 365;

  // Calcula o número de dias percorridos
  const daysElapsed = today.dayOfYear();

  // Porcentagem para a barra de progresso
  const progress = (daysElapsed / totalDaysInYear) * 100;
  // Responsividade (corrige erro de isMobile não definido)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Head>
        <title>Dia percorridos no ano - Diogo zura</title>
      </Head>
      <Base>
        <Container
          sx={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, md: 8 },
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000,
              bgcolor: themes.colors.Branco,
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              p: { xs: 3, md: 5 },
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.05,
                  background: `linear-gradient(90deg, ${themes.colors.Azul}, ${themes.colors.AzulEscuro})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <strong>{daysElapsed}</strong> / <strong>{totalDaysInYear}</strong> — {year}
              </Typography>

              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                component="h2"
                gutterBottom
                textTransform={'uppercase'}
                sx={{ color: themes.colors.AzulEscuro, fontWeight: 600 }}
              >
                {today.format('dddd')}
              </Typography>

              <Typography variant={isMobile ? 'h5' : 'h4'} component={'h3'} gutterBottom sx={{ mb: 2 }}>
                {currentTime.format('HH:mm:ss')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <Tooltip title="Sugerido por @gusta.http">
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Image
                      src="/gifdança.gif"
                      alt="GIF sugerido por Gusta"
                      width={600}
                      height={400}
                      style={{
                        maxWidth: isMobile ? '90%' : '100%',
                        height: 'auto',
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                </Tooltip>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 14,
                      borderRadius: 10,
                      backgroundColor: '#eee',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 10,
                        background: `linear-gradient(90deg, ${themes.colors.AzulEscuro}, ${themes.colors.Azul})`,
                      }
                    }}
                  />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Progresso do ano
                </Typography>

                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                  {progress.toFixed(2)}% concluído — {daysElapsed} de {totalDaysInYear} dias
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Início do ano</Typography>
                    <Typography variant="body2">1 de janeiro</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Hoje</Typography>
                    <Typography variant="body2">{today.format('LL')}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Navigation cards to other pages */}
          <Box sx={{ mt: 2 }}>
            <NavCards />
          </Box>
        </Container>
      </Base>
    </>
  );
};

export default DaysProgress;
