const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try{

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        req.uid = uid;

        const usuario = await Usuario.findById(uid);

        //Usuario no existe ->>>
        if(!usuario){
            return res.status(401).json({
                msg: "Token no valido - Usuario no existente"
            });
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido - Usuario no activo"
            });
        }

        req.usuario = usuario;

        next();

    }catch(error){

       console.log(error);
       res.status(401).json({
           msg: 'Token no valido'
       })
        
    }

}

module.exports = {
    validarJWT
}