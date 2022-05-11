const express = require("express");
const { GetArticle,PostArticle,GetArticleById,GetByFamille,DeleteArticle  } = require("../controllers/article.controllers");

const router = express.Router();

router.get("/articles", GetArticle);
router.get("/articlesf/:id",GetByFamille);
router.get("/articles/:id",GetArticleById);
router.post("/articles",PostArticle);
router.delete("/articles/:id",DeleteArticle);


module.exports = router ;