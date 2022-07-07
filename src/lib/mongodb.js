require('dotenv').config();
const { MongoClient, ObjectID } = require('mongodb');

class Db {    
    constructor() {
        console.log("mongo",process.env.mongodb);
        this.client = new MongoClient(process.env.mongodb, { useNewUrlParser: true });
        this.dbName = process.env.dbName;
    }
    
    
    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(error);
        }
    }
    
    async getDb() {
        return this.client.db(this.dbName);
    }
    
    async getCollection(collectionName) {
        const db = await this.getDb();
        return db.collection(collectionName);
    }
    
    async getAll(collectionName) {
        const collection = await this.getCollection(collectionName);
        return await collection.find({}).toArray();
    }
    
    async getOne(collectionName, id) {
        const collection = await this.getCollection(collectionName);
        return await collection.findOne({ _id: new ObjectID(id) });
    }
    
    async create(collectionName, data) {
        const collection = await this.getCollection(collectionName);
        return await collection.insertOne(data);
    }
    
    async update(collectionName, id, data) {
        const collection = await this.getCollection(collectionName);
        return await collection.updateOne({ _id: new ObjectID(id) }, { $set: data });
    }
    
    async delete(collectionName, id) {
        const collection = await this.getCollection(collectionName);
        return await collection.deleteOne({ _id: new ObjectID(id) });
    }
    
    async close() {
        await this.client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = Db;
