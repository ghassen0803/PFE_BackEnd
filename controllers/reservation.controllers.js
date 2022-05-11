const pool = require("../config/db");
exports.GetRes = async(req, res) => {
    try{
    const allArticle = await pool.query(
    "SELECT * FROM reservation"
    );
    res.json(allArticle.rows);
    } catch(err) {
        console.error(err.message);
    }
    };

exports.PostRes = async(req, res) => {
        try{
            const {id,article,quantite,prix_ttc,date,user_id} = req.body;
            const newArticle = await pool.query(
            "INSERT INTO reservation (id,article,quantite,prix_ttc,date,user_id) VALUES ($1,$2,$3,$4,$5,$6) ",[id,article,quantite,prix_ttc,date,user_id]
            );
            res.json(newArticle);
            } catch(err) {
                console.error(err.message);
            }
            };
exports.GetResById = async(req, res) => {
        const { id } = req.params;
        try{
            const article = await pool.query(
              "SELECT * FROM reservation WHERE id = ($1)",[
                  id
               ]);
            res.json(article.rows[0]);
        } catch(err){
            console.error(err.message);
        }

    };
exports.DeleteRes = async(req,res) => {
    const { id } = req.params;
    try{
        const article = await pool.query(
          "DELETE * FROM reservation WHERE id = ($1)",[
              id
           ]);
           return res.status(200);
    } catch(err){
        console.error(err.message);
    }

};