/* User model */
"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const favLib = new mongoose.Schema({
  lib_id: String,
  name: String,
  pic: String,
  language: String,
});
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
  },
  name: { type: String },
  phone: { type: Number },
  gender: { type: String },
  birthday: { type: String },
  job: { type: String },
  skills: { type: String },
  more: { type: String },
  is_regUser: { type: Boolean },
  fav_libs: { type: [favLib] },
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (
  username,
  password,
  is_regUser
) {
  const User = this; // binds this to the User model

  // First find the user by their username
  return User.findOne({ username: username, is_regUser: is_regUser }).then(
    (user) => {
      if (!user) {
        return Promise.reject(); // a rejected promise
      }
      // if the user exists, make sure their password is correct
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    }
  );
};

// make a model using the User schema
const User = mongoose.model("User", UserSchema);
module.exports = { User };
