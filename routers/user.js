const log = console.log;
const env = process.env.NODE_ENV;
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { mongoose } = require("../db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectID } = require("mongodb");

/*********************************************************/

/*** API Routes below ************************************/
router.post("/api/users", mongoChecker, async (req, res) => {
  log(req.body);

  // Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    is_regUser: true,
  });

  try {
    // Save the user
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request");
    }
  }
});
router.post("/api/admin", mongoChecker, async (req, res) => {
  log(req.body);

  // Create a new admin
  const aduser = new User({
    username: "admin",
    password: "admin",
    is_regUser: false,
  });

  try {
    // Save the user
    await aduser.save();
    res.send();
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request");
    }
  }
});
//get all regular users
router.get("/api/users", mongoChecker, async (req, res) => {
  try {
    const users = await User.find({ is_regUser: true });
    res.send({ users });
  } catch (error) {
    log(error);
    res.status(500).send("Internal server error");
  }
});

//route to get user info
router.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("User id not valid");
    return;
  }
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});
//route to update a user info
router.post("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("User id not valid");
    return;
  }
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.gender = req.body.gender;
      user.birthday = req.body.birthday;
      user.job = req.body.job;
      user.skills = req.body.skills;
      user.more = req.body.more;

      await user.save();
      res.send(req.body);
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

//insert a favorite lib in user with id
router.post("/api/users/libs/:id", async (req, res) => {
  const id = req.params.id;
  const lib = req.body;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("User id not valid");
    return;
  }
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }
  try {
    const user = await User.findById(id);
    user.fav_libs.push(lib);
    await user.save();
    res.send();
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

//get all lib of a user id
router.get("/api/users/libs/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("User id not valid");
    return;
  }
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }
  try {
    const user = await User.findById(id);
    res.send(user.fav_libs);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

//delete a favorite lib with user id and lib id
router.delete("/api/users/libs/:id/:lib_id", async (req, res) => {
  const id = req.params.id;
  const lib_id = req.params.lib_id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("User id not valid");
    return;
  }
  if (mongoose.connection.readyState != 1) {
    res.status(500).send("Internal server error");
    return;
  }
  try {
    const user = await User.findById(id);
    user.fav_libs.remove(lib_id);
    await user.save();
    res.send();
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});
router.delete("/api/users/:id", mongoChecker, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Resource not found");
  }
  try {
    const user = await User.findOneAndRemove({ _id: id });
    if (!user) {
      res.status(404).send("No such library");
    } else {
      res.send(user);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
