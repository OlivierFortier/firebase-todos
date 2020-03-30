require("dotenv").config();

const firebase = require("firebase/app");
const admin = require("firebase-admin");
const uuidv4 = require("uuid/v4");

const accPath = process.env.DB_SERVICE_ACCOUNT_PATH;
const serviceAccount = require(accPath);

//initialise firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyD1Y7AwmOmXU9mOkrZ45vAPBIrJeMPwFpo",
  authDomain: "express-todos-2f993.firebaseapp.com",
  databaseURL: "https://express-todos-2f993.firebaseio.com",
  projectId: "express-todos-2f993",
  storageBucket: "express-todos-2f993.appspot.com",
  messagingSenderId: "536110210298",
  appId: "1:536110210298:web:e04e73ea17f681792afd43"
});

const db = admin.firestore();

//reference to collection
const docRef = db.collection("todos");

// get todos
async function getTodos() {
  try {
    const query = await docRef.get();
    let todoList = [];
    query.forEach(doc => todoList.push(doc.data()));

    return todoList;
  } catch (err) {
    console.log(err);
  }
}

async function getTodo(idTodo) {
  try {
    let todo;
    const document = await docRef
      .doc(`${idTodo}`)
      .get()
      .then(doc => (todo = doc.data()));

    return todo;
  } catch (error) {
    console.log(error);
  }
}

// add todos
async function addTodo(titleTodo) {
  const theId = uuidv4();
  const todoData = {
    id: theId,
    title: titleTodo,
    completed: false
  };
  await docRef.doc(`${theId}`).set(todoData);
}

// delete todos
async function deleteTodo(idTodo) {
  await docRef.doc(`${idTodo}`).delete();
}

//update todos
async function updateTodo(idTodo) {
  const todo = await getTodo(idTodo);
  todo.completed = !todo.completed;

  await docRef.doc(`${idTodo}`).set(todo);
}

//module exports
module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.addTodo = addTodo;
module.exports.deleteTodo = deleteTodo;
module.exports.updateTodo = updateTodo;
