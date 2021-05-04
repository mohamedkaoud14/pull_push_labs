/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);
const id = Math.ceil(Math.random() * 10000);

const WebSockets = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (userId) {
      const data = { userId: userId, message: message };
      socket.emit("specific_message", data);
    } else {
      socket.emit("broadcast_message", message);
    }

    const displayed_message = "Me: " + message;
    setMessages(messages.concat(displayed_message));

    setMessage("");
  };

  const handleSubmitUserId = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    socket.on("new_broadcast_message", (data) => {
      const new_message = "Others: " + data;
      setMessages(messages.concat(new_message));
    });

    socket.on("new_specific_message", (data) => {
      const new_message = "Them: (" + userId + ") " + data;
      setMessages(messages.concat(new_message));
    });
  }, [messages, userId]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form onSubmit={handleSubmitUserId}>
          <div className="row justify-content-center mb-3">
            <label htmlFor="message-field" className="col-sm-2 form-label">
              User ID:
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="user-field"
                id="user-field"
                className="form-control"
                placeholder="User ID"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="row justify-content-center mt-5">
        <form onSubmit={handleSubmitMessage}>
          <div className="row justify-content-center mb-3">
            <label htmlFor="message-field" className="col-sm-2 form-label">
              Message:
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="message-field"
                id="message-field"
                className="form-control"
                placeholder="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <h2 className="text-center fw-bold">Messages</h2>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <ul>
            {messages.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WebSockets;
