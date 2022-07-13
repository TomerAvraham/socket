require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const {
  userJoin,
  getRoomUsers,
  userLeave,
  getCurrentUser,
} = require("./utils/users");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const createMessage = require("./utils/message");

app.use(cors());

const botName = "Bot Chat";

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("joinRoom", (username, room) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    io.to(user.room).emit(
      "message",
      createMessage(botName, `${user.username} just join the chat`)
    );
    io.to(user.room).emit("roomUsers", getRoomUsers(user.room));
  });

  socket.on("messageReceive", (username, text, room) => {
    io.to(room).emit("message", createMessage(username, text));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    io.to(user.room).emit("roomUsers", getRoomUsers(user.room));
  });
});

const rooms = ["Javascript", "PHP", "React", "Node", "Python"];

app.get("/rooms", (req, res) => {
  res.status(200).send(rooms);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Running on port:* ${PORT}`));
