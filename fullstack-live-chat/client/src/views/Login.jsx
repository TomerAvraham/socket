import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [formVal, setFormVal] = useState({});

  function handleInputChange(e) {
    setFormVal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/chat/${formVal.username}/${formVal.room}`);
  }

  async function getRooms() {
    try {
      const res = await fetch("http://localhost:5000/rooms");
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={onSubmit}>
        <p>Join online rooms to chat</p>
        <input
          onChange={handleInputChange}
          name="username"
          placeholder="Enter username..."
          type="text"
        />
        <select onChange={handleInputChange} name="room">
          <option></option>
          {rooms.map((r, i) => {
            return (
              <option value={r} key={i}>
                {r}
              </option>
            );
          })}
        </select>
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Login;
