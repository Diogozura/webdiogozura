import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'ids is required' });

    let idsStr = Array.isArray(ids) ? ids[0] : ids;
    // ensure bracket format [id1,id2]
    if (!idsStr.startsWith('[')) idsStr = `[${idsStr}]`;

    const url = `${EXTERNAL_BASE}/harbors/${encodeURIComponent(idsStr)}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'failed to fetch harbors by ids', details: text });
    }
    const json = await resp.json();
    return res.status(200).json({ harbors: json });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
