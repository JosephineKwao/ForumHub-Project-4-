import Question from "../models/questionModel.js";

export const getQuestionsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const questions = await Question.find({ category: categoryId }).populate("user", "username");
  res.json(questions);
};

export const createQuestion = async (req, res) => {
  const { category, question } = req.body;
  const newQ = new Question({ category, question, user: req.user.id });
  await newQ.save();
  res.status(201).json(newQ);
};
