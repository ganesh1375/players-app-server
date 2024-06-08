const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const config = require('./configurations/config');
const playerRoutes = require('./routes/playerRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log("Unable to connect to db", err);
});


app.use((req, res, next) => {
    console.log(req.headers);
    console.log("Request received at", new Date().toISOString());
    next();
})

app.get('/', (req, res) => {
    res.send({ msg: "Server Started" });
});

app.use(playerRoutes);

app.listen(config.PORT, () => {
    console.log("Server Started at", config.PORT);
});