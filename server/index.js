const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const TodoItem = require("./models/TodoItem");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await TodoItem.find();
  res.send(todos);
});

//Adding New Todo items
app.post("/todos", async (req, res) => {
  const newTodo = new TodoItem(req.body);
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

//Update
app.put("/todos/:id", async (req, res) => {
  const updateTodo = await TodoItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ message: "Todo Updated" });
});

//Deletion of Todo Items
app.delete("/todos/:id", async (req, res) => {
  await TodoItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo Deleted" });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 3000");
});
