const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let allData;

const run = async () => {
    try {
        await client.connect();
        const database = await client.db("hack-movies");

        allData = database;
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
