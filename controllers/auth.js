const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario o password no son correctos - email'
            })
        }

        if( !usuario.estado ){
            return res.status(400).json({
                msg: `Usuaurio estado: ${usuario.estado}`
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password) ;
        if(!validPassword){
            return res.status(400).json({
                msg: `Contrasena incorrecta`
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Login ok'
        });
    }

}

module.exports = {
    login
}