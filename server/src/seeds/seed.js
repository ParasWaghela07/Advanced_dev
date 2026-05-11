import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "../config/db.js";

import User from "../models/user.model.js";

import Project from "../models/project.model.js";

const seedDatabase = async () => {

  try {

    await connectDB();

    // 🧹 clear old data
    await User.deleteMany();

    await Project.deleteMany();

    console.log("Old data cleared");

    // 👥 create users
    const users = await User.create([
      {
        name: "Paras",
        email: "paras@gmail.com",
        password: "123456",
        role: "admin"
      },

      {
        name: "John",
        email: "john@gmail.com",
        password: "123456"
      },

      {
        name: "Alice",
        email: "alice@gmail.com",
        password: "123456"
      },

      {
        name: "David",
        email: "david@gmail.com",
        password: "123456"
      },

      {
        name: "Emma",
        email: "emma@gmail.com",
        password: "123456"
      }
    ]);

    console.log("Users created");

    // 📁 create projects
    const projects = [];

    const statuses = [
      "active",
      "completed"
    ];

    for (let i = 1; i <= 30; i++) {

      const randomUser =
        users[
          Math.floor(
            Math.random() * users.length
          )
        ];

      projects.push({

        title: `Backend Project ${i}`,

        description:
          `Scalable backend project ${i}`,

        status:
          statuses[
            Math.floor(
              Math.random() * statuses.length
            )
          ],

        owner: randomUser._id

      });

    }

    await Project.insertMany(projects);

    console.log("Projects created");

    console.log("Database seeded successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }

};

seedDatabase();