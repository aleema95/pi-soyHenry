const { Router } = require('express');
const { videogamesMiddleware } = require('./videogames')
const genresMiddleware = require('./genres')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames', videogamesMiddleware);
router.use('/genres', genresMiddleware);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
