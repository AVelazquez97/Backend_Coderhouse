# Desafío 16 - DIVIDIR EN CAPAS NUESTRO PROYECTO

## Consigna:

+ Dividir en capas el proyecto entregable con el que venimos trabajando (desafío 14: LOGGERS, GZIP y ANÁLISIS DE PERFORMANCE), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

+ Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.

+ La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

* * *

## Ejecución del proyecto: 

+ En primera instancia es necesario levantar servidor de MySQL, ya sea con workbench o XAMPP

+ Luego, instalar las dependencias estando dentro del directorio e ingresando por línea de comandos: 

  - ``` npm i ``` 

+ Y por último, se puede ejecutar el proyecto de las siguientes maneras:
  - ``` npm run start:dev:fork ```  
  - ``` npm run start:dev:cluster ```