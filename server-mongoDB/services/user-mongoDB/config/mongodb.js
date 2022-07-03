const { MongoClient } = require("mongodb");

// const uri = "mongodb://localhost:27017"; // ganti dengan uri mongo atlas jika ingin di deploy
// const uri = `${process.env.MONGO_ATLAS}` || "mongodb://localhost:27017";

var uri = `mongodb://nasrunrozikinmm:${process.env.MONGO_ATLAS_PASSWORD}@ac-ynziez5-shard-00-00.qq8wmnv.mongodb.net:27017,ac-ynziez5-shard-00-01.qq8wmnv.mongodb.net:27017,ac-ynziez5-shard-00-02.qq8wmnv.mongodb.net:27017/?ssl=true&replicaSet=atlas-rwvk1t-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let allData;

const run = async () => {
    try {
        await client.connect();
        const database = await client.db("hack-movies");

        allData = database;
        console.log("ini dari mongo atlas");
        return database;
    } catch (error) {
        console.log(error);
    }
};

const getDatabase = () => {
    return allData;
};

module.exports = {
    run,
    getDatabase,
};
