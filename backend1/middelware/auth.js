const jwt = require('jsonwebtoken');
const db = require("../database");

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
        if (err) {res.status(400).json({message : "requête non authentifiée " + err})}
        req.userId = decoded.userId;
        res.locals.userId = decoded.userId;

        db.query('SELECT admin FROM user WHERE id_user = ?', decoded.userId, (err, result) => {
            if (err) return res.status(400).json({message:"erreur dans l'insertion du isAdmin dans la requete via auth " + err});
            // console.log(result[0].admin)
            req.isAdmin = result[0].admin
        })
        next()
    });
}