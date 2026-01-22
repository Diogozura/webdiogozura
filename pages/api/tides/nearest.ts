import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

function safeGetFirst(arr: any[] | undefined) {
  if (!arr || arr.length === 0) return null;
  return arr[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) return res.status(400).json({ error: 'latitude and longitude are required' });

    const lat = Array.isArray(latitude) ? latitude[0] : latitude;
    const lng = Array.isArray(longitude) ? longitude[0] : longitude;

    const url = `${EXTERNAL_BASE}/nearest-harbor-independent-state/${encodeURIComponent(`[${lat},${lng}]`)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch nearest harbor', details: text });
    }
    const json = await resp.json();
    const nearest = safeGetFirst(json?.data);
    return res.status(200).json({ harbor: nearest, raw: json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
