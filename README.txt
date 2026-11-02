# Formulario de investigación de campo - Jóvenes FIHNEC

## Archivos
- `index.php`: formulario.
- `styles.css`: diseño adaptable a móviles.
- `firebase.js`: conexión con Firebase y guardado en Cloud Firestore.
- `firestore.rules`: reglas de seguridad para la colección.
- `assets/logo.png`: coloca aquí el logo del grupo.

## 1. Preparar Firebase
1. Entra a https://console.firebase.google.com/
2. Abre el proyecto `formulario-907a2`.
3. Entra en **Firestore Database** > **Crear base de datos**.
4. Crea la base de datos en modo producción.
5. Abre la pestaña **Reglas** y reemplaza su contenido por el de `firestore.rules`.
6. Pulsa **Publicar**.

La colección `respuestas_fihnec` se crea automáticamente cuando llega la primera respuesta. No necesitas crearla manualmente.

## 2. Colocar el logo
Guarda tu logo en formato PNG con el nombre exacto `logo.png` dentro de la carpeta `assets`.
Ruta: `assets/logo.png`.
Se recomienda una imagen cuadrada o con fondo transparente.

## 3. Ejecutar con XAMPP
1. Descomprime la carpeta `formulario_fihnec` dentro de `C:\\xampp\\htdocs\\`.
2. Inicia Apache desde XAMPP.
3. Abre: `http://localhost/formulario_fihnec/`

No abras el PHP haciendo doble clic ni usando `file://`; debe servirse mediante Apache.

## 4. Ver las respuestas
En Firebase Console:
Firestore Database > Datos > `respuestas_fihnec`.

Cada documento contiene:
- `presupuestoLempiras`: presupuesto por evento.
- `bebidas`: lista de bebidas preferidas.
- `comidas`: lista de comidas preferidas.
- `horarioViernes`: horario seleccionado.
- `modalidadAlimentacion`: gasto fijo semanal o pagar alimentos propios.
- `creadoEn`: fecha y hora del envío.

## 5. Configuración y seguridad
La configuración Web de Firebase incluida en `firebase.js` identifica el proyecto; no es una contraseña ni una clave privada. No coloques aquí una clave privada de cuenta de servicio.
Las reglas incluidas permiten crear respuestas y bloquean lectura, edición y eliminación desde clientes públicos. Para un formulario público de producción, configura también Firebase App Check y considera controles anti-spam/rate limiting. Las reglas no sustituyen esas medidas.

Si necesitas que un administrador consulte respuestas desde una página privada, se debe crear un acceso administrativo separado y protegerlo; no se debe habilitar lectura pública de la colección.
