//Validar si un usuario inició sesión o no. Prohibe que se acceda a páginas indeseadas mediante la URL.

module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/entrar');
    },
    
    isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/perfil');
    }
};