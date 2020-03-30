require("dotenv").config();

const express = require("express");
const handlebars = require("express-handlebars");
const { getTodos, addTodo, deleteTodo, updateTodo } = require("./crud.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts"
  })
);

app.get("/", (req, res) => {
  getTodos().then(todos => {
    res.render("index", { todos });
  });
});

app.post("/addTodo", (req, res) => {
  addTodo(req.body.title).then(
    () => res.redirect("/"),
    () => res.redirect("/")
  );
});

app.post("/deleteTodo/:id", (req, res) => {
  deleteTodo(req.params.id).then(
    () => res.redirect("/"),
    () => res.redirect("/")
  );
});

app.post("/toggleTodo/:id", (req, res) => {
  updateTodo(req.params.id).then(
    () => res.redirect("/"),
    () => res.redirect("/")
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started");
});
