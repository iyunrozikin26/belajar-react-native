const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionName = "users";

class User {
    static findAll() {
        return getDatabase().collection(collectionName).find().toArray();
    }

    static findById(id) {
        return getDatabase()
            .collection(collectionName)
            .find({ _id: ObjectId(id) })
            .toArray();
    }

    static createUser(newUser) {
        return getDatabase().collection(collectionName).insertOne(newUser);
    }

    static patchingUser(id, updateData) {
        return getDatabase()
            .collection(collectionName)
            .updateOne({ _id: ObjectId(id) }, { $set: updateData });
    }

    static deleted(id) {
        return getDatabase()
            .collection(collectionName)
            .deleteOne({ _id: ObjectId(id) });
    }
}
module.exports = User;
