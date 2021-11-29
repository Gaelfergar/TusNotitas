const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

//configuración de la base de datos
const { database } = require('./configbd');

//Inicializar
const app = express();
require('./Configurar/passport');

//Configuraciones del servidor
app.set('port', process.env.PORT || 5555);
//Encontrar la carpeta Vistas dentro de src
app.set('Vistas', path.join(__dirname, 'Vistas'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('Vistas'), 'layouts'),
  partialsDir: path.join(app.get('Vistas'), 'partials'),
  //.handlebars
  extname: '.hbs',
  helpers: require('./Configurar/handlebars')
}))
app.set('view engine', '.hbs');

//npm run dev
app.use(morgan('dev'));
//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: 'nodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*
app.use(body());
*/

//Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});

//Rutas
app.use(require('./Rutas/index'));
app.use(require('./Rutas/authentication'));
app.use('/notas', require('./Rutas/notas'));

//Estilo
app.use(express.static(path.join(__dirname, 'Estilo')));

//Vistas
app.set('views', path.join(__dirname, 'Vistas'));

//Servidor
app.listen(app.get('port'), () => {
  console.log('El servidor está en el puerto', app.get('port'));
});