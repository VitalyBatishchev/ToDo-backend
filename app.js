const express = require ('express');
const cors = require ("cors");
const mongoose = require ("mongoose");
// const { ObjectId } = require('mongodb');
// const _id = ObjectId();
const app = express ();

const {Schema} = mongoose;

const taskScheme = new Schema ({
  text: String,
  isChek: Boolean,
  _id: mongoose.Schema.Types.ObjectId
});

const Task = mongoose.model ("tasks", taskScheme);

app.use (cors());

const url = "mongodb+srv://Vitaliy:ZAQwed123@cluster0.c5jod.mongodb.net/TodoList?retryWrites=true&w=majority";
mongoose.connect (url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use (express.json());

app.get ("/allTasks", (req, res) => {
  Task.find ().then (result => {
    res.send ({data: result})
  });
});

app.post ("/createTasks", (req, res) => {
  const task = new Task (req.body);
  task.save ();
  Task.find ().then (result => {
    res.send ({data: result})
  });
});

app.delete ("/deleteTasks/:id", (req, res) => {
  const {_id} = req.params;
  Task.deleteOne({_id });
  Task.find ().then (result => {
    res.send ({data: result})
  });
});

app.put ("/updateTasks", (req, res) => {
  const {text, isChek, _id} = req.body;
  Task.updateOne ({_id }, {text, isChek});
  Task.find ().then (result => {
    res.send ({data: result})
  });
});

app.listen (5000, () => {
  console.log ("Example app");
});