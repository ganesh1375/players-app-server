const Player = require('../model/Player');
const PlayerModel = require('../model/Player');
const mongoose = require('mongoose');




//Getting all the Players List

exports.getPlayers = async (req, res) => {
    try {
        const playersList = await PlayerModel.find();
        if (playersList && playersList.length >= 0) {
            res.status(200).send(playersList);
        }
    } catch (error) {
        res.status(400).send({ error: error });
    }
};

//Add Player
exports.addPlayer = async (req, res) => {
    try {
        if (req.body && req.body.name && req.body.country && req.body.born && req.body.nickName && req.body.role && req.body.battingStyle && req.body.bowlingStyle) {
            const { name, country, born, nickName, role, battingStyle, bowlingStyle } = req.body;
            const player = new Player({
                name: name,
                country: country,
                born: born,
                nickName: nickName,
                role: role,
                battingStyle: battingStyle,
                bowlingStyle: bowlingStyle
            });
            const playerResponse = await player.save();
            if (playerResponse) {
                res.send({ msg: "Player Added Successfully", playerResponse: playerResponse });
            }
        } else {
            res.status(400).send({ msg: "Required Fileds are missing" });
        }
    } catch (error) {
        res.status(400).send({ error: error });
    }
};

//Get Player By name
exports.getPlayersByName = async (req, res) => {
    try {
        if (req && req.params && req.params.name) {
            const playerDetails = await Player.find({ name: req.params.name });
            if (playerDetails && playerDetails.length > 0) {
                res.send({ msg: "Player Found", players: playerDetails });
            } else {
                res.send({ msg: "Player not Found", players: playerDetails });
            }
        }
    } catch (error) {
        res.status(400).send({ error: error });
    }
};


exports.updatePlayer = async (req, res) => {
    try {
        if (req.body && req.body.id) {
            const id = req.body.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ msg: "Invalid ID format" });
            }

            const updatedPlayerDetails = await Player.findByIdAndUpdate(id, req.body, { new: true });

            if (updatedPlayerDetails) {
                res.send({ msg: "Player Details Updated", player: updatedPlayerDetails });
            } else {
                res.status(404).send({ msg: "Player not found" });
            }
        } else {
            res.status(400).send({ msg: "Req Body should not be empty and should contain id" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ error: "An error occurred while updating the player" });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params?.id;
            console.log(id);
            const deltedPlayerDetails = await Player.findByIdAndDelete(id);
            if (!deltedPlayerDetails) {
                res.status(400).send({ msg: "Player not Found" });
            } else {
                res.send({ msg: "Player Delted Successfully" });
            }
        } else {
            res.status(400).send({ msg: " Req Body should not be empty" });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error })
    }
}