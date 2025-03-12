const mongoose = require('mongoose');

const phraseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', // Reference to the User table
        required: true,
    },

    box: {
        type: String,
        required: true,
    },


    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Phrase', phraseSchema);
