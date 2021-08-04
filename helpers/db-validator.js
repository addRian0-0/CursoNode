const { response, request } = require('express');

const Role = require('../models/rol');
const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto')

const validarRol = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es permitido`);
    }

}

const existEmail = async (correo = '') => {

    const email = await (Usuario.findOne({ correo }));
    if (email) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

}

const existeUsuarioById = async (id = '') => {

    const existUsuario = await Usuario.findById(id);
    if (!existUsuario) {
        throw new Error(`El id ${id} no existe`);
    }

}

const existeCategoriaID = async (id) => {

    const exist = await Categoria.findById(id);
    if(!exist){
        throw new Error(`La categoria con el id: ${id} no existe`);
    }

}

const existeProductoNombre = async (nombre) => {

    const exist = await Producto.findOne({ nombre });
    if(!exist){
        throw new Error(`El producto con el nombre: ${nombre} ya existe`);
    }

}

const existeProducto = async (id) => {

    const exist = await Producto.findById(id);
    if(!exist){
        throw new Error(`El producto con el id: ${id} no existe`)
    }

}

//Validar coleccion permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitidas, solo: ${colecciones}`)
    }

    return true;

}

module.exports = {
    validarRol,
    existEmail, 
    existeUsuarioById,
    existeCategoriaID,
    existeProducto,
    existeProductoNombre,
    coleccionesPermitidas
}

