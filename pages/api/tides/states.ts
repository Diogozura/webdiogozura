import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch(`${EXTERNAL_BASE}/states`);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch states', details: text });
    }
    const json = await resp.json();
    return res.status(200).json({ states: json?.data || json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
