import React from 'react';

interface Point {
  time: string; // HH:MM
  height: number;
}

interface TideChartProps {
  data: Point[];
  width?: number;
  height?: number;
}

function parseTimeToMinutes(t: string) {
  const m = t.match(/(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

export default function TideChart({ data, width = 400, height = 120 }: TideChartProps) {
  if (!data || data.length === 0) return null;

  const points = data.map((d) => ({ x: parseTimeToMinutes(d.time), y: d.height }));
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  const pad = 8;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const scaleX = (x: number) => ((x - xMin) / (xMax - xMin || 1)) * innerW + pad;
  const scaleY = (y: number) => innerH - ((y - yMin) / (yMax - yMin || 1)) * innerH + pad;

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Gráfico de marés">
      <rect x={0} y={0} width={width} height={height} fill="transparent" />
      {/* Y grid */}
      {[0, 0.5, 1].map((t, i) => (
        <line key={i} x1={pad} x2={width - pad} y1={pad + innerH * t} y2={pad + innerH * t} stroke="#e6f7fb" strokeWidth={1} />
      ))}
      {/* polyline */}
      <path d={path} fill="none" stroke="#1890ff" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {/* points */}
      {points.map((p, i) => (
        <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={3} fill="#1890ff" />
      ))}
      {/* x labels (first, mid, last) */}
      {[0, 0.5, 1].map((t, i) => {
        const xVal = Math.round(xMin + (xMax - xMin) * t);
        const hh = String(Math.floor(xVal / 60)).padStart(2, '0');
        const mm = String(xVal % 60).padStart(2, '0');
        return (
          <text key={i} x={pad + innerW * t} y={height - 2} fontSize={10} textAnchor="middle" fill="#333">{`${hh}:${mm}`}</text>
        );
      })}
      {/* y labels (min/max) */}
      <text x={pad} y={pad + innerH + 10} fontSize={10} fill="#333">{yMin.toFixed(2)}m</text>
      <text x={pad} y={pad + 10} fontSize={10} fill="#333">{yMax.toFixed(2)}m</text>
    </svg>
  );
}
