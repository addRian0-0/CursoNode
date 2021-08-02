const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaID } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validarJWT');
const { adminRol, tieneRole } = require('../middlewares/validarRoles');
const { getCategorias,
        postCategorias,
        putCategorias,
        deleteCategorias,
        getCategoria } = require('../controllers/Categorias');

const router = Router();

router.get('/', getCategorias);

router.get('/:id', [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
], getCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'Campo obligatorio').notEmpty(),
    validarCampos
], postCategorias);

router.put('/:id', [
    validarJWT,
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    check('nombre', 'Campo obligatoria').notEmpty(),
    validarCampos
], putCategorias);

router.delete('/:id', [
    validarJWT,
    adminRol,
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
], deleteCategorias);

module.exports = router;