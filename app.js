const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")))
const PORT = process.env.PORT || 3000;

io.on("connection", (socket)=>{
  socket.on("chatting",(data)=>{
    const{ name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("HH:mm A")
    })
  })
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

server.listen(PORT, () => console.log(`server is running ${PORT}`))
