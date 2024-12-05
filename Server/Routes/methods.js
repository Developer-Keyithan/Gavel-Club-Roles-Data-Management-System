const express = require('express');
const router = express.Router();
const Players = require('../Models/rolePlayers');

router.post('/admin', async (req, res) => {
    try {
        console.log(req.body);
        const player = new Players(req.body);
        const savedPlayer = await player.save();
        res.status(201).json(savedPlayer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/admin', async (req, res) => {
    try {
        const players = await Players.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const player = await Players.findById(req.params.id);
        if (!player) return res.status(404).json({ error: 'Players not found' });
        res.status(200).json(player);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/admin/:id', async (req, res) => {
    try {
        const updatedPlayer = await Players.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) return res.status(404).json({ error: 'Players not found' });
        res.json(updatedPlayer);  // Ensure this returns the updated player data
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/admin/:id', async (req, res) => {
    try {
        const deletedPlayer = await Players.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) return res.status(404).json({ error: 'Players not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;