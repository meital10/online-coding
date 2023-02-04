const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 4000;
const CodeBlock = require("./codeBlockSchema");

const http = require("http").Server(app);
const cors = require("cors");
// const { title } = require("process");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// connet to mongodb
const MongoClient = require("mongodb").MongoClient;
const mongoDB = "mongodb+srv://meital:1961@cluster0.ggtxa.mongodb.net/meitaldb";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db is connected");
  });
const client = new MongoClient(mongoDB, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("meitaldb").collection("codeBlocks");
//   // Find all documents in the devices collection
//   collection.find({}).toArray(function (err, result) {
//     if (err) throw err;
//     // Send the result to the socket
//     socket.emit("data", result);
//   });
//   client.close();
// });

// findById({})
// updateOne

let mentorSocketId = null;

socketIO.on("connection", (socket) => {
  console.log(` ${socket.id} user just connected!`);
  CodeBlock.find().then((result) => {
    socket.emit("output-codes-names", result);
  });

  // find code by id

  socket.on("get-chosen-code", (id) => {
    CodeBlock.findById(id).then((result) => {
      console.log("code by id:", result);
      const data = { result, userType: "student" };
      if (!mentorSocketId) {
        mentorSocketId = socket.id;
        data.userType = "mentor";
      }
      socket.emit("response-chosen-code", data);
      console.log("data user type is:");
    });
  });
  socket.on("code", (data) => {
    const cblock = new CodeBlock({ title: data.title, code: data.code });
    console.log("cblock:", cblock);
    // cblock.save().then(() => {
    socketIO.emit("codeResponse", data);
  });
  // socket.on('editCodeBlock', (data) => {
  //   socket.broadcast.emit('editCodeBlock-response', data);
  // })

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    // socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

socketIO.on("errorConnection", (err) => {
  console.log(`Error Conection: ${err.message}`);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
