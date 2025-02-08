import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Question } from "./src/models/question.model.js";

import connectDB from "./src/db/index.js";

const questions = [
  {
    text: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    choices: [
      { text: "Echo", isCorrect: true },
      { text: "Cloud" },
      { text: "Whistle" },
      { text: "Shadow" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What has keys but can't open locks?",
    choices: [
      { text: "Piano", isCorrect: true },
      { text: "Locksmith" },
      { text: "Computer" },
      { text: "Map" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "The more you take, the more you leave behind. What am I?",
    choices: [
      { text: "Footsteps", isCorrect: true },
      { text: "Time" },
      { text: "Memory" },
      { text: "Bread crumbs" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    choices: [
      { text: "Candle", isCorrect: true },
      { text: "Tree" },
      { text: "Mountain" },
      { text: "Clock" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What can travel around the world while staying in the corner?",
    choices: [
      { text: "Stamp", isCorrect: true },
      { text: "Clock" },
      { text: "Cloud" },
      { text: "Postman" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    choices: [
      { text: "The letter 'M'", isCorrect: true },
      { text: "Time" },
      { text: "Second" },
      { text: "Day" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What has a head, a tail, but no body?",
    choices: [
      { text: "Coin", isCorrect: true },
      { text: "Snake" },
      { text: "Fish" },
      { text: "Lion" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "I am not alive, but I grow. I don't have lungs, but I need air. What am I?",
    choices: [
      { text: "Fire", isCorrect: true },
      { text: "Cloud" },
      { text: "Tree" },
      { text: "Fish" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What can fill a room but takes up no space?",
    choices: [
      { text: "Light", isCorrect: true },
      { text: "Sound" },
      { text: "Air" },
      { text: "Water" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
  {
    text: "What has one eye but can’t see?",
    choices: [
      { text: "Needle", isCorrect: true },
      { text: "Cyclops" },
      { text: "Storm" },
      { text: "Fish" },
    ],
    category_id: "67911d49b6a2234fd397a54e",
  },
];

const insertQuestions = async () => {
  try {
    await Question.insertMany(questions);
    console.log("Questions inserted successfully!");
  } catch (error) {
    console.error("Error inserting questions:", error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await insertQuestions();
};

run();
