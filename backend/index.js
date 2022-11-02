require('dotenv').config({path:"./config.env"});
const express = require('express');
const app = express();
const cors = require('cors');

const cookieParser = require("cookie-parser");
const router = require("./routes/router");




app.use(cors());

const connectDB = require('./db/conn.js');

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use(router);

const PORT = process.env.PORT || 5001;



app.listen(PORT, ()=>{
    console.log(`started on ${PORT}`);
})


