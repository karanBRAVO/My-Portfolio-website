import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    public_id: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const skillModel = new mongoose.model("Skill", skillsSchema);

export default skillModel;
