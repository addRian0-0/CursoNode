const { response, request } = require('express');

const usuariosGet = (req, res = response) => {

    const { nombre = 'No name', edad } = req.query;

    res.json({
        msg: 'get api Controlador',
        edad,
        nombre
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put api controller',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre, 
        edad
    });
}

const usuariosDelete =  (req, res = response) => {
    res.json({
        msg: 'delete api controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut, 
    usuariosPost,
    usuariosDelete
}