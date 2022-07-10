const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// SocketID : username
const users = {};

io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("new-connection", (username) => {
    users[socket.id] = username;
    io.emit("count-online", Object.keys(users).length);
  });

  socket.on("send-msg", (msg) => {
    console.log("Message receive: " + msg);
    io.emit("receive-msg", { msg, username: users[socket.id] });
  });

  socket.on("user-typing", () => {
    console.log(users[socket.id] + " someone typing");
    io.emit("user-typing", users[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
    delete users[socket.id];
    io.emit("count-online", Object.keys(users));
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Running on port:${PORT}`));
