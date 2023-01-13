import mongoose from "mongoose";

const { Schema, model } = mongoose;

const registerSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  image: {
    type: String,
    required: true
  }
},{timestamps : true});

export default model("user", registerSchema);