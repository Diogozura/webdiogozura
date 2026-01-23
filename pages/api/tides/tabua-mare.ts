import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { harbor, month, days } = req.query;
    if (!harbor) return res.status(400).json({ error: 'harbor is required' });

    const harborId = Array.isArray(harbor) ? harbor[0] : harbor;
    
    // use UTC date to avoid timezone shifts
    const now = new Date();
    const monthVal = month ? Number(Array.isArray(month) ? month[0] : month) : now.getUTCMonth() + 1;
    
    let daysVal = days ? (Array.isArray(days) ? days[0] : days) : null;

    // parse and normalize days parameter
    if (!daysVal) {
      // default to today's day (UTC)
      daysVal = `[${now.getUTCDate()}]`;
    } else {
      // ensure days is in [n,m,...] format
      const dayStr = String(daysVal).trim();
      if (!dayStr.startsWith('[')) {
        // parse as comma-separated or single day: "22" => "[22]", "1,2,3" => "[1,2,3]"
        daysVal = `[${dayStr}]`;
      } else {
        daysVal = dayStr;
      }
    }

    const url = `${EXTERNAL_BASE}/tabua-mare/${encodeURIComponent(harborId)}/${encodeURIComponent(String(monthVal))}/${encodeURIComponent(daysVal)}`;

    console.log('[tabua-mare] request url:', url);
    console.log('[tabua-mare] parsed: harbor=%s, month=%d, days=%s (UTC day today=%d)', harborId, monthVal, daysVal, now.getUTCDate());

    const resp = await fetch(url);
    console.log('[tabua-mare] external status:', resp.status);
    if (!resp.ok) {
      const text = await resp.text();
      console.error('[tabua-mare] external error body:', text);
      return res.status(502).json({ error: 'failed to fetch tabua-mare', details: text });
    }
    const json = await resp.json();

    // produce a concise log for debugging (truncate if large)
    try {
      const s = JSON.stringify(json);
      if (s.length > 3000) {
        console.log('[tabua-mare] json (truncated):', s.slice(0, 3000) + '...');
      } else {
        console.log('[tabua-mare] json:', s);
      }
    } catch (e) {
      console.log('[tabua-mare] json (could not stringify)', e);
    }

    return res.status(200).json(json);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
