const { response, request } = require('express');

const Role = require('../models/rol');
const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');

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

module.exports = {
    validarRol,
    existEmail, 
    existeUsuarioById,
    existeCategoriaID
}

