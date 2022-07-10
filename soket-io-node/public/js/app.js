var socket = io();

// DOM Elements
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const countOnlineEl = document.getElementById("count-online");
const typingEl = document.getElementById("typing");

const username = prompt("Please enter your name: ");

// socket logic
socket.emit("new-connection", username);

socket.on("receive-msg", (data) => {
  const li = document.createElement("li");
  li.textContent = `${data.username}: ${data.msg}`;
  if (username === data.username) {
    li.classList.add("my-message");
  }
  messages.appendChild(li);
});

socket.on("count-online", (count) => {
  countOnlineEl.textContent = count;
});

socket.on("user-typing", (username) => {
  typingEl.textContent = `${username} is typing...`;
  setTimeout(() => {
    typingEl.textContent = "";
  }, 3000);
});

// Events
form.onsubmit = (e) => {
  e.preventDefault();

  socket.emit("send-msg", input.value);
  input.value = "";
};

input.addEventListener("input", function () {
  socket.emit("user-typing");
});
