const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 3000;



const app = express();
app.use(cors());




const uri = "mongodb+srv://b12a10:pdoEpRUSYabVHUup@cluster0.sctb0kd.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Hello from Backend')
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
