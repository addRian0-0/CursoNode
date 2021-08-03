const { check } = require('express-validator');
const { Router } = require('express');
const { existeProducto, existeCategoriaID, existeProductoNombre } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validarJWT');
const { adminRol, tieneRole } = require('../middlewares/validarRoles');
const { getProductos, 
        getProducto,
        postProducto,
        putProducto,
        deleteProducto } = require('../controllers/Productos');

const router = Router();

router.get('/', getProductos);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], getProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'Campo obligatorio').notEmpty(),
    check('nombre').custom(existeProductoNombre),
    check('categoria', 'No es un id valido').isMongoId(),
    check('categoria').custom(existeCategoriaID),
    validarCampos
], postProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], putProducto);

router.delete('/:id', [
    validarJWT,
    adminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], deleteProducto);

module.exports = router;