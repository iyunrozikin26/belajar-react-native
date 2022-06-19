const express = require("express");
const app = express();
const PORT = 8080;

const { run } = require("./config/mongodb");
const router = require("./routes/router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
