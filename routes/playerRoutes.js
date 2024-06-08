const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerControllers')


router.get('/player', playerController.getPlayers);

router.post('/addPlayer', playerController.addPlayer);

router.get('/player/:name', playerController.getPlayersByName);

router.post('/updatePlayer', playerController.updatePlayer);

router.delete('/deletePlayer/:id', playerController.deletePlayer);


module.exports = router;