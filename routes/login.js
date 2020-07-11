var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/Usuarios');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas ',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas ',
                errors: err
            });
        }

        // Crear un token!!!
        const userDto={

            nombre: usuarioDB.nombre,
            email: usuarioDB.email,
            id: usuarioDB._id,

            img: usuarioDB.img,
            role: usuarioDB.role
        };


        var token = jwt.sign({usuario: userDto}, SEED, {expiresIn: 14400}); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: userDto,
            token: token,
            id: usuarioDB._id

        });

    })


});


module.exports = app;
