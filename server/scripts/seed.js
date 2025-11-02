import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import Question from "../models/questionModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // Clear old data
    await User.deleteMany();
    await Category.deleteMany();
    await Question.deleteMany();

    // Create demo user
    const hashedPassword = await bcrypt.hash("demo1234", 10);
    const user = await User.create({
      username: "demoUser",
      email: "demo@example.com",
      password: hashedPassword
    });

    // Create categories
    const categories = await Category.insertMany([
      { name: "JavaScript" },
      { name: "Node.js" },
      { name: "React" }
    ]);

    // Create sample questions
    const questions = await Question.insertMany([
      {
        category: categories[0]._id,
        user: user._id,
        question: "What is a closure in JavaScript?",
        answers: [
          { user: user._id, text: "A closure allows access to variables from an outer function." }
        ]
      },
      {
        category: categories[1]._id,
        user: user._id,
        question: "How do you handle errors in Express?",
        answers: [
          { user: user._id, text: "By using middleware with four parameters: (err, req, res, next)." }
        ]
      },
    ]);

    console.log("🌱 Seeding complete!");
    console.log(`Created user: ${user.username}`);
    console.log(`Created categories: ${categories.map(c => c.name).join(", ")}`);
    console.log(`Created questions: ${questions.length}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
