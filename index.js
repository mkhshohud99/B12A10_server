const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 5000;



const app = express();
app.use(cors());
app.use(express.json());




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

        const database = client.db('petPaw');
        const petServices = database.collection('services');

        //save services to DB

        app.post('/services', async(req, res)=>{
            const data = req.body;
            const date = new Date();
            data.createdAt = date;
            console.log(data);
            
            console.log(data);
            const result = await petServices.insertOne(data);
            res.send(result)
            

        })

        //Get a single service

        app.get('/services/:id', async(req, res)=>{
            const id = req.params;
            // console.log(id);
            const query = {_id: new ObjectId(id)}
            const result = await petServices.findOne(query);
            res.send(result)
            
        })

        //Get service from DB

        app.get('/services', async(req, res)=>{
            const result = await petServices.find().toArray();
            res.send(result);
        })

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
