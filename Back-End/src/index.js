import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Socket.IO chat server running");
});



io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("joined", ({ user }) => {
    socket.username = user;

    socket.emit("welcome", {
      user: "Server",
      message: `Welcome ${user}`,
    });

    socket.broadcast.emit("userJoined", {
      user: "Server",
      message: `${user} joined the chat`,
    });
  });


  socket.on("message", ({ message }) => {
    io.emit("sendMessage", {
      user: socket.username,
      message,
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("leave", {
        user: "Server",
        message: `${socket.username} left the chat`,
      });
    }
  });
});



server.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
