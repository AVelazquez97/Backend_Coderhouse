# Desafio 20 - SERVIDOR EN DENO

## Consigna: 
1. Crear un servidor http con deno.

2. Configurar denon para que, ante un cambio de código, el servidor de reinicie automáticamente.
    - El servidor presentará en su ruta raíz un formulario de ingreso de un color, que será enviado al mismo por método post.
    - Dicho color (en inglés) será incorporado a un array de colores persistido en memoria.
    - Por debajo del formulario se deberán representar los colores recibidos en una lista desordenada (ul) utilizando el mismo color para la letra en cada caso. El color de fondo del la vista será negro.

### Ejecución del proyecto:

- Para la correcta ejecución del servidor es necesario tener instalado deno y denon.

- Luego de posicionarse en el repositorio del proyecto (estando desde una interfaz de línea de comandos) ingresar la siguiente sentencia: ``` denon start```