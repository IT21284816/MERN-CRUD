const express=require("express");
const mongoose= require("mongoose");
const app=express();
const router = require("./routes/router");

var cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(router);

const url="mongodb://127.0.0.1:27017/CRUD"

mongoose.connect(url).then(()=>{
    console.log("Database Connected Succssfully")
}).catch((err)=>{
    console.log(err)
});

app.listen(5000);