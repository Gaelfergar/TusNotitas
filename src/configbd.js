//Configuración de la base de datos.

module.exports = {
    database: {
        connectionLimit: 10,
        host: 'localhost',
        //puerto del usuario root
        port: 3307,
        //nombre de usuario mysql
        user: 'root',
        //contraseña de mysql
        password: 'PassRoot1',
        //nombre de la base de datos
        database: 'tusnotitas'
    }
};