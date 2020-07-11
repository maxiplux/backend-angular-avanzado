var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// ==========================================
//  Verificar token
// ==========================================
exports.verificaToken = function (req, res, next) {







    if ( ('authorization' in  req.headers))
    {

        var token = req.headers.authorization.replace('Bearer ','');


        jwt.verify(token, SEED, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Token incorrecto',
                    errors: err
                });
            }

            req.usuario = decoded.usuario;

            next();


        });


    }else

    {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: 'Invalid headers'
        });
    }



}
