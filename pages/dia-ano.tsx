import React from 'react';
import moment from 'moment';
import {
  Box, Typography, LinearProgress, Container, Tooltip, useMediaQuery,
  useTheme,
} from '@mui/material';
import Base from '@/src/components/common/Base';
import Head from 'next/head';
import 'moment/locale/pt-br'; // Importa o idioma português

const DaysProgress: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(moment());

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

  // Responsividade
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Dia percorridos no ano - Diogo zura</title>
      </Head>
      <Base>

        <Container sx={{
          
          display: 'grid',
          alignItems: 'center'
        }}>
          <Box textAlign="center" p={3}>
            {/* Exibição dos dias */}


            {/* Tooltip com o Instagram */}
            <Tooltip title="Sugerido por @kimberly.oliveiraa">
              <Typography
                variant={isMobile ? 'h3' : 'h1'}
                component="h1"
                gutterBottom
              >
                <strong>{daysElapsed}</strong> / <strong>{totalDaysInYear}</strong> -{' '}
                {year}
              </Typography>
            </Tooltip>
            {/* Exibição do dia da semana */}
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              gutterBottom
             textTransform={'uppercase'}
            >
              {today.format('dddd')}
            </Typography>
            <Typography variant="h3" component={'h2'} gutterBottom>
              {currentTime.format('HH:mm:ss')}
            </Typography>
            {/* GIF - Adicionado */}
            <Tooltip title="Sugerido por @gusta.http">

           
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img
                src="/gifdança.gif" // Substitua pelo link do seu GIF
                alt="GIF sugerido por Gusta"
                style={{
                  maxWidth: isMobile ? '80%' : '50%',
                  borderRadius: '10px',
                }}
              />
            </Box>
            </Tooltip>
            {/* Barra de progresso */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 10, borderRadius: 5 }}
            />

            {/* Porcentagem (opcional) */}
            <Typography variant="body2" mt={1}>
              {progress.toFixed(2)}% do ano concluído
            </Typography>
          </Box>
        </Container>
      </Base>
    </>

  );
};

export default DaysProgress;
