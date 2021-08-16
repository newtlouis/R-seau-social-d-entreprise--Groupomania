const db = require("../database");

exports.like = (req,res,next) => {
    db.query('SELECT * FROM likes WHERE id_post = ? AND id_user = ?',[ req.body.id_post, req.body.id_user], (err, result) => {
        if (err) { res.status(400).json({message : "Erreur dans la recherche du type de like:" + err})}

        if (result == "" || result == undefined) 
        {
            db.query('INSERT INTO likes SET ?',req.body, (err, result) => {
                console.log("création ");
                if (err) { res.status(400).json({message : "Erreur dans l'insertion de la bd du nouveau like:" + err})}
                res.status(201).json({message: "like enregistré"})
                })
        }

        else if (result[0].type == req.body.type)
        {   console.log("supression")            
            db.query('DELETE FROM likes WHERE id_user = ?',req.userId, (err, result)=> {
                if (err) { res.status(400).json({message : "Erreur dans la supression du like:" + err})}
                res.status(201).json({message: "like supprimé"})
                })
        }

        else {
            console.log("modif")
            console.log(req.body.type, req.body.id_post, req.userId)
        db.query('UPDATE likes SET type = ? WHERE id_post = ? AND id_user = ?',[req.body.type, req.body.id_post, req.userId], (err, result) => {
            if (err) { res.status(400).json({message : "Erreur dans la modification de la bd du nouveau like:" + err})}
            res.status(201).json({message: "like modifié"})
            })
        }

    })
},

exports.getLikes = (req, res, next) => {
    // const listEmoji = [];
  
    db.query("SELECT * FROM likes WHERE id_post = ? ",req.params.id, (err,result) => {
        if (err) { res.status(400).json({message : "Erreur dans la récupération des likes du post:" + err})}
        // result.forEach(element => listEmoji.push(element))
        // console.log(listEmoji)
        res.status(201).json({result})
    })
}

