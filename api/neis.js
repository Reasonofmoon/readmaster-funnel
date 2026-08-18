export default async function handler(req, res) {
  const allowed = new Set([
    "https://readmaster-funnel.vercel.app",
    "https://okgil-edu-hub.vercel.app",
    "http://127.0.0.1:4177",
    "http://localhost:4177",
  ]);
  const origin = String(req.headers.origin || "");
  const preview = /^https:\/\/readmaster-funnel(?:-git-[\w-]+)?-reasonofmoons-projects\.vercel\.app$/.test(origin);
  const okOrigin = origin && (allowed.has(origin) || preview);

  if (okOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  } else if (origin) {
    res.status(403).json({ error: "origin not allowed" });
    return;
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "GET only" });
    return;
  }

  const endpoint = String(req.query?.path || "");
  if (!/^[A-Za-z0-9]+$/.test(endpoint)) {
    res.status(400).json({ error: "bad path" });
    return;
  }
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(req.query || {})) {
    if (k === "path" || v == null) continue;
    q.set(k, Array.isArray(v) ? v[0] : String(v));
  }
  if (process.env.NEIS_KEY && !q.get("KEY")) q.set("KEY", process.env.NEIS_KEY);
  const r = await fetch(`https://open.neis.go.kr/hub/${endpoint}?${q}`);
  const text = await r.text();
  res.status(r.status);
  const type = r.headers.get("content-type") || "application/json; charset=utf-8";
  res.setHeader("content-type", type);
  res.send(text);
}
