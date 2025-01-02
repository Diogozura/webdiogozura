import React from 'react';
import moment from 'moment';
import { Box, Typography, LinearProgress, Container, Tooltip } from '@mui/material';
import Base from '@/src/components/common/Base';
import Head from 'next/head';

const DaysProgress: React.FC = () => {
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

  return (
    <>
    <Head>
      <title>Dia percorridos no ano - Diogo zura</title>
    </Head>
      <Base>

        <Container sx={{
          height:'70vh',
          display:'grid',
          alignItems:'center'
        }}>
          <Box textAlign="center"  p={3}>
            {/* Exibição dos dias */}
            <Typography variant="h4" gutterBottom>
              {daysElapsed} / {totalDaysInYear} - {year}
            </Typography>

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
