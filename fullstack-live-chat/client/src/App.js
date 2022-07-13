import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Chat from "./views/Chat";
import "./main.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat/:username/:room" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
