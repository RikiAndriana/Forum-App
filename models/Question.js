import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    question: {
      type: String,
      required: [true, "question is required"],
    },
    category: {
      type: String,
      enum: ["javascript", "database", "nodejs", "vuejs"],
      required: [true, "category is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
