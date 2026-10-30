# grips-web — Sitio público de GRIPS

Sitio web oficial de GRIPS, plataforma SaaS para ISP.

Landing independiente en HTML, CSS, JavaScript y SVG. Presenta el producto,
separa seis áreas implementadas de tres capacidades en desarrollo y publica
únicamente el contacto autorizado: **grimisti95@gmail.com**.

Este proyecto no importa código, capturas, datos de clientes ni configuración
de la aplicación ISP. No necesita API, base de datos, secretos ni dependencias.
La vista de producto es ilustrativa y está identificada como tal.

## Verlo localmente

Necesitas Node.js 18 o posterior únicamente para las herramientas locales.
No ejecutes `npm install`: no hay paquetes que instalar.

```powershell
cd grips-web
npm run check
npm run dev
```

Abre **http://localhost:4173/**. Para comprobar las rutas de un sitio de proyecto
de GitHub Pages, abre **http://localhost:4173/grips-web/**. El servidor solo sirve
`public/`, escucha en loopback y se detiene con Ctrl+C. Puedes elegir otro puerto
con la variable `PORT`.

También puedes abrir `public/index.html` directamente; el sitio no necesita un
proceso de compilación. El servidor facilita comprobar enlaces y tipos de archivo.

## Archivos

```text
public/
  index.html                 Landing
  privacidad.html            Información de privacidad provisional
  .nojekyll                  Archivos estáticos sin procesamiento Jekyll
  assets/
    css/styles.css           Diseño responsive y estilos accesibles
    js/site.js               Menú, filtros y vistas ilustrativas
    brand/
      grips-symbol.svg       Símbolo / favicon
      grips-logo.svg         Logo horizontal para fondo claro
      grips-logo-light.svg   Logo horizontal para fondo oscuro
scripts/
  preview.mjs                Servidor local sin dependencias
  check.mjs                  Comprobación de enlaces, contenido y sintaxis
.github/workflows/pages.yml   Publicación de public/ en GitHub Pages
```

El workflow publica **solo `public/`**. README, scripts, historial Git y archivos
locales no se incluyen en el artefacto del sitio.

## Publicación en GitHub Pages

El remoto confirmado es https://github.com/grimisti95/grips-web y ya contiene
un commit inicial en `main`. `origin` está configurado; no se ha subido la landing.
El estado detallado y los pendientes están en [PUBLICACION.md](./PUBLICACION.md).

**Aviso completado con los datos y el criterio de conservación confirmados por el titular.**
El usuario confirmó el responsable Luis Grimaldo, domicilio Jacarandas #3, Loma de Buenavista, el correo de privacidad y la eliminación de correos al cerrar cada consulta.

1. Mantén el aviso actualizado con los tratamientos reales.
2. Ejecuta `npm run check` y `npm run check:publish`. El segundo debe pasar antes
   de crear el commit de publicación o hacer push.
3. Integra los archivos sobre el historial de `origin/main`, conservando el
   commit inicial y la descripción del README remoto. No uses force push ni
   crees una historia independiente para reemplazar la remota.
4. En GitHub selecciona **Settings → Pages → Build and deployment → Source →
   GitHub Actions**. Publica los cambios mediante un push normal a `main`.
5. Verifica el workflow **Publicar sitio de GRIPS** y la URL devuelta por el
   entorno `github-pages`; luego prueba página, logotipos y privacidad públicos.

La URL prevista es https://grimisti95.github.io/grips-web/, pero aún no existe
un despliegue verificado. No se configuró un dominio personalizado ni un CNAME.
El artefacto publica solo `public/`; los enlaces relativos permiten funcionar
tanto en `/grips-web/` como en un futuro dominio propio.

Fuentes oficiales:

- [Crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Antes de utilizar la URL en Meta Business

Publicar una página no equivale a verificar un negocio, obtener aprobación de
Meta ni activar WhatsApp Cloud API. Este sitio es informativo: no contiene SDK,
píxel, formularios ni llamadas a Meta. GitHub Pages no ejecuta un backend de
webhooks; los tokens y el procesamiento de mensajes pertenecen a un entorno de
servidor independiente, nunca a este repositorio público.

Responsable confirmado: **Luis Grimaldo**, Jacarandas #3, Loma de Buenavista.
El correo `grimisti95@gmail.com` atiende también las solicitudes sobre datos.
Los correos se conservan hasta cerrar la consulta y después se eliminan.
El aviso debe actualizarse antes de ampliar la recolección de datos o activar nuevas integraciones.
Publicar este sitio no garantiza una aprobación de Meta.

La interfaz y los requisitos concretos de Meta deben revisarse en la cuenta
correspondiente; no se promete que esta entrega los satisfaga automáticamente.
Referencias oficiales (su consulta puede requerir sesión o estar limitada):

- [Ayuda de Meta para verificación de negocio](https://www.facebook.com/business/help/2058515294227817)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/overview/)

No agregues una etiqueta de verificación con un valor ficticio. Si Meta te entrega
una etiqueta `facebook-domain-verification`, utiliza exactamente su valor real en
el `<head>` y sigue las opciones que muestre tu cuenta para el dominio utilizado.
No publiques tokens, App Secret, contraseñas o credenciales de WhatsApp.

## Contenido y mantenimiento

- Edita presentación y funcionalidades en `public/index.html`.
- Los elementos `data-status="implemented"` y `data-status="development"`
  controlan el filtro; mantén el estado y los textos alineados con el producto.
- El estado «implementado» describe módulos existentes, no disponibilidad
  comercial universal ni certificación de integraciones.
- Actualiza el contacto en **ambos HTML** si el negocio autoriza un cambio.
  Actualiza también la validación de contacto en `scripts/check.mjs`.
- Edita y fecha la información de privacidad en `public/privacidad.html`.
- Si cambias el número de áreas presentadas, actualiza los conteos y las
  comprobaciones de `scripts/check.mjs`.
- El logo es original de esta entrega y está en SVG editable. La guía visual
  está en [BRAND.md](./BRAND.md). No se afirma registro de marca ni exclusividad
  jurídica del nombre.
- No existe vínculo entre el Git de esta carpeta y los repositorios del SaaS.
  No agregues capturas operativas, bases de datos o configuraciones privadas.

## Privacidad técnica y accesibilidad

No hay fuentes remotas, cookies propias, almacenamiento de identificadores,
analítica, dependencias de terceros o formularios. El correo usa `mailto:`.
El alojamiento puede procesar datos técnicos de conexión según sus condiciones.
El menú y las vistas conceptuales admiten teclado; hay enlace para saltar al
contenido, estados accesibles, preferencias de movimiento reducido y contenido
legible sin JavaScript. Sin JavaScript se muestran todas las funcionalidades.

No se asigna una licencia general de código o una titularidad legal inventada.
El titular puede decidir esos términos antes de distribuir el proyecto a terceros.
