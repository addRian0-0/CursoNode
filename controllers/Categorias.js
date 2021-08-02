const Categoria = require('../models/Categoria');

const getCategorias = async (req, res) => {
    
    const { desde = 0, limite = 5 } = req.body;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    })

}

const getCategoria = async (req, res) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    })

}

const postCategorias = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.json({
        msg: "POST",
        categoria
    })

}

const putCategorias = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        categoria
    })

}

const deleteCategorias = async (req, res) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        categoria
    })

}

module.exports = {
    getCategorias,
    postCategorias,
    putCategorias,
    deleteCategorias,
    getCategoria
}