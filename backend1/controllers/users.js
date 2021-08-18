const bcrypt = require("bcrypt");
const db = require("../database");
const jwt = require("jsonwebtoken");


// Création d'un user
exports.signUp = (req,res,next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    // Verification robustesse password
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password) == false )
    {res.status(400).json({message:'Mot de passe trop faible, minimum: 8 charactères, 1 majuscule, 1 minuscule, 1 chiffre et 1 charactère spécial '})}

   // Verification robustesse email
   if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) == false )
   {res.status(400).json({message:'email incorrect '})}

    bcrypt
    .hash(password,10)
    .then((hash) => {
        const user = {
            name : name,
            email : email,
            password : hash,
        };
        db.query('INSERT INTO user SET ?', user, (err,result) => {
            if (err) { res.status(400).json({message : "Erreur dans l'insertion de la bd du nouveau user:" + err})}
            res.status(201).json({message: "Utilisateur créé"}) 
        })
        .catch(error => res.status(500).json({ message: "erreur dans le hashage:" + error }));    
    })

}

exports.login = (req,res,next) => {

    db.query('SELECT * FROM user WHERE email = ?',req.body.email, (err, result) => {
        if (result == "" || result == undefined || result == []) {return res.status(401).json({ error: "Utilisateur introuvable" })};
        console.log(req.body.password);
        console.log(result);
        bcrypt.compare(req.body.password, result[0].password)
        .then((valid) => {if (!valid) {res.status(400).json({message:"mot de passe incorrect"})}});

        const token = jwt.sign({userId : result[0].id_user, name : result[0].name},
                             process.env.JWT_TOKEN_KEY, 
                             {expiresIn: "24h"});

        res.status(200).json({token, userId : result[0].id_user, name : result[0].name})
    })

}

exports.isAdmin = (req,res,next) => {

    db.query('SELECT admin FROM user WHERE id_user = ?',req.params.id, (err, result) => {
        if (result === "" || result == undefined) return res.status(401).json({ error: "Utilisateur introuvable dans la recherche isAdmin" });
        res.status(200).json({result})
    })

}

exports.delete = (req,res,next) => {
    console.log("suppression compte")
    db.query( 'DELETE FROM user where id_user = ?', req.params.id, (err, result) =>{
        if (err) { return res.status(400).json({ error: "Le compte n'a pas pu être supprimé" }) }
        return res.status(200).json({message: 'compte supprimé'});   
    })
}