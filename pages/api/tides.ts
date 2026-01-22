import type { NextApiRequest, NextApiResponse } from 'next';

const EXTERNAL_BASE = 'https://tabuamare.devtu.qzz.io/api/v2';

function safeGetFirst<T = any>(arr: any[] | undefined): T | null {
  if (!arr || arr.length === 0) return null;
  return arr[0] as T;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { latitude, longitude, date } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'latitude and longitude are required' });
    }

    const lat = Array.isArray(latitude) ? latitude[0] : latitude;
    const lng = Array.isArray(longitude) ? longitude[0] : longitude;
    const dayDate = date ? (Array.isArray(date) ? date[0] : date) : new Date().toISOString().split('T')[0];

    // 1) Find nearest harbor (independent state)
    const nearestUrl = `${EXTERNAL_BASE}/nearest-harbor-independent-state/${encodeURIComponent(`[${lat},${lng}]`)}`;
    const nearestResp = await fetch(nearestUrl);
    if (!nearestResp.ok) {
      const text = await nearestResp.text();
      return res.status(502).json({ error: 'failed to fetch nearest harbor', details: text });
    }
    const nearestJson = await nearestResp.json();
    const nearest = safeGetFirst(nearestJson?.data);

    if (!nearest) {
      return res.status(404).json({ error: 'no nearby harbor found', details: nearestJson });
    }

    // Try to derive a harbor identifier that the tabua-mare endpoint accepts.
    const possibleKeys = ['id', 'card', 'slug', 'harbor_id', 'code', 'port_slug'];
    let harborIdentifier: string | null = null;
    for (const k of possibleKeys) {
      if (nearest[k]) {
        harborIdentifier = String(nearest[k]);
        break;
      }
    }

    // Fallback: try harbor name (slugify) if none found
    if (!harborIdentifier && nearest.harbor_name) {
      harborIdentifier = String(nearest.harbor_name).toLowerCase().replace(/\s+/g, '-');
    }

    // 2) If we have a harbor identifier, request the tide table for the requested day
    const dt = new Date(dayDate);
    const month = dt.getMonth() + 1;
    const day = dt.getDate();

    if (harborIdentifier) {
      const tabuaUrl = `${EXTERNAL_BASE}/tabua-mare/${encodeURIComponent(harborIdentifier)}/${month}/${encodeURIComponent(`[${day}]`)}`;
      const tabuaResp = await fetch(tabuaUrl);
      if (tabuaResp.ok) {
        const tabuaJson = await tabuaResp.json();
        return res.status(200).json({ harbor: nearest, tabua: tabuaJson });
      }
      // otherwise continue to fallback response
    }

    // If we couldn't fetch tabua-mare, return nearest harbor data as fallback
    return res.status(200).json({ harbor: nearest, tabua: null });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
