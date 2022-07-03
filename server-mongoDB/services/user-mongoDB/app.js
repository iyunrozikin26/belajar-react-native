require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

const { run } = require("./config/mongodb");
const router = require("./routes/router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

run()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`MongoDB connected http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/users", router);
