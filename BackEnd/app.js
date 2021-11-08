const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors');
const app = express()
// app.use(cors());
// app.options('*', cors({ 'origin': ['https://questml.netlify.app/', 'http://localhost:3000/'] }));
//const MongoClient = require("mongodb").MongoClient;


app.use('/api', require('./Routes/index'))
app.use("/uploads", express.static('uploads'))


mongoose.connect("mongodb://localhost:27017/quest", { useNewUrlParser: true })
    .then(app => {
        console.log("Hello")
    })
    .catch((err) => {
        console.log(console.error("error" + err))
    });
var port = process.env.PORT || 5000
app.listen(port, () => console.log('Server started on port 5000'));
