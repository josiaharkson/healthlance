const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");

const { serverRuntimeConfig } = require("next/config").default();
const MONGO_URI = serverRuntimeConfig.MONGO_URI;

nextApp.prepare().then(() => {
  const app = express();
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

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
