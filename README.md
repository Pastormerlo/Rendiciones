# Rendición de Fondo Fijo DTV

App web (PWA) para armar la rendición de fondo fijo desde el celular y sacarla en PDF.
Se instala como app, funciona sin señal y guarda los datos en el propio celular.

## Publicar en GitHub Pages
1. En GitHub: **New repository** (por ejemplo `rendiciones`). Con el plan gratuito tiene que ser **Public**.
2. **Add file → Upload files** y subir TODO el contenido de esta carpeta (`index.html`, `manifest.webmanifest`, `sw.js`, y las carpetas `icons` y `vendor`). **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, Branch **main** y carpeta **/ (root)**. **Save**.
4. En 1 o 2 minutos queda en `https://TU-USUARIO.github.io/rendiciones/` (el link aparece arriba en la misma pantalla de Pages).

## Instalar en el celular
- **Android (Chrome):** abrir el link y tocar **Instalar** (o menú ⋮ → *Instalar app*).
- **iPhone (Safari):** abrir el link → **Compartir** → **Agregar a pantalla de inicio**.
Abrirla una vez con señal para que quede lista para usar sin conexión.

## Actualizar la app
Reemplazar `index.html` en el repositorio (**Add file → Upload files**, mismo nombre) y hacer **Commit**. Cada celular toma la versión nueva la próxima vez que abre la app con señal.
Si se cambian los íconos o la carpeta `vendor`, subir también el número de `VERSION` dentro de `sw.js`.

## Cosas a tener en cuenta
- Los datos (encabezado, comprobantes y fotos) se guardan en el navegador de cada celular. Si se borran los datos del navegador, hay que cargar el encabezado de nuevo.
- El código publicado no incluye datos personales: cada persona carga su encabezado una sola vez.
- El logo de DirecTV viene incluido en la app: no hace falta cargarlo en cada celular y aparece solo en la carátula.
- Librería incluida: Cropper.js 1.5.13 (licencia MIT, ver `vendor/CROPPERJS-LICENSE.txt`).
