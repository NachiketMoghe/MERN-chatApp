// imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// App Configuration
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1194406",
    key: "3fbad04e9c4d5c875da9",
    secret: "bff62818d2b40b5892fa",
    cluster: "ap2",
    useTLS: true
  });


// Middlewares
app.use(express.json());

app.use(cors());
app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
// DB
const connection_url = 'mongodb+srv://admin:AvhDSC9VcIYdADuo@cluster0.jdizx.mongodb.net/chatAppDB?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // .then(() => {
    //     console.log('Database Connected');
    // });

const db = mongoose.connection

db.once("open", ()=>{
    console.log('Database Connected.');
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log('A change occured: ',change);

    if(change.operationType === 'insert'){
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            sent: messageDetails.sent,

        });
    } else{ 
        console.log('Error triggering Pusher');
    }
});
});

// ???

// API routes
app.get('/', (req,res) => res.status(200).send('Hello Bish.'));

app.post('/messages/new', (req,res) =>{
    const dbMessage= req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
});

app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) =>{
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })
})

// listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`));