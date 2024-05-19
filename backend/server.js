const express = require('express')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const  bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

const dbName = 'Passop';
const app = express()
const port=3000


app.use(bodyparser.json())
app.use(cors())

//get all the passowrds
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passop');
    const result=await collection.find(({})).toArray();
    console.log(result)
    res.json(result)
})
//save all the passwords
app.post('/', async (req, res) => {
    const db = client.db(dbName);
    const password=req.body;
    const collection = db.collection('Passop');
    const result=await collection.insertOne(password);
    res.send(result)
})
//delete 
app.delete('/', async (req, res) => {
    const db = client.db(dbName);
    const password=req.body;
    const collection = db.collection('Passop');
    const result=await collection.deleteOne(password);
    res.send({success:true})
})

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})