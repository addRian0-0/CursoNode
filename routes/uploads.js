const { Router } = require('express');
const { check } = require('express-validator');

const { validarArchivo } = require('../middlewares/validarArchivo');
const { buscar } = require('../controllers/Buscar');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { cargarArchivo, putArchivo, mostrarImagen } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'Debe ser un ID de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], putArchivo);

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un ID de mongo').isMongoId(),
    validarCampos
], mostrarImagen);

module.exports = router;