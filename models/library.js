const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
});

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  replies: [ReplySchema],
  rate: Number,
});

const LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  comments: [CommentSchema],
  rate: Number,
  picture: String,
});

const Library = mongoose.model("Library", LibrarySchema);

module.exports = { Library, LibrarySchema };
