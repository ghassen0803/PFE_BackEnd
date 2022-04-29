const express = require("express");
const app = express();
const pool = require("./db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.json());

// post article
app.post("/articles",async(req, res) => {
try{
const {famille,designation,unite_mesure,prix_ttc} = req.body;
const newArticle = await pool.query(
"INSERT INTO article (famille,designation,unite_mesure,prix_ttc) VALUES ($1,$2,$3,$4) ",[famille,designation,unite_mesure,prix_ttc]
);
res.json(newArticle);
} catch(err) {
    console.error(err.message);
}
});
// post client
app.post("/client",async(req, res) => {
    try{
    const {name,password,email,phone} = req.body;
    const newClient = await pool.query(
    "INSERT INTO client (name,password,email,phone) VALUES ($1,$2,$3,$4) RETURNING * ",[name,password,email,phone]
    );
    res.json(newClient);
    } catch(err) {
        console.error(err.message);
    }
    });

// get * article
app.get("/articles",async(req, res) => {
    try{
    const allArticle = await pool.query(
    "SELECT * FROM article"
    );
    res.json(allArticle.rows);
    } catch(err) {
        console.error(err.message);
    }
    });
    // get * client
    app.get("/client",async(req, res) => {
        try{
        const allClient = await pool.query(
        "SELECT * FROM client"
        );
        res.json(allClient.rows);
        } catch(err) {
            console.error(err.message);
        }
        });

    // get article by id
    app.get("/articles/:id",async(req,res) => {
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

    });
      // get by famille
      app.get("/articlesf",async(req,res) => {
        const { famille } = req.body;
        try{
            const article = await pool.query(
              "SELECT * FROM article WHERE famille = ($1)",[
                  famille
               ]);
            res.json(article.rows);
        } catch(err){
            console.error(err.message);
        }

    });
// login  client
app.post("/login",async(req,res) => {
    const {name,password} = req.body;
    try {
    const data = await pool.query("SELECT * FROM client WHERE name = $1", [
        name
    ]); 
    const client = data.rows[0];
    if (client.length === 0) {
        res.status(400).json({
        error: "User is not registered, Sign Up first",
        });
        client ={name,password};
        }
     else if(password != client.password){
        res.status(400).json({
            error: "Enter correct password!",
            });
    };
  /*  const token = jwt.sign(
        {
        name: name,
        },
        process.env.SECRET_KEY
        ); 
  */      
    res.status(200).json({
    message: "User signed in!",
  //  token: token,
    });
    } catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Database error occurred while signing in!", //Database connection error
    });
    };
});



app.listen(5000,() =>{
    console.log("server is listening on port 5000")
})