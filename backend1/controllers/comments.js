const db = require("../database");

// Création d'un commentaire    
exports.newComment = (req,res,next) => {
    const date = new Date();
    let min = date.getMinutes(); 
    let hour = date.getHours();
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth()+1) < 10 ? "0" +(date.getMonth()+1) : (date.getMonth()+1);
    let year = date.getFullYear();

    const Comment = {
        id_user : req.userId,
        id_post : req.body.id_post,
        comment : req.body.comment,
        date_comment : day + "/" + month + "/" + year + " à " + hour + "h" + min + "min"
    };


    db.query('INSERT INTO comment SET ?', Comment, (err, result) => {
        if (err) return res.status(400).json({message:"erreur insertion commentaire " + err});
        return res.status(201).json({result})
    })

}

exports.getAllCommentsForOnePost = (req,res,next) => {

    const idPost = req.params.postId;
    db.query('SELECT comment.*, user.name FROM comment INNER JOIN user ON comment.id_user = user.id_user LEFT JOIN post ON comment.id_post = post.id WHERE post.id = ? ', idPost, (err, result) => {
        if (err) {return res.status(400).json({error : err})};
        return res.status(200).json({result})
    })
}


exports.deleteComment = (req,res,next) => {

    db.query( 'SELECT id_user FROM comment WHERE id_comment = ?', req.params.id, (err, result) =>{
        if (res.locals.userId === result[0].id_user || req.isAdmin ==="Y" ){    
            db.query('DELETE FROM comment WHERE id_comment = ?', req.params.id, (err, result) => {
                if (err) return res.status(400).json({error : err});
                return res.status(201).json({result})
            })
        }       
    })
}