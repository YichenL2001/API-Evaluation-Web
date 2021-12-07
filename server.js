"use strict";
/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)
const { User } = require("./models/user");
const USE_TEST_USER = env !== "production" && process.env.TEST_USER_ON; // option to turn on the test user.
// the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
//const TEST_USER_ID = "5fb8b011b864666580b4efe3";
//const TEST_USER_USERNAME = "test@user.com";
//////

const log = console.log;
const path = require("path");

const express = require("express");
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require("cors");
if (env !== "production") {
  app.use(cors());
}

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require("connect-mongo"); // to store session information on the database in production

//middleware for authentication of users
// const userAuthenticate = (req, res, next) => {
//   if (env !== "production" && USE_TEST_USER) req.session.user = TEST_USER_ID;
//   if (req.session.user) {
//     User.findById(req.session.user)
//       .then((user) => {
//         if (!user) {
//           return Promise.reject();
//         } else {
//           req.user = user;
//           next();
//         }
//       })
//       .catch((error) => {
//         res.status(401).send("Unauthorized");
//       });
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// };

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "this is a secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store:
      env === "production"
        ? MongoStore.create({
            mongoUrl:
              process.env.MONGODB_URI || "mongodb://localhost:27017/Utopia",
          })
        : null,
  })
);
// A route to login and create a session
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const is_regUser = req.body.is_regUser;
  User.findByUsernamePassword(username, password, is_regUser)
    .then((user) => {
      req.session.userid = user._id;
      req.session.username = user.username;
      req.session.is_regUser = user.is_regUser;

      res.send({
        currentUser: user.username,
        id: user._id,
        is_regUser: user.is_regUser,
      });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

app.get("/users/check-session", (req, res) => {
  if (req.session.username) {
    res.send({
      currentUser: req.session.username,
      id: req.session.userid,
      is_regUser: req.session.is_regUser,
    });
  } else {
    res.status(401).send();
  }
});
app.use(require("./routers/library"));
app.use(require("./routers/user"));
/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));
// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = ["/", "/login", "/profile", "/LibraryPage"];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }

  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});

