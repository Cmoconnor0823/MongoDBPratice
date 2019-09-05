const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');

const db = require("./db");
const collection = "todo";
const app = express();

app.use(bodyParser.json());

//serve home html
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//get all the to do's in the database collection
app.get('/getTodos',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
            //later add a error visable to user
        else{
            res.json(documents);
        }
    });
});



db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});
