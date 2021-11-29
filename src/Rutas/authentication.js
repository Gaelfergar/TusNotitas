//Rutas del login

const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../Configurar/auth');

//Crear cuenta
router.get('/registrarse', isNotLoggedIn, (req, res) => {
  res.render('auth/registrarse');
});

//Recibir datos de registrarse
router.post('/registrarse', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/perfil',
  failureRedirect: '/registrarse',
  failureFlash: true
}));

//Iniciar sesión
router.get('/entrar', isNotLoggedIn, (req, res) => {
  res.render('auth/entrar');
});

//Recibir datos de entrar
router.post('/entrar', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/perfil',
    failureRedirect: '/entrar',
    failureFlash: true
  })(req, res, next);
});

router.get('/salir', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/perfil', isLoggedIn, (req, res) => {
  res.render('perfil');
});

module.exports = router;
