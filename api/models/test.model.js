import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TestModel = new mongoose.model("test", TestSchema);

export default TestModel;
