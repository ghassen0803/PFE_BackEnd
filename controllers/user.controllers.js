const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    // req.body= name , email , password
    const { name, email, password } = req.body;
    // test email
    const findUser = await pool.query("select * from users Where email=$1", [
      email,
    ]);
    // email should be unique
    if (findUser.rows.length > 0) {
      return res
        .status(400)
        .send({ errors: [{ msg: "email should be unique" }] });
    }

    // hashaed password (bcrypt)
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    // new user
    let newUser = await pool.query(
      "INSERT INTO users (id,name, email, password) VALUES ($1, $2, $3,$4) RETURNING *",
      [5, name, email, password]
    );

    // CREATE the TOKEN with jwt
    const token = null;
    // response
    res.status(200).send({ msg: "register succ", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errors: [{ msg: "user not saved "+error.message }] });
  }
};

exports.Login = async (req, res) => {
  try {
    // email & password
    const { email, password } = req.body;
    //   test : if the email is exist
    const findUser = await pool.query("select * from users Where email=$1", [
      email,
    ]);
    // console.log("finded user =================", findUser.rows[0]);
    // if the email dosn't exist
    // bad credential
    if (findUser.rows.length == 0) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    // test password
    //   password in  BD== password
    var comparePass =false;
    if (password==findUser.rows[0].password){
      comparePass=true;
    }
    // wrong password
    // bad crential
    if (!comparePass) {
      return res.status(400).send({ errors: [{ msg: "bad credential"+comparePass }] });
    }
    // CREATE A TOKEN
    const token = jwt.sign(
      {
        id: findUser.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    res.status(200).send({ msg: "login successfully", user: findUser, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "can not login"+error.message }] });
  }
};
exports.GetUser = async(req, res) => {
  try{
  const allClient = await pool.query(
  "SELECT * FROM users"
  );
  res.json(allClient.rows);
  } catch(err) {
      console.error(err.message);
  }
  };

// module.exports = { Register,  };
