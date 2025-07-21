// app/page.tsx (ou pages/index.tsx, dependendo do seu setup)
'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { motion } from 'framer-motion';

// Função para determinar cores e estado com base no horário
function getSkyState(hour: number) {
  if (hour >= 6 && hour < 10) {
    return {
      label: 'Amanhecer',
      ballColor: '#FFA500',
      bgColor: '#87CEFA',
      yPercent: 60,
      showStars: false,
      showClouds: true,
    };
  } else if (hour >= 10 && hour < 18) {
    return {
      label: 'Dia',
      ballColor: '#FFD700',
      bgColor: '#87CEEB',
      yPercent: 30,
      showStars: false,
      showClouds: true,
    };
  } else if (hour >= 18 && hour < 20) {
    return {
      label: 'Entardecer',
      ballColor: '#FF8C00',
      bgColor: '#1E90FF',
      yPercent: 70,
      showStars: false,
      showClouds: false,
    };
  } else {
    return {
      label: 'Noite',
      ballColor: '#F8F8FF',
      bgColor: '#0D1B2A',
      yPercent: 80,
      showStars: true,
      showClouds: false,
    };
  }
}

function getRandomClouds(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 60 + 10,
    left: Math.random() * 100,
    size: Math.random() * 40 + 40,
  }));
}

function getRandomStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }));
}

export default function SkyPage() {
  const [hour, setHour] = useState(new Date().getHours());
  const [skyState, setSkyState] = useState(getSkyState(hour));
  const [clouds, setClouds] = useState(getRandomClouds(5));
  const [stars, setStars] = useState(getRandomStars(50));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSkyState(getSkyState(hour));
    setClouds(getRandomClouds(5));
    setStars(getRandomStars(50));
  }, [hour]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: skyState.bgColor,
        transition: 'background-color 2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Estrelas */}
      {skyState.showStars &&
        stars.map((star) => (
          <Box
            key={star.id}
            sx={{
              position: 'absolute',
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              backgroundColor: '#fff',
              borderRadius: '50%',
              opacity: 0.8,
            }}
          />
        ))}

      {/* Nuvens */}
      {skyState.showClouds &&
        clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            initial={{ x: '-100%' }}
            animate={{ x: '120%' }}
            transition={{ duration: 60 + Math.random() * 40, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              width: cloud.size,
              height: cloud.size / 2,
              backgroundColor: '#fff',
              borderRadius: '50%',
              opacity: 0.6,
              filter: 'blur(2px)',
            }}
          />
        ))}

      {/* Sol/Lua */}
      <motion.div
        key={skyState.label}
        initial={{ y: '100%' }}
        animate={{ y: `${skyState.yPercent}%` }}
        transition={{ duration: 5, ease: 'easeInOut' }}
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: skyState.ballColor,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 60px rgba(255,255,255,0.3)',
        }}
      />

      {/* Texto de horário */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 96,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="#fff" fontWeight={600}>
          {skyState.label} - {hour}:00h
        </Typography>
      </Box>

      {/* Hora atual */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 64,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="#fff">
          Hora atual: {currentTime.toLocaleTimeString()}
        </Typography>
      </Box>

      {/* Slider de hora manual */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          px: 2,
        }}
      >
        <Slider
          value={hour}
          onChange={(e, val) => setHour(val as number)}
          step={1}
          min={0}
          max={23}
          marks
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}