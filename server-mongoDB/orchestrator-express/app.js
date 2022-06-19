const express = require("express");
const router = require("./routes/router");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log("Orchestrator-express on port", PORT);
});
