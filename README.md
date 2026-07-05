# Web de ILS — Innovative Lighting Systems

Esta carpeta contiene la web completa de **ILS — Innovative Lighting Systems, S.L.**,
lista para subir a Hostinger. Está escrita en HTML, CSS y JavaScript "normales":
no necesita instalar nada ni ejecutar ningún programa de compilación. Se sube tal
cual y funciona.

Este documento está pensado para alguien **sin conocimientos de programación**.
Sigue los pasos con calma; no hace falta entender el código para publicar la web.

---

## 1. Qué hay en esta carpeta

```
andaltec-ils/
├── index.html          → Página de inicio
├── proyectos.html       → Página de proyectos
├── noticias.html        → Página de noticias
├── contacto.html        → Página de contacto (con formulario)
├── privacidad.html       → Política de privacidad
├── cookies.html          → Política de cookies
├── 404.html              → Página de "no encontrado"
├── css/styles.css        → Todo el diseño visual
├── js/main.js            → El comportamiento de la web (menú, cookies, formulario...)
├── js/i18n.js             → El sistema que traduce la web entre español e inglés
├── data/translations.json → TODOS los textos de la web, en español e inglés
├── data/projects.json     → Los proyectos que se muestran en "Proyectos"
├── data/news.json         → Las noticias que se muestran en "Noticias"
├── assets/                → Imágenes, logo e iconos
├── favicon y otros archivos técnicos (SEO, PWA)
```

**Lo único que normalmente necesitarás editar** son los tres archivos dentro de
`data/` (para cambiar textos, proyectos o noticias) y, una vez, un par de
"claves" dentro de `contacto.html` y del pie de página (ver secciones 4 y 5).

---

## 2. Cómo subir la web a Hostinger

Tienes dos formas. Si no sabes cuál elegir, usa la **Opción A**.

### Opción A: Administrador de archivos de Hostinger (la más sencilla)

1. Entra en **hPanel** (el panel de control de Hostinger) con tu usuario y
   contraseña.
2. Ve a **Archivos → Administrador de archivos**.
3. Entra en la carpeta **`public_html`** (es la carpeta raíz de tu dominio;
   si ya tienes archivos de ejemplo dentro, como `index.html`, puedes borrarlos).
4. Sube **todo el contenido de la carpeta `andaltec-ils/`** (no la carpeta en sí,
   sino lo que hay dentro: `index.html`, `css/`, `js/`, `data/`, `assets/`, etc.)
   directamente dentro de `public_html`. Puedes arrastrar y soltar los archivos,
   o usar el botón "Subir".
5. Si subes un archivo `.zip` con todo comprimido, Hostinger te permite hacer clic
   derecho sobre él y elegir **"Extraer"** para descomprimirlo dentro de
   `public_html`.
6. Espera unos segundos y visita tu dominio (por ejemplo,
   `https://andaltec-ils.com`) en el navegador. Ya deberías ver la web.

### Opción B: FTP (si prefieres un programa como FileZilla)

1. En hPanel, ve a **Archivos → Cuentas FTP** y anota el **host**, **usuario**,
   **contraseña** y **puerto** (normalmente 21).
2. Abre FileZilla (o el programa FTP que uses) y conecta con esos datos.
3. Navega hasta la carpeta `public_html` en el panel derecho (el servidor).
4. Arrastra todo el contenido de `andaltec-ils/` desde tu ordenador (panel
   izquierdo) hasta `public_html` (panel derecho).
5. Espera a que termine la subida y visita tu dominio en el navegador.

**Importante:** sube el *contenido* de la carpeta `andaltec-ils/`, no la carpeta
entera. Es decir, `index.html` debe quedar directamente dentro de `public_html`,
no dentro de `public_html/andaltec-ils/`.

---

## 3. Cómo ver la web en tu ordenador antes de subirla

Puedes hacer doble clic en `index.html` para abrirlo en el navegador, pero
algunos navegadores (sobre todo Chrome) bloquean por seguridad la carga de los
archivos de `data/` cuando abres el archivo directamente desde tu disco duro
(sin un servidor). Es normal que, al probarlo así, el menú o los proyectos no
carguen bien.

**Esto no es un problema real**: en cuanto subas la web a Hostinger (que sí es un
servidor de verdad), todo funcionará correctamente. Si quieres probarla en tu
ordenador exactamente igual que en producción, la forma más sencilla es subirla
primero a Hostinger y probarla ahí.

Un detalle ya corregido: antes, si abrías la web con doble clic (sin servidor)
y pulsabas "EN", los textos podían llegar a desaparecer por completo. Ahora,
en ese mismo caso, la web simplemente se queda con el texto en español en vez
de borrarlo; el cambio de idioma solo deja de "verse" del todo cuando la web se
sirve desde un servidor real (como Hostinger), que es como debe probarse de
todos modos.

---

## 4. El formulario de contacto (Web3Forms)

El formulario de la página de contacto envía los mensajes por correo usando un
servicio gratuito llamado **Web3Forms**. Ya está preparado para enviar los
mensajes a `comercial@andaltec.org` con copia a `cit@andaltec.org`, pero necesitas
una "clave" gratuita para activarlo:

1. Entra en **https://web3forms.com**.
2. Introduce el correo **comercial@andaltec.org** donde te lo pidan (será la
   dirección que reciba los mensajes) y pulsa "Create Access Key".
3. Revisa la bandeja de entrada de `comercial@andaltec.org`: Web3Forms enviará
   un correo para confirmar la dirección. Confírmalo.
4. Copia la clave larga de letras y números que te da Web3Forms (el "Access
   Key").
5. Abre el archivo **`contacto.html`** con el Bloc de notas (o cualquier editor
   de texto) y busca el texto:
   ```
   [[WEB3FORMS_ACCESS_KEY]]
   ```
   Sustitúyelo por la clave que has copiado, dejando las comillas tal cual.
   Por ejemplo:
   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-tu-clave-aqui">
   ```
6. Guarda el archivo y vuelve a subirlo a Hostinger (sustituyendo el anterior).

El formulario ya incluye protección anti-spam (un campo invisible) y validación
de los campos obligatorios.

---

## 5. El boletín de novedades (Mailchimp)

En el pie de página de todas las secciones hay un formulario para apuntarse al
boletín de noticias por correo. Para conectarlo a tu cuenta de Mailchimp:

1. Entra en tu cuenta de **Mailchimp** → **Audience** (Audiencia) → **Signup
   forms** (Formularios de inscripción) → **Embedded forms** (Formulario
   embebido).
2. Mailchimp te mostrará un bloque de código HTML. Dentro de ese código verás
   una línea parecida a:
   ```html
   <form action="https://tudominio.us21.list-manage.com/subscribe/post?u=XXXX&amp;id=YYYY" method="post" ...>
   ```
   y, más abajo, un campo oculto parecido a:
   ```html
   <input type="text" name="b_XXXX_YYYY" tabindex="-1" value="">
   ```
3. En los archivos **`index.html`**, **`proyectos.html`**, **`noticias.html`** y
   **`contacto.html`**, busca (con "Buscar y reemplazar" de tu editor de texto)
   el texto:
   ```
   [[MAILCHIMP_FORM_ACTION_URL]]
   ```
   y sustitúyelo por la URL completa de `action="..."` que te ha dado Mailchimp
   (el trozo `https://tudominio.us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY`).
4. Busca también el texto:
   ```
   [[MAILCHIMP_IDs]]
   ```
   y sustitúyelo por el nombre exacto del campo oculto que te ha dado Mailchimp
   (el trozo `b_XXXX_YYYY` de tu ejemplo, sin comillas).
5. Guarda los archivos y vuelve a subirlos.

Si en algún momento te resulta más cómodo, también puedes copiar y pegar
directamente el bloque `<form>...</form>` completo que te da Mailchimp en lugar
del que trae la web, y solo ajustarle las clases CSS (`newsletter-form`, etc.)
para que mantenga el mismo estilo.

---

## 6. Google Analytics 4 (a través de Google Tag Manager)

La web ya tiene programado un contenedor de **Google Tag Manager** con el
identificador `GTM-5S85TNVM`, y **solo se carga si la persona visitante acepta
las cookies analíticas** en el banner de cookies (cumplimiento RGPD).

Para que además llegue a recoger estadísticas en Google Analytics 4, tienes que:

1. Entrar en **https://tagmanager.google.com** con la cuenta de Google que
   administra `GTM-5S85TNVM`.
2. Dentro del contenedor, crear una etiqueta ("Tag") de tipo **Google Analytics:
   Configuración de GA4**, con el ID de tu propiedad de GA4 (algo con forma
   `G-XXXXXXXXXX`, que se obtiene en https://analytics.google.com, dentro de
   Administrador → Flujos de datos).
3. Publicar el contenedor en Google Tag Manager.

Si en algún momento cambiáis de contenedor de Tag Manager, el identificador se
puede modificar en el archivo `js/main.js`, buscando esta línea cerca del
principio:
```js
var GTM_ID = "GTM-5S85TNVM";
```

---

## 7. Cómo editar los textos de la web

Todos los textos visibles (menús, botones, titulares, formularios, mensajes de
error, banner de cookies, pie de página...) están en un único archivo:

```
data/translations.js
```

A pesar de la extensión `.js`, el contenido se edita exactamente igual que un
archivo de datos normal: es una única línea `window.ILS_TRANSLATIONS = { ... };`
seguida de todo el contenido entre llaves `{ }`. Esto es así a propósito, para
que la web funcione tanto subida a Hostinger como abriendo el archivo con
doble clic en tu ordenador (algunos navegadores bloquean la carga de archivos
`.json` "sueltos" al abrirlos así, pero no bloquean archivos `.js`).

Está dividido en dos grandes bloques, `"es"` (español) y `"en"` (inglés). Cada
texto tiene una "clave" (por ejemplo `"hero.cta"`) y un valor entre comillas
(el texto que se ve en la web). Para cambiar un texto:

1. Abre `data/translations.js` con un editor de texto (el Bloc de notas
   sirve, aunque un editor como Notepad++ o VS Code lo hace más cómodo).
2. Busca el texto que quieres cambiar (con Ctrl+F).
3. Cambia únicamente lo que hay entre comillas, sin tocar las comillas ni las
   comas.
4. Guarda el archivo con codificación **UTF-8** (para que las tildes y la ñ se
   vean bien) y súbelo de nuevo a Hostinger.

**Muy importante:** no toques la primera línea (`window.ILS_TRANSLATIONS = {`)
ni la última (`};`). El resto tiene un formato muy estricto (parecido a JSON):
si borras una coma, unas comillas o una llave `{ }` por error, la web puede
dejar de traducirse correctamente. Si tienes dudas, guarda una copia del
archivo original antes de tocar nada.

---

## 8. Cómo añadir o editar proyectos

Los proyectos que aparecen en la página "Proyectos" están en:

```
data/projects.js
```

(Igual que `translations.js`, es una lista `window.ILS_PROJECTS = [ ... ];`
que se edita igual que un archivo de datos normal; no toques la primera ni la
última línea.)

Cada proyecto tiene esta forma (puedes copiar un bloque entero y pegarlo para
crear uno nuevo, recordando separar cada proyecto con una coma):

```json
{
  "ref": "ILS-0004",
  "sector": "luxury",
  "image": "assets/images/project-luxury-01.svg",
  "es": {
    "title": "Título en español",
    "text": "Descripción genérica en español, sin nombrar al cliente."
  },
  "en": {
    "title": "Title in English",
    "text": "Generic description in English, without naming the client."
  }
}
```

- `"ref"`: el código de referencia tipo `ILS-0004` (súbelo de uno en uno).
- `"sector"`: solo puede ser `"luxury"` (automoción de lujo) o `"defence"`
  (defensa); esto decide qué etiqueta se muestra en la tarjeta.
- `"image"`: la ruta a una imagen dentro de `assets/images/`. Recuerda: por
  confidencialidad, **nunca subáis fotos reales de proyectos de clientes**; usad
  siempre imágenes genéricas o abstractas.

---

## 9. Cómo añadir o editar noticias

Las noticias de la página "Noticias" están en:

```
data/news.js
```

(Igual que `translations.js` y `projects.js`, es una lista
`window.ILS_NEWS = [ ... ];` que se edita igual que un archivo de datos
normal; no toques la primera ni la última línea.)

Ya hemos cargado 4 noticias reales a partir del documento `NOTICIAS.docx` que
nos facilitasteis (extraído de LinkedIn), con sus fotos correspondientes en
`assets/images/news-01.jpg` a `news-04.jpg`. **Importante:** el documento no
incluía la fecha exacta de publicación de cada noticia, así que las fechas que
hemos puesto (`"date"`) son una estimación orientativa para mantener un orden
lógico. Te recomendamos abrir `data/news.js` y corregirlas por las fechas
reales de publicación en LinkedIn.

Para añadir una noticia nueva, copia un bloque entero y pégalo, recordando
separar cada noticia con una coma. La forma de cada noticia es:

```json
{
  "date": "2026-07-05",
  "image": "assets/images/news-01.jpg",
  "link": "https://es.linkedin.com/company/andaltec-ils",
  "es": {
    "title": "Título de la noticia en español",
    "summary": "Resumen breve en español."
  },
  "en": {
    "title": "News title in English",
    "summary": "Short summary in English."
  }
}
```

- `"date"`: fecha en formato año-mes-día (`2026-07-05`), se usa para ordenar y
  para mostrar la fecha formateada automáticamente.
- `"link"`: normalmente el enlace a la publicación correspondiente en LinkedIn.
- `"image"`: puede ser una foto real del evento (formato `.jpg`, como las que ya
  hemos añadido) o una imagen genérica; recuerda no usar nunca fotos de
  proyectos o vehículos de clientes.

---

## 10. El logotipo

El logotipo real ya está colocado en `assets/logo/ils-logo.png` y se ve en la
cabecera y en el pie de página de todas las páginas. Si en el futuro os mandan
una versión nueva del logotipo, basta con:

1. Guardar el nuevo archivo con el nombre exacto **`ils-logo.png`** (fondo
   transparente, tal como indica el manual de marca).
2. Subirlo dentro de la carpeta `assets/logo/`, reemplazando el que hay.
3. No hace falta tocar nada más: la web lo usa automáticamente.

Si algún día ese archivo faltara o no cargara por algún motivo, la web muestra
automáticamente un logotipo de repuesto en texto (el "ILS" en rojo con el
cuadrado de marca) en su lugar, para que nunca se vea un icono roto.

Los archivos originales en formato vectorial (`T2LOGO_ILS.ai` y
`T2LOGO_ILS.pdf`), útiles para imprenta o para futuros materiales de marca,
se han guardado en `assets/logo/original/` por si los necesitáis más adelante
(no se usan en la web, solo se guardan como copia de seguridad).

---

## 11. Revisión legal (muy importante)

Las páginas **`privacidad.html`** y **`cookies.html`** incluyen un aviso visible
que dice:

> "Textos legales orientativos, revisar con un asesor jurídico antes de
> publicar."

Estos textos se han redactado siguiendo el RGPD y la LSSI-CE de forma general,
pero **antes de publicar la web de verdad**, os recomendamos que un abogado o
asesoría especializada en protección de datos los revise y adapte a vuestra
situación exacta (por ejemplo, si en el futuro usáis más herramientas o
proveedores).

---

## 12. Listado final de huecos pendientes

Esto es todo lo que queda por rellenar o decidir antes de dar la web por
"terminada al 100%":

1. **`[[WEB3FORMS_ACCESS_KEY]]`** en `contacto.html` — Clave gratuita de
   Web3Forms para que el formulario de contacto envíe correos de verdad (ver
   sección 4).
2. **`[[MAILCHIMP_FORM_ACTION_URL]]`** y **`[[MAILCHIMP_IDs]]`** en
   `index.html`, `proyectos.html`, `noticias.html` y `contacto.html` — Datos del
   formulario de Mailchimp para el boletín de novedades (ver sección 5).
3. **Fechas de `data/news.js`** — Las 4 noticias ya tienen contenido real, pero
   sus fechas son una estimación orientativa porque el documento de origen no
   incluía la fecha exacta de cada publicación; corrígelas por las fechas
   reales de LinkedIn (ver sección 9).
4. **Etiqueta de Google Analytics 4 dentro de Google Tag Manager** —
   `GTM-5S85TNVM` ya está conectado y se carga solo tras aceptar cookies, pero
   falta configurar la etiqueta de GA4 dentro del propio contenedor de Tag
   Manager (ver sección 6).
5. **Revisión legal de `privacidad.html` y `cookies.html`** por un asesor
   jurídico antes de publicar la web definitivamente (ver sección 11).
6. **Dominio real**: todas las direcciones (`sitemap.xml`, `robots.txt`,
   etiquetas `og:url`, `canonical`, JSON-LD) están escritas para
   `https://andaltec-ils.com`. Si el dominio final fuera otro, habría que
   sustituir esa dirección en esos archivos.

---

Cualquier duda sobre cómo editar algo, vuelve a este README: casi todo lo que
se puede necesitar cambiar en el día a día (textos, proyectos, noticias) está
pensado para editarse sin tocar código, solo archivos `.json`.
