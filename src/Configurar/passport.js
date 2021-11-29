//Guardar los datos del usuario en la base de datos

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../basededatos');
const helpers = require('./helpers');

//Bienvenida al iniciar sesión
passport.use('local.signin', new LocalStrategy({
  usernameField: 'nombreusu',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, nombreusu, password, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE nombreusu = ?', [nombreusu]);
  if (rows.length > 0) {
    const user = rows[0];
    //Comparar contraseña
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Hola ' + user.nombreusu));
    } else {
      done(null, false, req.flash('message', 'La contraseña es incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
  }
}));

//Crear cuenta
passport.use('local.signup', new LocalStrategy({
  usernameField: 'nombreusu',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, nombreusu, password, done) => {

  const { nombrecom } = req.body;
  let nuevoUsuario = {
    nombrecom,
    nombreusu,
    password
  };
  //Cifrar contraseña
  nuevoUsuario.password = await helpers.encryptPassword(password);
  //Guardar en la base de datos
  const result = await pool.query('INSERT INTO usuarios SET ? ', nuevoUsuario);
  nuevoUsuario.id = result.insertId;
  return done(null, nuevoUsuario);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  done(null, rows[0]);
});