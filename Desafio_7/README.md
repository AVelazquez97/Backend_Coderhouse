# Desafío 7 - Websocket + MySQL + SQLite

## Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 12 ”Chat con Websocket”, y: 

+ cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
+ cambiar la persistencia de los productos de memoria a base de datos MariaDB.

## Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDB).

### Notas:
+ definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce

- - -

***IMPORTANTE:**

Para instalar dependencias, posicionarse en el directorio del desafío (Desafio_7) e ingresar:
```
npm install
```
Para poder ejecutar el desafío sin errores es necesario tener corriendo un base de datos MySQL / MariaDB en localhost.


