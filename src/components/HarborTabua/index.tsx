import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider, Chip } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
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

                    {/* container de eventos: ocupa o espaço restante e distribui eventos verticalmente */}
                    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, py: 1 }}>
                      {/* linha vertical da timeline */}
                      <Box sx={{ position: 'absolute', left: 40, top: 0, bottom: 0, width: 2, bgcolor: '#e6eef4' }} />

                      {events.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">Sem dados estruturados</Typography>
                      ) : (
                        events
                          .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                          .map((ev, ei) => {
                            const hnum = typeof ev.height === 'number' ? ev.height : (ev.height != null ? Number(ev.height) : NaN);
                            const labelLower = String(ev.label || '').toLowerCase();
                            const isHigh = labelLower.includes('high') || labelLower.includes('alta') || (hnum > 1);
                            const isLow = labelLower.includes('low') || labelLower.includes('baixa') || (hnum <= 1);
                            const eventDate = parseDateTime(dateIso || selectedDate || '', ev.time);
                            const isPast = isToday && eventDate ? eventDate.getTime() < new Date().getTime() : false;

                            return (
                              <Box key={`ev-${ei}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Box sx={{ ml: 2, zIndex: 2 }}>
                                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: isHigh ? themes.colors.Azul : isLow ? themes.colors.Vermelho : '#bfcad3', border: `3px solid ${'#fff'}`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }} />
                                  </Box>
                                  <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: isPast ? 'text.secondary' : 'text.primary', textDecoration: isPast ? 'line-through' : 'none' }}>{formatTimeShort(String(ev.time || '—'))}</Typography>
                                    <Typography variant="caption" color={isPast ? 'text.secondary' : 'text.secondary'}>{isHigh ? 'Maré alta' : isLow ? 'Maré baixa' : ev.label.replace(/_/g, ' ')}</Typography>
                                  </Box>
                                </Box>

                                <Box>
                                  {ev.height != null && !isNaN(Number(ev.height)) ? (
                                    <Chip label={`${Number(ev.height).toFixed(2)} m`} size="small" sx={{ bgcolor: '#f3f6f8', fontWeight: 700 }} />
                                  ) : (
                                    ev.height != null && <Chip label={`${String(ev.height)} m`} size="small" />
                                  )}
                                </Box>
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
