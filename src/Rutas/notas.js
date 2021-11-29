//Rutas de las notas

const express = require('express');
const router = express.Router();

const pool = require('../basededatos');
const { isLoggedIn } = require('../Configurar/auth');

router.get('/crearnota', isLoggedIn, (req, res) => {
    res.render('notas/crearNota');
});

router.post('/crearnota', isLoggedIn, async (req, res) => {
    const { title, nota } = req.body;
    const nuevaNota = {
        title,
        nota,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO notas set ?', [nuevaNota]);
    req.flash('success', 'Nota guardada exitosamente');
    res.redirect('/notas');
});

router.get('/', isLoggedIn, async (req, res) => {
    const notitas = await pool.query('SELECT * FROM notas WHERE user_id = ?', [req.user.id]);
    res.render('notas/listaNotas', { notitas });
});

router.get('/borrarnota/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM notas WHERE ID = ?', [id]);
    req.flash('success', 'Nota borrada exitosamente');
    res.redirect('/notas');
});

router.get('/editarnota/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const notas = await pool.query('SELECT * FROM notas WHERE id = ?', [id]);
    res.render('notas/editarNota', {notita: notas[0]});
});

router.post('/editarnota/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, nota } = req.body; 
    const nuevaNota = {
        title,
        nota
    };
    await pool.query('UPDATE notas set ? WHERE id = ?', [nuevaNota, id]);
    req.flash('success', 'Nota editada exitosamente');
    res.redirect('/notas');
});

module.exports = router;