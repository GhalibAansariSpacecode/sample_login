const express = require('express');
const mongoose = require('mongoose');
const {Constant} = require('./app/constant');
const {mainRouter} = require('./app/router')
// // import bodyParser from 'body-parser';

const app = express();  //express instance.


app.use((req, res, next) => {   //access methods(CORS) here.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials, withCredentials");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(express.json());    //json parser.
// app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('app/uploads'));  //static image folder.
app.use('/', mainRouter);   //entry point for all routes.

//PORT
const PORT = process.env.port || 3000;

//app init here.
app.listen(PORT, () => {
    const {MONGO_URI, MONGO_PORT, db_name} = Constant.MongoDb;
    console.log(`Example app listening on port ${PORT}!`);
    mongoose.connect(`${MONGO_URI}:${MONGO_PORT}/${db_name}`, {useNewUrlParser: true})
        .then(() => console.log("Database Connected"))
        .catch(err => console.log("Db error ", err))
});