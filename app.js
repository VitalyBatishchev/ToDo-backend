const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const {Schema} = mongoose;

const taskScheme = new Schema ({
  text: String,
  isChek: Boolean,
});

const Task = mongoose.model("tasks", taskScheme);

app.use(cors());

const url = "mongodb+srv://Vitaliy:ZAQwed123@cluster0.c5jod.mongodb.net/TodoList?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.get("/allTasks", (req, res) => {
  Task.find().then(result => {
    res.send({data: result})
  });
});

app.post("/createTasks", (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send("task created")
  })
});

app.delete("/deleteTasks/:id", (req, res) => {
  const {id} = req.query;
  Task.deleteOne({_id: id}).then(result => {
    res.send(result)
  });
});

app.put("/updateTasks/:id", (req, res) => {
  const {id} = req.body;
  Task.updateOne({_id: id}).then(result => {
    Task.find({_id: id}).then(result => {
      res.send({data: result})
    });
  });
});

app.listen(5000, () => {
  console.log("Example app");
});