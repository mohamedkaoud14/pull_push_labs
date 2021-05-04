/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);
const id = Math.ceil(Math.random() * 10000);

const WebSockets = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState("");

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const data = { group: group, message: message };
    socket.emit("message_to_room", data);

    const displayed_message = "Me: " + message;
    setMessages(messages.concat(displayed_message));

    setMessage("");
  };

  const handleSubmitGroup = (e) => {
    e.preventDefault();

    socket.emit("subscribe_to_room", group);
  };

  useEffect(() => {
    socket.on("new_specific_group_message", (data) => {
      const new_message = "Group (" + group + "): " + data;
      setMessages(messages.concat(new_message));
    });
  }, [messages, group]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form onSubmit={handleSubmitGroup}>
          <div className="row justify-content-center mb-3">
            <label htmlFor="message-field" className="col-sm-2 form-label">
              Group Name:
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="user-field"
                id="user-field"
                className="form-control"
                placeholder="Group"
                required
                value={group}
                onChange={(e) => setGroup(e.target.value)}
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
