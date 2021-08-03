const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

const colecciones = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const mongoId = ObjectId.isValid(termino);

    if (mongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const usuario = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuario
    })

}

const buscarProducto = async (termino = '', res = response) => {

    const mongoId = ObjectId.isValid(termino);

    if (mongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const producto = await Producto.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre');

    res.json({
        results: producto
    })

}

const buscarCategorias = async (termino = '', res = response) => {

    const mongoId = ObjectId.isValid(termino);

    if (mongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    const categoria = await Categoria.find({ 
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: categoria
    })

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!colecciones.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${colecciones}`
        });
    }

    switch (coleccion) {

        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
            break;

        case 'role':
            break;

        default:
            res.status(500).json({
                msg: 'Se me oplvido hacver busqueda'
            });
    }

}

module.exports = {
    buscar
}