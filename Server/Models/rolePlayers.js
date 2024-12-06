const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
    session: {type: String, required: true},
    theme: {type: String, required: true},
    general_evoluator: {type: String, required: true},
    gramarian: {type: String, required: true},
    timer: {type: String, required: true},
    ah_counter: {type: String, required: true},
    prepare_speaker_one: {type: String, required: true},
    prepare_speaker_two: {type: String, required: true},
    round_robin_master: {type: String, required: true},
    table_topic_master: {type: String, required: true}
});

const Players = mongoose.model('Players', playersSchema);

module.exports = Players;