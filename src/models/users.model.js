const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "usuarios";

const UserSchema = new Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  // gender: String
});

UserSchema.plugin(mongoosePaginate);
const userModel = model(collection, UserSchema);

module.exports = {
  userModel,
};
