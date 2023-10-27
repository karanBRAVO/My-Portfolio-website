import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    projectKeyFeatures: {
      type: [String],
      required: true,
    },
    projectLinks: {
      type: [
        {
          sourceName: { type: String, required: true },
          linkTo: { type: String, required: true },
        },
      ],
      required: true,
    },
    projectPreviews: {
      type: [
        {
          tag: { type: String, required: true },
          src: { type: String, required: true },
          title: { type: String, required: false, default: "title" },
        },
      ],
      required: true,
    },
    projectKeywords: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const projectModel = new mongoose.model("project", projectSchema);

export default projectModel;
