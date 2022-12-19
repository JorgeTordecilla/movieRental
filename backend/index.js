const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/movies/", require("./routes/movies"));
app.use("/api/users/", require("./routes/users"));

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, () =>
  console.log(`Servidor corriendo http://localhost:${PORT}`)
);
