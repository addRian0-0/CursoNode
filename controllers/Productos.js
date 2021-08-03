const { request, response } = require('express');

const Producto = require('../models/Producto');

const getProductos = async (req = request, res = response) => {

    const { desde = 0, limite = 5} = req.body;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })

}

const getProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');
    
    res.json({
        producto
    });

}

const postProducto = async (req = request, res = response) => {
    
    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto con el nombre ${nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.json({
        producto
    })

}

const putProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data);

    res.json({
        producto
    });

}

const deleteProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });

    res.json({
        producto
    })

}

module.exports = {
    getProductos, 
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}