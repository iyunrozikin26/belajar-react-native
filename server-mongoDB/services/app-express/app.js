require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const router = require("./routes/router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router); // sesuaikan

app.listen(port, () => {
    console.log(`listening on : http://localhost:${port}`);
});
