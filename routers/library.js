const log = console.log;

const express = require("express");
const router = express.Router();

const { Library } = require("../models/library");

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

const { ObjectID } = require("mongodb");

router.post("/api/libraries", mongoChecker, async (req, res) => {
  const library = new Library({
    name: req.body.name,
    description: req.body.description,
    language: req.body.language,
    comments: [],
    rate: 0,
    picture: req.body.picture,
  });
  try {
    const newLibrary = await library.save();
    res.send(newLibrary);
  } catch (error) {
    log(error);
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request");
    }
  }
});

router.get(
  "/api/libraries/library/:libName",
  mongoChecker,
  async (req, res) => {
    const libName = req.params.libName;
    try {
      const library = await Library.findOne({ name: libName });
      if (!library) {
        res.status(404).send("No such library");
      } else {
        res.send(library);
      }
    } catch (error) {
      log(error);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/api/libraries", mongoChecker, async (req, res) => {
  try {
    const libraries = await Library.find();
    res.send({ libraries });
  } catch (error) {
    log(error);
    res.status(500).send("Internal server error");
  }
});

router.get(
  "/api/libraries/language/:language",
  mongoChecker,
  async (req, res) => {
    try {
      const libraries = await Library.find();
      const lib = [];
      const language = req.params.language;
      for (var i = 0; i < libraries.length; i++) {
        if (libraries[i]["language"] == language) {
          lib.push(libraries[i]);
        }
      }
      res.send({ lib });
    } catch (error) {
      log(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/api/libraries/:libID", mongoChecker, async (req, res) => {
  const libID = req.params.libID;
  if (!ObjectID.isValid(libID)) {
    res.status(404).send("Resource not found");
  }
  try {
    const library = await Library.findOne({ _id: libID });
    if (!library) {
      res.status(404).send("No such library");
    } else {
      res.send(library);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/api/libraries/:libID", mongoChecker, async (req, res) => {
  const libID = req.params.libID;
  if (!ObjectID.isValid(libID)) {
    res.status(404).send("Resource not found");
  }
  try {
    const library = await Library.findOneAndRemove({ _id: libID });
    if (!library) {
      res.status(404).send("No such library");
    } else {
      res.send(library);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Server Error");
  }
});

// add comments to library
router.post("/api/libraries/:libID", mongoChecker, async (req, res) => {
  const libID = req.params.libID;
  if (!ObjectID.isValid(libID)) {
    res.status(400).send("Resource not found");
    return;
  }
  try {
    const library = await Library.findById(libID);
    if (!library) {
      res.status(404).send("Resource not found");
    } else {
      const comment = {
        user_id: req.body.user_id,
        comment: req.body.comment,
        username: req.body.username,
        replies: [],
        rate: req.body.rate,
      };
      library["rate"] =
        (library["comments"].length * library["rate"] + comment["rate"]) /
        (library["comments"].length + 1);
      library["comments"].push(comment);
      const result = await library.save();
      res.send({ comment: library["comments"][-1], library: result });
    }
  } catch (error) {
    log(error);
    if (isMongoError(error)) {
      res.status(500).send("Internal server Error");
    } else {
      res.status(400).send("Bad request");
    }
  }
});

router.delete(
  "/api/libraries/:libID/:commentID",
  mongoChecker,
  async (req, res) => {
    const libID = req.params.libID;
    const commentID = req.params.commentID;
    if (!ObjectID.isValid(libID) || !ObjectID.isValid(commentID)) {
      res.status(400).send("Resource not found");
      return;
    }
    try {
      const library = await Library.findById(libID);
      for (var i = 0; i < library["comments"].length; i++) {
        if (library["comments"][i]._id == commentID) {
          const comment = library["comments"][i];
          if (library["comments"].length === 1) {
            library["rate"] = 0;
          } else {
            library["rate"] =
              (library["comments"].length * library["rate"] - comment["rate"]) /
              (library["comments"].length - 1);
          }
          library["comments"].splice(i, 1);
          const result = await library.save();
          res.send({ comment: comment, library: result });
          return;
        }
      }
      res.status(404).send("comment not found");
    } catch (error) {
      log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// add reply
router.post(
  "/api/libraries/:libID/:commentID",
  mongoChecker,
  async (req, res) => {
    const libID = req.params.libID;
    const commentID = req.params.commentID;
    if (!ObjectID.isValid(libID) || !ObjectID.isValid(commentID)) {
      res.status(400).send("Resource not found");
      return;
    }
    try {
      const library = await Library.findById(libID);
      if (!library) {
        res.status(404).send("Resource not found");
      } else {
        for (var i = 0; i < library["comments"].length; i++) {
          if (commentID == library["comments"][i]._id) {
            const reply = {
              user_id: req.body.user_id,
              username: req.body.username,
              comment: req.body.comment,
            };
            library["comments"][i]["replies"].push(reply);
            const result = await library.save();
            res.send({
              comment: library["comments"][i]["replies"][-1],
              library: result,
            });
            return;
          }
        }
        res.status(404).send("comment not found");
      }
    } catch (error) {
      log(error);
      if (isMongoError(error)) {
        res.status(500).send("Internal server Error");
      } else {
        res.status(400).send("Bad request");
      }
    }
  }
);

router.delete(
  "/api/libraries/:libID/:commentID/:replyID",
  mongoChecker,
  async (req, res) => {
    const libID = req.params.libID;
    const commentID = req.params.commentID;
    const replyID = req.params.replyID;
    if (
      !ObjectID.isValid(libID) ||
      !ObjectID.isValid(commentID) ||
      !ObjectID.isValid(replyID)
    ) {
      res.status(400).send("Resource not found");
      return;
    }
    try {
      const library = await Library.findById(libID);
      for (var i = 0; i < library["comments"].length; i++) {
        if (library["comments"][i]._id == commentID) {
          const comment = library["comments"][i];
          for (var j = 0; j < comment["replies"].length; j++) {
            if (comment["replies"][j]._id == replyID) {
              const reply = library["comments"][i]["replies"][j];
              library["comments"][i]["replies"].splice(j, 1);
              const result = await library.save();
              res.send({ reply: reply, library: result });
              return;
            }
          }
          res.status(404).send("reply nor found");
        }
      }
      res.status(404).send("comment not found");
    } catch (error) {
      log(error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
