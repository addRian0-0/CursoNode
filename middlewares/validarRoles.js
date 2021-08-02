const { response, request } = require('express')

const adminRol = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }

    const { rol, nombre } = req.usuario;

    if(rol !== 'Administrador'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador`
        });
    }

    next();

}

const tieneRole = ( ...roles ) => {

    return(req = request, res = response, next) => {
        
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }
        
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        
        next();

    }

}

module.exports = {
    adminRol,
    tieneRole
}