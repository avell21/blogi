const express = require("express");

const app = express.Router();
const like = require("../app/controllers/LikeController");

// import authorization middleware
const token = require("../app/middlewares/verifyToken");

app
  // apply the auth middleware
  .use((req, res, next) => token(req, res, next))

  // url for liking a blog
  .get("/like/:blog_id", like.like)

  // url for unlike
  .get("/unlike/:blog_id", like.unlike)

  // url for checking if the user has liked the blog

  .get("/check/like/:blog_id", like.check_like);

module.exports = app;
