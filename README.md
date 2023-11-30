# Asunción Domínguez Ponce de León

// Desde esta línea del README hasta que salga FIN fue agregado fuera de plazo (se me olvidó agregar las instrucciones para correr la aplicación)

Para correr la aplicación:
- ```npm install```
- ```npm run dev```

// FIN

Credenciales:
- mail: janolo3246@notedns.com
- clave: carvuk2023test

Si estas credenciales no funcionan, es posible crearse una cuenta.

Se crearon 3 bases de datos nuevas y se uso la de usuarios.
Tabla 1: services (Todos los servicios disponibles)
- Name: string único
- Price: float
- Direction: string (no único, un servicio se puede hacer en mismo lugar)
- availability: bool (por si el servicio no esta habilitado en cierta época)

Tabla 2: cars (Relaciona usuarios con sus autos)
- userId: foreign key con la tabla usuario
- car: string (patente del auto)

Tabla 3: appointments (Todos los servicios programados por el usuario, relaciona auto con servicio)
- carId: foreign key con la tabla cars
- servicesId: foreign key con la tabla services
- pickupaddress: string (dirección de recogida del auto)
- delivaryaddress: string (dirección de entrega del auto)
- date: date (fecha cuando se realizará el servicio)

Hay 4 carpetas dentro de ```src```:
- ```auth```: tiene la lógica del inicio de sesión, se usarón las funciones que vienen en supabase.
- ```styles```: un archivo .css con los estilos.
- ```router```: tiene la lógica del ruteo de las páginas.
- ```views```: tiene dos archivos, acá es donde van todos los archivos que tienen un componente en el router, es decir, una página propia. En este caso, ```Home``` y ```AddAppointments```.

El componente ```Home``` tiene 6 funciones:
- ```getCar```: obtiene patente del usuario
- ```AddCarSubmit```: si es que el usuario aún no tiene patente y tiene que registrar una. (no hay ninguna seguridad en los datos agregados, las patentes pueden ser cualquier string)
- ```getAppointments```: obtiene todos los servicios programados de la patente.
- ```getServices```: obtiene todos los servicios.
- ```deleteAppointment```: borra un servicio programado.
- ```findServicesById```: encuentra el servicio por su id.

El componente ```AddAppointments``` tiene 4 funciones:
- ```handleServiceClick```: guarda el servicio elegido, si es uno que no está disponible mantiene la variable en null de forma que al mandar el cuestionario no se pueda.
- ```handleDateChange```: guarda la fecha elegida
- ```handleSubmit```: envía el servicio programado (hace post) y revisa que vengan todos los datos o sino entrega una alerta.
- ```getServices```: obtiene todos los servicios.

Intente tener un archivo como ```client.js``` dentro de una carpeta ```supabase``` donde creara el cliente de supabase y luego importara en los otros archivos, pero no me resultó y no le di mucha vuelta, al igual que para las variables de entorno, me hubiera gustado tenerlas en un archivo ```.env``` y no en ```config.js```.
