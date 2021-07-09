const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

const usuariosGet = async (req, res = response) => {

    const {limite = 5, desde = 0 } = req.body;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;
    //Borrar definitivamente el usuario
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Desactivar el usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario,
        uid
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}