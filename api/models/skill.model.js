import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const skillModel = new mongoose.model("Skill", skillsSchema);

export default skillModel;
