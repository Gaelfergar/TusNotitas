<h2>Para usar:</h2><br> 
1.- Crear la base de datos del archivo "BD.sql" en MySQL (yo la hice en la versión 5.7 de MySQL Command Line Client), dentro de la carpeta "basededatos" en el inicio.<br>
2.- Ir al archivo "configbd.js" dentro de la carpeta "src".<br>
3.- Modificar el puerto en donde dice "port: '3307'" al puerto que tengas tú en MySQL (suele ser el 3306).<br>
4.- Modificar el usuario en donde dice "user: 'root'" al nombre de usuario en donde se haya creado la base de datos (puede que también lo hayas creado en el usuario root, si es así no lo cambies).<br>
5.- Modificar la contraseña en donde dice "password: 'PassRoot1'" a la contraseña de tu usuario de MySQL.<br>
6.- Si es necesario, cambiar el nombre de la base de datos en donde dice "database: 'tusnotitas'" al nombre que tú le hayas asignado a la base de datos al crearla en MySQL.<br>
7.- Abre una consola de comandos en Visual Studio Code con Control + shift + p y escribe "Terminal: Crear nueva terminal"<br>
8.- Escribe en la terminal "npm run dev" para empezar el servidor y si todo sale bien debería salirte: "El servidor está en el puerto 5555" y luego "La base de datos está conectada."<br>
9.- Escribe "localhost:5555" en la URL de un navegador web para usar el programa.<br>
10.- Recuerda usar el comando Control + c (y luego escribir "s") dentro de la terminal para cerrar el servidor.
