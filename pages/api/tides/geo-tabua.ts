import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lat, lng, state, date } = req.query;
    if (!lat || !lng || !state) return res.status(400).json({ error: 'lat, lng and state are required' });

    const latStr = Array.isArray(lat) ? lat[0] : lat;
    const lngStr = Array.isArray(lng) ? lng[0] : lng;
    const stateStr = Array.isArray(state) ? state[0] : state;
    const dayDate = date ? (Array.isArray(date) ? date[0] : date) : new Date().toISOString().split('T')[0];

    const dt = new Date(dayDate);
    const month = dt.getMonth() + 1;
    const day = dt.getDate();

    const latlng = `[${latStr},${lngStr}]`;
    const url = `${EXTERNAL_BASE}/geo-tabua-mare/${encodeURIComponent(latlng)}/${encodeURIComponent(stateStr)}/${month}/${encodeURIComponent(`[${day}]`)}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch geo tabua', details: text });
    }
    const json = await resp.json();
    return res.status(200).json({ geo: json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
