import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { harbor, date } = req.query;
    if (!harbor) return res.status(400).json({ error: 'harbor is required' });

    const harborId = Array.isArray(harbor) ? harbor[0] : harbor;
    const dayDate = date ? (Array.isArray(date) ? date[0] : date) : new Date().toISOString().split('T')[0];
    const dt = new Date(dayDate);
    const month = dt.getMonth() + 1;
    const day = dt.getDate();

    const url = `${EXTERNAL_BASE}/tabua-mare/${encodeURIComponent(harborId)}/${month}/${encodeURIComponent(`[${day}]`)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch tabua-mare', details: text });
    }
    const json = await resp.json();
    return res.status(200).json({ tabua: json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
