const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");
const CodeBlock = require("./codeBlockSchema");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

dotenv.config();

// connet to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected");
  });

let mentorSocketId = null;

// get blockcode names from DB and pass it to the client through socket
socketIO.on("connection", (socket) => {
  console.log(` ${socket.id} user just connected!`);
  CodeBlock.find().then((result) => {
    socket.emit("output-codes-names", result);
  });

  // get blockcode by id from DB and pass it to the client through socket
  socket.on("get-chosen-code", (id) => {
    CodeBlock.findById({ _id: mongoose.Types.ObjectId(id) }).then((result) => {
      // The student is default and second option. if there is id in the socket we can know is already there
      const data = { result };
      if (!mentorSocketId) {
        mentorSocketId = socket.id;
        data.userType = "mentor";
      } else {
        data.userType = mentorSocketId === socket.id ? "mentor" : "student";
      }
      socket.emit("response-chosen-code", data);
      // console.log("data user type is:", data);
    });
  });

  socket.on("editCodeBlock", (data) => {
    // console.log("DATA IS:", data);
    socket.broadcast.emit("editCodeBlock-response", data);
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected");
    if (mentorSocketId === socket.id) {
      mentorSocketId = null;
    }
    socket.disconnect();
  });
});

socketIO.on("errorConnection", (err) => {
  console.log(`Error Conection: ${err.message}`);
});

process.on("uncaughtException", (err, origin) => {
  console.log(err);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
