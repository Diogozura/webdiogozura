import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { state } = req.query;
    if (!state) return res.status(400).json({ error: 'state is required' });

    const st = Array.isArray(state) ? state[0] : state;
    const url = `${EXTERNAL_BASE}/harbor_names/${encodeURIComponent(st)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch harbors', details: text });
    }
    const json = await resp.json();
    return res.status(200).json({ harbors: json?.data || json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
