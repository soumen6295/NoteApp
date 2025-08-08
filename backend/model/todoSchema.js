import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "person1",
      required: true,
    },
    title : {
      type: String,
      required: true,
    },
    description : {
        type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("task", todoSchema);