import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

import { prisma } from "db";

dotenv.config();

const PORT = process.env.PORT || 3000;
const WS_URL = process.env.WS_URL as string;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.send("server healthy"));

app.get("/todos", async (_req, res) => {
  const todos = await prisma.todos.findMany();
  res.send(todos);
});

app.post("/todo", async (_req, res) => {
  const todo = await prisma.todos.create({
    data: { name: "New todo created" },
  });
  await axios.post(WS_URL, { todo });
  res.json({ message: "todo created" });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
