  
const { json } = require('body-parser');
const db = require('../database');

// Création d'un post
exports.newPost = (req,res,next) => {    

    const date = new Date();
    let min = date.getMinutes(); 
    let hour = date.getHours();
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth()+1) < 10 ? "0" +(date.getMonth()+1) : (date.getMonth()+1);
    let year = date.getFullYear();
    let image = "";

    // S'il y a image, on l'enregistre avec le protocol http/ + localhst + dans le dossier image + le nom du fichier
    if (req.file) { image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}

    const post = {
        id_user : req.userId,
        content : req.body.content,
        image : image,
        date : day + "/" + month + "/" + year + " à " + hour + "h" + min + "min"

    };

    // Injection du post dans la table post dans la BDD
    db.query('INSERT INTO post SET ?', post, (err, result) => {
        if (err) return res.status(400).json({message : "erreur dans l'enregistrement du post dans la bdd "+ err});
        return res.status(201).json({ message : "post enregistré dans la base de donnée"})
    });

}

exports.getAllPosts = (req,res,next) => {
    db.query('SELECT post.*, user.name FROM post INNER JOIN user ON post.id_user = user.id_user order by date DESC', (err, result) => {
        if (err) return res.status(400).json({error : err});
        return res.status(201).json({result});
    });
};

exports.getOnePost = (req,res,next) => {
    db.query('SELECT post.*, user.name FROM post INNER JOIN user ON post.id_user = user.id_user WHERE post.id = ?', req.params.id, (err,result) => {
        if (err) { return res.status(500).json({message: "le post n'a pas pu être récupéré" + err}) }
        return res.status(201).json({result});
    });
};

exports.deletePost = (req,res,next) => {
    db.query( 'SELECT id_user FROM post WHERE id = ?', req.params.id, (err, result) =>{
        if (res.locals.userId === result[0].id_user || req.isAdmin === "Y"){    
            db.query('DELETE FROM post where id = ?',req.params.id,(err,result) =>{
                if (err) { return res.status(400).json({ error: "Le post n'a pas pu être supprimé" }) }
                return res.status(200).json({message: 'post supprimé'});
            })
        }    
    })
}