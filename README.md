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

Necesitas una API key de Anthropic: <https://console.anthropic.com> → *API Keys* → *Create Key* (se cobra por uso; cada canción cuesta centavos).

**Opción A — solo para ti (rápida):** abre la app, toca ⚙️, elige *Mi API key* y pégala. Se guarda únicamente en tu celular.

> ⚠️ No la uses así si vas a compartir el enlace con otras personas: cualquiera con acceso a tu celular o navegador podría verla.

**Opción B — para compartirla (recomendada):**

1. Entra a <https://dash.cloudflare.com> → **Workers & Pages → Create → Worker**, ponle `mi-estudio` y **Deploy**.
2. **Edit code**, borra todo, pega el contenido de `worker.js` y **Deploy**.
3. **Settings → Variables and Secrets**:
   - `ANTHROPIC_API_KEY` (tipo *Secret*) = tu API key
   - `ALLOWED_ORIGIN` (tipo *Text*) = `https://TU-USUARIO.github.io` (sin `/mi-estudio` y sin `/` al final)
4. Copia la URL del Worker (`https://mi-estudio.TU-USUARIO.workers.dev`).
5. En la app: ⚙️ → *Mi servidor (Worker)* → pega la URL → Guardar.

En la consola de Anthropic pon un **límite de gasto mensual** (*Settings → Limits*) para que nunca se pase.

## 3. Instalar en el celular

- **iPhone (Safari):** Compartir → *Agregar a pantalla de inicio*.
- **Android (Chrome):** menú ⋮ → *Instalar app*.

## Notas

- El dictado por voz funciona en Chrome (Android) y Safari (iPhone); en otros navegadores escribe la letra.
- La IA escribe la letra y los acordes; la música la genera la app con sintetizadores (no hay voz cantada).
- Las canciones guardadas viven en el navegador del celular.
- Para cambiar de modelo: ⚙️ → *Modelo* (por defecto `claude-sonnet-5-5`; `claude-haiku-5-5` es más barato).
