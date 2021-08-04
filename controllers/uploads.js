const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { subirArchivo } = require('../helpers/upload')
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');

const cargarArchivo = async (req, res = response) => {

    try {

        const pathNombre = await subirArchivo(req.files, ['txt', 'md']);
        res.json({
            path: pathNombre
        })

    } catch (error) {
        res.status(400).json(error);
    }

}

const putArchivo = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let model;

    switch (coleccion) {

        case 'usuarios':

            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':

            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvido XXDDDDDDD'
            })

    }

    //Limpiar imagenes previas
    if(model.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, model.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    model.img = nombre;

    await model.save();

    res.json({
        model
    })

}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let model;

    switch (coleccion) {

        case 'usuarios':

            model = await Usuario.findById(id);
            if (!model.img) {
                return res.sendFile(path.join(__dirname, '../assets/no-image.jpg' ))
            }

            break;

        case 'productos':

            model = await Producto.findById(id);
            if (!model.img) {
                return res.sendFile(path.join(__dirname, '../assets/no-image.jpg' ));
            }

            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvido XXDDDDDDD'
            })

    }

    //Limpiar imagenes previas
    if(model.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, model.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }

    res.json({
        msg: "FALTA PLACEHOLDER"
    })

}

module.exports = {
    cargarArchivo,
    putArchivo,
    mostrarImagen
}