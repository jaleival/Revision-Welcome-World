import express from "express";
import router from "./routes/router.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use("/", router);

// Escuchar el puerto
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
