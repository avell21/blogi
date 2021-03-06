// this is the entry point for the app env variables are set automatically
// node modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
//  don't console.log, instead use the debug module
const debug = require("debug")("app");

// import the routers
const user = require("./routes/user");
const blog = require("./routes/blog");
const like = require("./routes/like");
const follow = require("./routes/follow");
const FeedBack = require("./routes/FeedBack");
// security middleware
const security = require("./app/middlewares/security");

// initialize the express app
const app = express();

app.use(cors());

debug("starting server ...");

// apply security middleware
security(app);

// parse the body of the incoming body req
app.use(bodyParser.json());

// plug the routers here for the individual components
app.get("/a", (req, res) => {
  res.send(req.query);
});
app.use("/api/blog", blog);
app.use("/api", like);
app.use("/api/", follow);
app.use("/api/feedback", FeedBack);
app.use("/user", user);
// Start listening for connections
app.listen(process.env.PORT ? process.env.PORT : 3000, err => {
  if (err) debug("can't start the app");
  debug(`starting ${process.env.APP_NAME} on port ${process.env.PORT}`);
});
