const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Admins', adminsSchema);
