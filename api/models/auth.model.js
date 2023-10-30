import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  photoUrl: {
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl0RfnwxikjcUFQjgV8CP2lM1zHdthx9PUHkJ57NW-yQWBCUBFvZIH&usqp=CAE&s",
  },
  subscribed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const authModel = new mongoose.model("User", authSchema);

export default authModel;
