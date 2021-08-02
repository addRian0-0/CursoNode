const { response, request } = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (id_token) => {
    /* 
    Prueba descomentar si no funciona XDDD
    const id_token2 = id_token;
    console.log('1: ' + id_token)
    console.log('2: ' + id_token2) */
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const { email : correo,
            name: nombre,
            picture: img } = ticket.getPayload();

    return { correo, nombre, img };

}

module.exports = {
    googleVerify
}