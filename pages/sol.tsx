// app/page.tsx (ou pages/index.tsx, dependendo do seu setup)
"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Slider, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Base from '@/src/components/common/Base';

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
  // return clouds with a layer (1..3) to vary speed
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 60 + 10,
    left: Math.random() * 100,
    size: Math.random() * 40 + 40,
    layer: Math.floor(Math.random() * 3) + 1,
  }));
}

function getRandomStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    twinkleDelay: Math.random() * 3,
    twinkleDuration: 1 + Math.random() * 2,
  }));
}

export default function SkyPage() {
  const [hour, setHour] = useState(new Date().getHours());
  const [skyState, setSkyState] = useState(getSkyState(hour));
  const [clouds, setClouds] = useState(getRandomClouds(6));
  const [stars, setStars] = useState(getRandomStars(60));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [meteors, setMeteors] = useState<any[]>([]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoType, setInfoType] = useState<'sun'|'moon'|null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSkyState(getSkyState(hour));
    setClouds(getRandomClouds(6));
    setStars(getRandomStars(60));
  }, [hour]);

  // Meteors generator
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() > 0.85) {
        const id = Date.now() + Math.random();
        const startTop = Math.random() * 40 + 5; // 5%..45%
        const size = 2 + Math.random() * 3;
        const duration = 0.8 + Math.random() * 1.2;
        setMeteors(m => [...m, { id, startTop, size, duration }] );
        // remove after animation
        setTimeout(() => setMeteors(m => m.filter(x => x.id !== id)), (duration + 0.2) * 1000);
      }
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <Head>
        <title>Sol e Lua - Diogo zura</title>
      </Head>
      <Base>
        <Box
          sx={{
            width: '100%',
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: skyState.bgColor,
            transition: 'background-color 2s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
      {/* Estrelas (twinkle) */}
      {skyState.showStars &&
        stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: star.twinkleDuration, repeat: Infinity, delay: star.twinkleDelay }}
            style={{
              position: 'absolute',
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              backgroundColor: '#fff',
              borderRadius: '50%',
            }}
          />
        ))}

      {/* Meteoros */}
      {meteors.map(m => (
        <motion.div
          key={m.id}
          initial={{ x: '-10%', y: `${m.startTop}%`, opacity: 1 }}
          animate={{ x: '120%', y: `${m.startTop + 30}%`, opacity: 0.6 }}
          transition={{ duration: m.duration, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: m.size * 3,
            height: 2,
            background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))',
            transform: 'rotate(-25deg)',
            left: '-10%'
          }}
        />
      ))}

      {/* Nuvens (camadas parallax) */}
      {skyState.showClouds &&
        clouds.map((cloud) => {
          const baseDur = cloud.layer === 1 ? 70 : cloud.layer === 2 ? 110 : 160;
          const dur = baseDur + Math.random() * 80;
          const opacity = cloud.layer === 1 ? 0.9 : cloud.layer === 2 ? 0.7 : 0.45;
          const sizeMul = cloud.layer === 1 ? 1.2 : cloud.layer === 2 ? 1 : 0.8;
          return (
            <motion.div
              key={cloud.id}
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: `${cloud.top}%`,
                left: `${cloud.left}%`,
                width: cloud.size * sizeMul,
                height: (cloud.size * sizeMul) / 2,
                backgroundColor: '#fff',
                borderRadius: '50%',
                opacity,
                filter: 'blur(3px)',
              }}
            />
          );
        })}

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
          cursor: 'pointer',
        }}
        onClick={() => { setInfoType(skyState.showStars ? 'moon' : 'sun'); setInfoOpen(true); }}
      />

      {/* Info dialog for sun/moon */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
        <DialogTitle>
          {infoType === 'sun' ? 'Sol — Informações' : infoType === 'moon' ? 'Lua — Informações' : 'Informações'}
          <IconButton aria-label="close" onClick={() => setInfoOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 1 }}>Hora atual: {currentTime.toLocaleTimeString()}</Typography>
          <Typography sx={{ mb: 1 }}>Estado: {skyState.label}</Typography>
          <Typography sx={{ mb: 1 }}>Clique no sol/lua para abrir este painel.</Typography>
          <Button variant="contained" onClick={() => { setInfoOpen(false); }}>Fechar</Button>
        </DialogContent>
      </Dialog>

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
      </Base>
    </>
  );
}