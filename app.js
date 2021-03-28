const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const password = '8uftxmhexuEIGnTJ';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://AbuSalehFaysal:8uftxmhexuEIGnTJ@cluster0.hrxvr.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    // perform actions on the collection object
    //console.log("DATABASE CONNECTED!!!");
    //client.close();
    app.post("/addBooking", (req, res) => {
        const newBooking = req.body;
        // console.log(newBooking);
        bookings.insertOne(newBooking)
        .then(result => {
            // console.log(result);
            res.send(result.insertedCount > 0)
        })
    })
});


app.get('/', (req, res) => {
    res.send('HOME ROUTE!!!!')
})

app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`)
})