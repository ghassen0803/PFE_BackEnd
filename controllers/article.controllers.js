const pool = require("../config/db");
exports.GetArticle = async(req, res) => {
    try{
    const allArticle = await pool.query(
    "SELECT * FROM article"
    );
    res.json(allArticle.rows);
    } catch(err) {
        console.error(err.message);
    }
    };

exports.PostArticle = async(req, res) => {
        try{
            const {famille,designation,unite_mesure,prix_ttc} = req.body;
            const newArticle = await pool.query(
            "INSERT INTO article (famille,designation,unite_mesure,prix_ttc) VALUES ($1,$2,$3,$4) ",[famille,designation,unite_mesure,prix_ttc]
            );
            res.json(newArticle);
            } catch(err) {
                console.error(err.message);
            }
            };
exports.GetArticleById = async(req, res) => {

        const { id } = req.params;
        try{
            const article = await pool.query(
              "SELECT * FROM article WHERE article_id = ($1)",[
                  id
               ]);
            res.json(article.rows[0]);
        } catch(err){
            console.error(err.message);
        }

    };
exports.GetByFamille = async(req,res) => {
    const { id } = req.params;
    try{
        const article = await pool.query(
          "SELECT * FROM article WHERE famille = ($1)",[
              id
           ]);
        res.json(article.rows);
    } catch(err){
        console.error(err.message);
    }

};

exports.DeleteArticle = async(req,res) => {
    const { id } = req.params;
    try{
        const article = await pool.query(
          "DELETE * FROM article WHERE article_id = ($1)",[
              id
           ]);
           return res.status(200);
    } catch(err){
        console.error(err.message);
    }

});