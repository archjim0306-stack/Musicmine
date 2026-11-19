// Mi Estudio — Cloudflare Worker (opcional)
// Esconde tu API key de Anthropic para que puedas compartir la app sin exponerla.
//
// Variables del Worker (Settings → Variables and Secrets):
//   ANTHROPIC_API_KEY  (Secret)  → tu API key sk-ant-...
//   ALLOWED_ORIGIN     (Text)    → https://TU-USUARIO.github.io

const ALLOWED_MODELS = ['claude-sonnet-5-5', 'claude-haiku-5-5', 'claude-opus-5-5'];
const MAX_TOKENS = 4096;
const MAX_PROMPT_CHARS = 20000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    const cors = {
      'Access-Control-Allow-Origin': allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: { message: 'Método no permitido' } }, 405, cors);
    if (!allowed || origin !== allowed) return json({ error: { message: 'Origen no permitido' } }, 403, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: { message: 'JSON inválido' } }, 400, cors); }

    const msgs = Array.isArray(body.messages) ? body.messages : [];
    const size = JSON.stringify(msgs).length;
    if (!msgs.length || size > MAX_PROMPT_CHARS) return json({ error: { message: 'Solicitud demasiado grande' } }, 400, cors);

    const model = ALLOWED_MODELS.includes(body.model) ? body.model : ALLOWED_MODELS[0];

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model, max_tokens: MAX_TOKENS, stream: true, messages: msgs })
    });

    const headers = new Headers(cors);
    headers.set('content-type', upstream.headers.get('content-type') || 'text/event-stream');
    headers.set('cache-control', 'no-cache');
    return new Response(upstream.body, { status: upstream.status, headers });
  }
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, 'content-type': 'application/json' } });
}
