import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  passkeys: {
    type: [String],
    required: true,
  },
});

const adminModel = new mongoose.model("admin", adminSchema);

export default adminModel;
