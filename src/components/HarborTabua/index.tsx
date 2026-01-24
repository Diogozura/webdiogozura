import React, { useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider, Chip } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import WavesIcon from '@mui/icons-material/Waves';
import { themes } from '@/styles/theme';

interface HarborTabuaProps {
  tabua: any;
  selectedDate?: string; // YYYY-MM-DD format
}

function extractEventsFromDay(day: any) {
  const events: { label: string; time?: string; height?: number | string }[] = [];

  if (!day || typeof day !== 'object') return events;

  // handle API shape with `hours: [{ hour, level }]`
  if (Array.isArray(day.hours) && day.hours.length > 0) {
    for (const h of day.hours) {
      const time = h.hour || h.time || h.h;
      const height = h.level ?? h.height ?? h.ht ?? null;
      events.push({ label: 'hora', time: time ? String(time).slice(0, 8) : undefined, height: height != null ? Number(height) : undefined });
    }
    return events;
  }

  if (Array.isArray(day.tides) && day.tides.length > 0) {
    for (const t of day.tides) {
      events.push({ label: t.type || 'maré', time: t.time || t.hour || t.h, height: t.height || t.ht });
    }
    return events;
  }

  const known = ['high_tide_1', 'low_tide_1', 'high_tide_2', 'low_tide_2'];
  for (const k of known) {
    if (day[k]) {
      const h = day[`${k}_height`] ?? day[`${k}_height_m`] ?? null;
      events.push({ label: k.replace(/_/g, ' '), time: day[k], height: h });
    }
  }

  // fallback: look for keys that look like time strings
  for (const [k, v] of Object.entries(day)) {
    if (typeof v === 'string' && /\d{1,2}:\d{2}/.test(v)) {
      if (!known.includes(k)) events.push({ label: k, time: v });
    }
  }

  return events;
}

function formatTimeShort(t?: string) {
  if (!t) return '—';
  const m = t.match(/(\d{1,2}:\d{2})/);
  return m ? m[1] : t;
}

function parseDateTime(dateIso?: string, time?: string) {
  if (!dateIso || !time) return null;
  // normalizar HH:MM[:SS]
  const m = String(time).match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!m) return null;
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ss = m[3] ? parseInt(m[3], 10) : 0;
  try {
    // montar Date no fuso local
    const d = new Date(dateIso);
    if (isNaN(d.getTime())) return null;
    d.setHours(hh, mm, ss, 0);
    return d;
  } catch {
    return null;
  }
}

function isSameDateISO(dateIso?: string, d = new Date()) {
  if (!dateIso) return false;
  const m = dateIso.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return false;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10) - 1;
  const da = parseInt(m[3], 10);
  return d.getFullYear() === y && d.getMonth() === mo && d.getDate() === da;
}

function generateHourlyTides(events: { label: string; time?: string; height?: number | string }[]) {
  const parsedEvents = events
    .map(e => {
      if (!e.time) return null;
      const [h, m] = e.time.split(':').map(Number);
      const minutes = h * 60 + m;
      const height = Number(e.height);
      return { minutes, height };
    })
    .filter((e): e is { minutes: number; height: number } => e !== null && !isNaN(e.height));

  parsedEvents.sort((a, b) => a.minutes - b.minutes);
  
  if (parsedEvents.length === 0) return [];

  const hours = [];
  // Determine min/max for the day to calibrate icons
  const minH = Math.min(...parsedEvents.map(e => e.height));
  const maxH = Math.max(...parsedEvents.map(e => e.height));
  const range = maxH - minH || 1;

  for (let h = 0; h < 24; h++) {
    const currentMinutes = h * 60;
    
    // clamp edges to nearest known event
    let prev = parsedEvents[0];
    let next = parsedEvents[parsedEvents.length - 1];
    
    for (let i = 0; i < parsedEvents.length; i++) {
        if (parsedEvents[i].minutes <= currentMinutes) prev = parsedEvents[i];
        if (parsedEvents[i].minutes >= currentMinutes) {
            next = parsedEvents[i];
            break;
        }
    }

    let interpolatedHeight = 0;
    if (parsedEvents.length === 1) {
       interpolatedHeight = parsedEvents[0].height;
    } else {
        if (currentMinutes <= parsedEvents[0].minutes) {
             // Clamp to first
             interpolatedHeight = parsedEvents[0].height;
        } else if (currentMinutes >= parsedEvents[parsedEvents.length-1].minutes) {
             // Clamp to last
             interpolatedHeight = parsedEvents[parsedEvents.length-1].height;
        } else {
            const timeDiff = next.minutes - prev.minutes;
            if (timeDiff === 0) {
                interpolatedHeight = prev.height;
            } else {
                 const ratio = (currentMinutes - prev.minutes) / timeDiff;
                 // Cosine interpolation
                 interpolatedHeight = prev.height + (next.height - prev.height) * (1 - Math.cos(ratio * Math.PI)) / 2;
            }
        }
    }
    
    // Classification of wave size
    // 0..33% -> small, 33..66% -> medium, 66..100% -> large
    const pct = (interpolatedHeight - minH) / range;
    let waveSize: 'small' | 'medium' | 'large' = 'medium';
    if(pct < 0.33) waveSize = 'small';
    else if(pct > 0.66) waveSize = 'large';

    hours.push({ hour: h, height: interpolatedHeight, waveSize });
  }
  return hours;
}

export default function HarborTabua({ tabua, selectedDate }: HarborTabuaProps) {
  if (!tabua) return null;

  const harborName = tabua.harbor_name || tabua.name || tabua.card || tabua.id || 'Porto';
  const state = tabua.state || tabua.uf || '';
  
  // extract day from selectedDate (YYYY-MM-DD format)
  const selectedDay = selectedDate ? Number(String(selectedDate).split('-')[2]) : null;

  const months = Array.isArray(tabua.months) ? tabua.months : tabua.data?.months || [];

  return (
    <Card sx={{ p: { xs: 2, md: 3 }, border: `2px solid ${themes.colors.Azul}55`, background: 'linear-gradient(135deg, #f5fcff, #eef7ff)', boxShadow: '0 12px 38px -20px rgba(0,0,0,0.25)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <WaterIcon sx={{ color: themes.colors.Azul }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {harborName} {state ? `— ${state.toUpperCase()}` : ''}
          </Typography>
        </Box>

        {months.map((m: any, mi: number) => (
          <Box key={mi} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{m.month_name || `Mês ${m.month || ''}`}</Typography>

            {/* Novo layout: cartões de dias compactos em linha */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {(Array.isArray(m.days) ? m.days : []).map((d: any, di: number) => {
                const events = extractEventsFromDay(d);
                const dayLabel = d.day || d.date || d.day_number || d.day_of_month || (d?.date_iso ?? '') || `Dia ${di + 1}`;
                const dateIso = d.date_iso || (selectedDate || '');
                const isToday = isSameDateISO(dateIso);

                return (
                  <Card key={di} sx={{ width: 260, minHeight: 360, borderRadius: 3, p: 3, boxShadow: '0 12px 28px -18px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 900 }}>{dayLabel}</Typography>
                      <Typography variant="caption" color="textSecondary">{m.month_name || `Mês ${m.month || ''}`}</Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Visualização Horizontal por Hora (Estilo Previsão do Tempo) */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        overflowX: 'auto', 
                        gap: 1.5,
                        mt: 2,
                        pb: 1,
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': { height: 6 },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#dde4eb', borderRadius: 4 },
                        maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
                      }}
                    >
                      {events.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">Sem dados estruturados</Typography>
                      ) : (
                        generateHourlyTides(events).map((hStep) => {
                            const currentHour = new Date().getHours();
                            const isPast = isToday && hStep.hour < currentHour;
                            const isCurrent = isToday && hStep.hour === currentHour;

                            return (
                                <Box 
                                  key={hStep.hour}
                                  ref={(el: HTMLDivElement | null) => {
                                      if (el && isCurrent) {
                                          // Scroll to center this element
                                          el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                      }
                                  }}
                                  sx={{ 
                                    minWidth: 70,
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    p: 1.5, 
                                    borderRadius: 3, 
                                    bgcolor: isCurrent ? themes.colors.Azul : '#f8fafd',
                                    color: isCurrent ? '#fff' : 'inherit',
                                    opacity: isPast ? 0.5 : 1,
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                    <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.8 }}>
                                        {String(hStep.hour).padStart(2, '0')}:00
                                    </Typography>

                                    <WavesIcon sx={{ 
                                        fontSize: hStep.waveSize === 'small' ? 20 : hStep.waveSize === 'large' ? 32 : 24,
                                        color: isCurrent ? '#fff' : themes.colors.Azul,
                                        opacity: hStep.waveSize === 'small' ? 0.7 : 1
                                    }} />

                                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                        {hStep.height.toFixed(1)}m
                                    </Typography>
                                </Box>
                            );
                        })
                      )}
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
