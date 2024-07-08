const express = require("express");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // no SSL set up so need that.

require('dotenv').config()
const app = express();

app.use(express.json());

const db = require("./app/models");

const my_table = require("./app/controllers/my_table.controller.js")
app.get("/", my_table.all)

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});