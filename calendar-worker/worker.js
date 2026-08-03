const ADMIN_UID = "fxBdwCBgdKT36VjSo67Ip4v4wow2";
const FIREBASE_API_KEY = "AIzaSyCPuUcFt99zQsUI1lBDSEZkX-RJHtgs5BY";
const ALLOWED_ORIGIN = "https://latelierfleursetsens-create.github.io";

function cors(request, extra = {}) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...extra
  };
}

function json(request, value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: cors(request, { "Content-Type": "application/json; charset=utf-8" })
  });
}

async function verifyFirebaseAdmin(request) {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const idToken = auth.slice(7).trim();
  if (!idToken) return null;
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + encodeURIComponent(FIREBASE_API_KEY),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    }
  );
  if (!response.ok) return null;
  const data = await response.json();
  const user = Array.isArray(data.users) ? data.users[0] : null;
  return user && user.localId === ADMIN_UID ? user : null;
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return '"' + Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("") + '"';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(request) });

    if (request.method === "GET" && url.pathname === "/health") {
      return json(request, {
        ok: true,
        configured: Boolean(env.CALENDAR_KV),
        service: "MyBusiness Calendar",
        version: "6.0.0"
      });
    }

    if (request.method === "POST" && url.pathname === "/publish") {
      if ((request.headers.get("Origin") || "") !== ALLOWED_ORIGIN) {
        return json(request, { ok: false, message: "Origine refusée" }, 403);
      }
      if (!env.CALENDAR_KV) return json(request, { ok: false, message: "Binding CALENDAR_KV manquant" }, 503);
      const user = await verifyFirebaseAdmin(request);
      if (!user) return json(request, { ok: false, message: "Accès administrateur refusé" }, 403);
      let data;
      try { data = await request.json(); }
      catch { return json(request, { ok: false, message: "Corps JSON invalide" }, 400); }
      const token = String(data.token || "");
      const ics = String(data.ics || "");
      if (!/^[a-f0-9]{48,64}$/.test(token)) return json(request, { ok: false, message: "Token calendrier invalide" }, 400);
      if (!ics.startsWith("BEGIN:VCALENDAR") || !ics.includes("END:VCALENDAR") || ics.length > 1000000) {
        return json(request, { ok: false, message: "Calendrier invalide" }, 400);
      }
      const count = (ics.match(/BEGIN:VEVENT/g) || []).length;
      const updatedAt = new Date().toISOString();
      await env.CALENDAR_KV.put("feed:" + token, ics, { metadata: { updatedAt, count } });
      return json(request, { ok: true, updatedAt, count });
    }

    const match = url.pathname.match(/^\/calendar\/([a-f0-9]{48,64})\.ics$/);
    if (request.method === "GET" && match) {
      if (!env.CALENDAR_KV) return new Response("Calendrier indisponible", { status: 503 });
      const result = await env.CALENDAR_KV.getWithMetadata("feed:" + match[1], "text");
      if (!result.value) return new Response("Calendrier introuvable", { status: 404 });
      const etag = await sha256(result.value);
      if (request.headers.get("If-None-Match") === etag) return new Response(null, { status: 304, headers: { ETag: etag } });
      return new Response(result.value, {
        headers: {
          "Content-Type": "text/calendar; charset=utf-8",
          "Content-Disposition": "inline; filename=MyBusiness-Mariages.ics",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "ETag": etag,
          "Last-Modified": result.metadata?.updatedAt ? new Date(result.metadata.updatedAt).toUTCString() : new Date().toUTCString(),
          "X-Content-Type-Options": "nosniff"
        }
      });
    }

    return json(request, { ok: true, service: "MyBusiness Calendar", version: "6.0.0" });
  }
};
