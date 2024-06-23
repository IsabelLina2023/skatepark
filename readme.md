# Prueba de DESAFÍO LATAM "SKATEPARK"

Prueba de DESAFÍO LATAM que contempla los sgtes. requerimientos:
"La Municipalidad de Santiago, ha organizado una competencia de Skate para impulsar el nivel deportivo de los jóvenes que desean representar a Chile en los X Games del próximo año, y han iniciado con la gestión para desarrollar la plataforma web en la que los participantes se podrán registrar y revisar el estado de su solicitud"

## Requerimientos del proyecto

El sistema debe permitir registrar nuevos participantes.

● Se debe crear una vista para que los participantes puedan iniciar sesión con su correo y contraseña.
● Luego de iniciar la sesión, los participantes deberán poder modificar sus datos, exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT y los datos que se utilicen en la plantilla deben ser extraídos del token.
● La vista correspondiente a la ruta raíz debe mostrar todos los participantes registrados y su estado de revisión.
● La vista del administrador debe mostrar los participantes registrados y permitir aprobarlos para cambiar su estado.

Se debe persistir la información de los usuarios en PostgreSQL.

### Condiciones del proyecto:

1. Crear una API REST con el Framework Express
2. Servir contenido dinámico con express-handlebars
3. Ofrecer la funcionalidad Upload File con express-fileupload
4. Implementar seguridad y restricción de recursos o contenido con JWT

### Tecnologías y herramientas usadas en este proyecto:
- Express
- Handlebars
- PostgreSQL
- JWT
- Express-fileupload
-Jsonwebtoken
- Express-validator
- Bcrypt
- Cookie-parser
- Uuid
- PostgreSQL

Creado por Isabel Rojas 💻
