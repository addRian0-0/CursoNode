const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/Usuarios');
const { validarRol, existEmail, existeUsuarioById } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validarJWT');
const { adminRol, tieneRole } = require('../middlewares/validarRoles');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'Formato de correo no valido').custom(existEmail).isEmail(),
    check('rol').custom(validarRol),
    validarCampos
] ,usuariosPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(validarRol),
    validarCampos
],usuariosPut);

router.delete('/:id', [
    validarJWT,
    //adminRol,
    tieneRole('Administrador', 'Ventas'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuariosDelete);

module.exports = router;