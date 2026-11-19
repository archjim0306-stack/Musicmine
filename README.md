# Mi Estudio 🎤

App web instalable (PWA) para crear canciones con IA: escribe o corrige letras para que rimen, propone acordes y tempo, y toca una pista con melodía guía estilo karaoke.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png` | Para instalarla como app en el celular |
| `sw.js` | Hace que abra rápido y funcione sin internet (excepto la IA) |
| `worker.js` | **Opcional.** Servidor en Cloudflare para esconder tu API key |

## 1. Publicar en GitHub Pages

1. En GitHub crea un repositorio nuevo, por ejemplo `mi-estudio` (público).
2. **Add file → Upload files** y sube todos los archivos de esta carpeta (menos `worker.js` y este README si quieres).
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)` → **Save**.
4. En 1–2 minutos tu app queda en `https://TU-USUARIO.github.io/mi-estudio/`.

## 2. Conectar la IA

**Opción gratis — Google Gemini (recomendada):**
1. Entra a <https://aistudio.google.com> con tu cuenta de Google.
2. Toca **Get API key → Create API key** y cópiala (empieza con `AIza`). No pide tarjeta.
3. En la app: ⚙️ → **Gemini (gratis)** → pega la clave → Guardar.

El plan gratis tiene un límite de solicitudes por minuto y por día; si lo alcanzas, la app te avisa y solo esperas. Google puede usar lo que se envía en el plan gratis para mejorar sus productos.

**Opción de pago — Claude API:** clave de <https://console.anthropic.com> (empieza con `sk-ant-`, requiere saldo prepago). En ⚙️ elige **Claude API**.

**Para compartir la app con otras personas (Claude):** usa `worker.js` en Cloudflare Workers:
1. <https://dash.cloudflare.com> → **Workers & Pages → Create → Worker** → **Deploy**.
2. **Edit code**, pega `worker.js` → **Deploy**.
3. **Settings → Variables and Secrets**: `ANTHROPIC_API_KEY` (Secret) y `ALLOWED_ORIGIN` = `https://TU-USUARIO.github.io`.
4. En la app: ⚙️ → **Mi servidor** → pega la URL del Worker.

## 3. Instalar en el celular

- **iPhone (Safari):** Compartir → *Agregar a pantalla de inicio*.
- **Android (Chrome):** menú ⋮ → *Instalar app*.

## Notas

- El dictado por voz funciona en Chrome (Android) y Safari (iPhone); en otros navegadores escribe la letra.
- La IA escribe la letra y los acordes; la música la genera la app con sintetizadores (no hay voz cantada).
- Las canciones guardadas viven en el navegador del celular.
- Para cambiar de modelo: ⚙️ → *Modelo* (por defecto `claude-sonnet-5-5`; `claude-haiku-5-5` es más barato).
