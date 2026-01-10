const express = require("express");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

app.use("/api/todos", (req,res) => {
    res.send("Chal gaya")
});

module.exports = app;
