 const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/html");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let names = [];
let lastName = "";
let tasks = [];

app.get("/", (req, res) => {
  res.render("index.html", {
    names: names,
    lastName: lastName,
    tasks: tasks,
    error: null
  });
});

app.get("/greet", (req, res) => {
  const name = req.query.name;
  console.log(name);
  if (name && name.trim() !== "") {
    names.push(name);
    lastName = name;
  }
  res.redirect("/");
});

app.get("/greet/:index", (req, res, next) => {
  const i = parseInt(req.params.index);
  if (isNaN(i) || i < 0 || i >= names.length) {
    const err = new Error("Name not found. Number " + req.params.index + " is out of range.");
    return next(err);
  }
  res.render("wazzup.html", {
    name: names[i]
  });
});

app.put("/greet/:name", (req, res) => {
  const name = req.params.name;
  names.push(name);
  lastName = name;
  res.json(names);
});

app.get("/task", (req, res) => {
  res.json(tasks);
});

app.post("/task", (req, res) => {
  const task = req.body.task;
  if (task && task.trim() !== "") {
    tasks.push(task);
  }
  res.redirect("/");
});

app.get("/task/delete/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (!isNaN(i) && i >= 0 && i < tasks.length) {
    tasks.splice(i, 1);
  }
  res.redirect("/");
});

app.delete("/task/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (!isNaN(i) && i >= 0 && i < tasks.length) {
    tasks.splice(i, 1);
  }
  res.redirect("/");
});

app.get("/task/up/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (!isNaN(i) && i > 0 && i < tasks.length) {
    const temp = tasks[i - 1];
    tasks[i - 1] = tasks[i];
    tasks[i] = temp;
  }
  res.redirect("/");
});

app.get("/task/down/:index", (req, res) => {
  const i = parseInt(req.params.index);
  if (!isNaN(i) && i >= 0 && i < tasks.length - 1) {
    const temp = tasks[i + 1];
    tasks[i + 1] = tasks[i];
    tasks[i] = temp;
  }
  res.redirect("/");
});

app.use((err, req, res, next) => {
  res.render("index.html", {
    names: names,
    lastName: lastName,
    tasks: tasks,
    error: err.message
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
