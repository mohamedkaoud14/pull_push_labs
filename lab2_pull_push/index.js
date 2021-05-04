const cors = require("cors");
const express = require("express");
const http = require("http");
const messagesRouter = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("broadcast_message", (data) => {
    socket.broadcast.emit("new_broadcast_message", data);
  });

  socket.on("specific_message", (data) => {
    const userId = data.userId;
    const message = data.message;
    io.to(userId).emit("new_specific_message", message);
  });

  socket.on("subscribe_to_room", (room) => {
    socket.join(room);
  });

  socket.on("message_to_room", (data) => {
    const group = data.group;
    const message = data.message;
    socket.to(group).emit("new_specific_group_message", message);
  });
});

const port = 3001;
server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Sever started on port 3001");
});
