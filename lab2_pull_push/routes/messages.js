const express = require("express");

const Router = express.Router();

const messages = [{ message: "msg1" }];
const users = {};
const subscribers = {};

Router.post("/messages", (req, res) => {
  messages.push(req.body);
  res.status(204).end();
});

Router.get("/:user_id/messages", (req, res) => {
  const id = req.params.user_id;
  if (users[id]) {
    const newMessages = messages.filter((msg) => {
      if (users[id].indexOf(msg) === -1) {
        users[id].push(msg);
        return msg;
      }
    });
    res.send(newMessages);
  } else {
    users[id] = Object.assign([], messages);
    res.send(users[id]);
  }
});

Router.get("/messages/subscribe", (req, res) => {
  const id = Math.ceil(Math.random() * 10000);
  subscribers[id] = res;

  req.on("close", () => {
    delete subscribers[id];
  });
});

Router.post("/messages/longpoll", (req, res) => {
  Object.entries(subscribers).forEach(([id, response]) => {
    response.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
});

module.exports = Router;
