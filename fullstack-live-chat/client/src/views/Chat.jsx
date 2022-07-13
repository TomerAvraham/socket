import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";

import { io } from "socket.io-client";

const END_POINT = "http://localhost:5000/";

const Chat = () => {
  const { username, room } = useParams();
  const [roomUsers, setRoomUsers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([
    { username: "test", text: "test", time: "11:11" },
  ]);
  const socket = useRef();

  useEffect(() => {
    if (!socket.current?.connect) {
      socket.current = io.connect(END_POINT);

      socket.current.emit("joinRoom", username, room);
    }

    socket.current.on("roomUsers", (users) => {
      setRoomUsers(users);
    });

    socket.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [username, room]);

  function sendMessage(e) {
    e.preventDefault();
    socket.current.emit("messageReceive", username, inputVal, room);

    setInputVal("");
  }

  return (
    <div className="chat-wrapper">
      <div className="side-nav">
        <h3>
          Room: {room}, Online: {room.length}
        </h3>
        <ul>
          {roomUsers.map((u, i) => {
            return <li key={i}>{u.username}</li>;
          })}
        </ul>
      </div>
      <div className="msg-container">
        {messages.map((m, i) => {
          return (
            <div style={{ border: "1px solid black" }}>
              <p>
                {m.username}: {m.text}
              </p>
              <p>{m.time}</p>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage} className="msg-form">
        <input
          required
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
