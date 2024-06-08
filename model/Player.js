const mongoose = require('mongoose');


const playerSchema = mongoose.Schema({
    name: {
        type : String,
        require : true
    },
    country : {
        type : String,
        require: true
    },
    born : {
        type : String,
        require: true
    },
    nickName : {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    battingStyle: {
        type: String,
        require: true
    },
    bowlingStyle: {
        type : String,
        require: true
    }
});


const Player = new mongoose.model('Player', playerSchema);

module.exports = Player;

