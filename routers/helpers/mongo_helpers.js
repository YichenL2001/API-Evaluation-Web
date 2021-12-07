const mongoose = require('mongoose')

module.exports = {
    isMongoError: function(error) {
        return typeof error === "object" &&error !== null && error.name === "MongoNetworkError"
    },

    mongoChecker: (req, res, next) => {
        if (mongoose.connection.readyState != 1) {
          log("Issue with mongoose connection");
          res.status(500).send("Internal server error");
          return;
        } else {
          next();
        }
    }
}