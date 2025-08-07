import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js"; // adjust path if needed

dotenv.config();

const sampleProjects = [
  {
    title: "Interactive Portfolio",
    description: "A sleek portfolio site with animations, filters, and admin dashboard.",
    techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio.example.com",
    images: [],
    tags: ["React", "Fullstack", "Tailwind"],
    isFeatured: true
  },
  {
    title: "Game Tracker",
    description: "A web app to track games using IGDB API, built in Next.js.",
    techStack: ["Next.js", "TypeScript", "MongoDB"],
    githubUrl: "https://github.com/username/game-tracker",
    liveUrl: "",
    images: [],
    tags: ["Next.js", "Games", "MongoDB"],
    isFeatured: false
  },
  {
    title: "Realtime Chat App",
    description: "Socket.io powered chat app with live user updates and authentication.",
    techStack: ["Node.js", "Socket.io", "Express", "MongoDB"],
    githubUrl: "https://github.com/username/chat-app",
    liveUrl: "https://chat.example.com",
    images: [],
    tags: ["Node.js", "WebSocket", "Chat"],
    isFeatured: false
  },
  {
    title: "Todo App (Godot)",
    description: "A small productivity app made with GDScript and Godot for desktop.",
    techStack: ["Godot", "GDScript"],
    githubUrl: "https://github.com/username/godot-todo",
    liveUrl: "",
    images: [],
    tags: ["Godot", "GDScript", "Desktop"],
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany();
    await Project.insertMany(sampleProjects);
    console.log("Database seeded with sample projects.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
