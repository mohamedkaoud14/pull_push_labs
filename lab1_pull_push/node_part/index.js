
const cors = require("cors");
const { response } = require("express");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const subscribers = {};
app.get("/messages/subscribe", (req, res) => {
  const id = Math.ceil(Math.random() * 10000);
  console.log(id);
  subscribers[id] = res;
  req.on("close", () => {
    delete subscribers[id];
  });
});

app.post("/messages", (req, res) => {
  Object.entries(subscribers).forEach(([id, response]) => {
    console.log(req.body);
    response.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  return console.log("started server on port 3000");
});