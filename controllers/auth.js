const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { googleVerify } = require('../helpers/googleVerify');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o password no son correctos - email'
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: `Usuaurio estado: ${usuario.estado}`
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
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

const googleSignin = async (req = request, res = response, next) => {

    const { id_token } = req.body;

    try {
        
        const { correo, nombre, img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });
        if(!usuario){

            const data = {
                nombre, 
                correo, 
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();

        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Usuario bloqueado"
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "Token de google no valido"
        });

    }

}

module.exports = {
    login,
    googleSignin
}