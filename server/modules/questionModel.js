import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: { type: String, required: true },
  answer: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
