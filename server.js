const express = require("express");
const app = express();

const next = require("next");
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");

const { serverRuntimeConfig } = require("next/config").default();
const MONGO_URI = serverRuntimeConfig.MONGO_URI;

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

nextApp.prepare().then(() => {
  app.use(express.json());

  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log("DB connected")
  );

  // User Routes Endpoint
  app.use("/api/user", require("./server/routes/user"));

  // Country Routes Endpoint
  app.use("/api/country", require("./server/routes/country"));

  // Assist Routes Endpoint
  app.use("/api/assist", require("./server/routes/assist"));

  // Lets next js handle any other route e.g client-side
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
  });

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
