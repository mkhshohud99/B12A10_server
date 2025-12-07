const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 5000;



const app = express();
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sctb0kd.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const database = client.db('petPaw');
        const petServices = database.collection('services');
        const ordersCollections = database.collection('orders');

        //save services to DB

        app.post('/services', async (req, res) => {
            const data = req.body;
            const date = new Date();
            data.createdAt = date;
            console.log(data);

            console.log(data);
            const result = await petServices.insertOne(data);
            res.send(result)


        })

        //Get a single service

        app.get('/services/:id', async (req, res) => {
            const id = req.params;
            // console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await petServices.findOne(query);
            res.send(result)

        })

        //Get service from DB

        app.get('/services', async (req, res) => {

            const { category } = req.query;

            const query = category ? { category } : {};

            const result = await petServices.find(query).toArray();

            res.send(result);
        })



        //get my services
        app.get('/my-services', async (req, res) => {
            const { email } = req.query
            const query = { email: email };
            const result = await petServices.find(query).toArray()
            res.send(result);
            console.log(email);


        })

        // Update services
        app.put('/update/:id', async (req, res) => {
            const data = req.body;
            const id = req.params
            const query = { _id: new ObjectId(id) }
            const updateService = {
                $set: data
            }
            const result = await petServices.updateOne(query, updateService)
            res.send(result)
        })

        app.delete('/delete/:id', async (req, res) => {
            const id = req.params;
            // console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await petServices.deleteOne(query);
            res.send(result)

        })


        app.post('/orders', async(req, res)=>{
            const data = req.body;
            console.log(data);
            const result = await ordersCollections.insertOne(data)
            res.status(201).send(result)
            
        })

        app.get('/orders',async(req, res)=>{
             const { email } = req.query
            const query = { email: email };
            const result= await ordersCollections.find(query).toArray()
            res.status(200).send(result)
        })


        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Backend')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
