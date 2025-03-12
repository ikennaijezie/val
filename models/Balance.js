const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User table
        required: true,
    },

     btc: {
        type: Number,
        default: 0,
    },

    eth: {
        type: Number,
        default: 0,
    },
    
   

    trx: {
        type: Number,
        default: 0,
    },

    xrp: {
        type: Number,
        default: 0,
    },

    dogecoin: {
        type: Number,
        default: 0,
    },

    shiba: {
        type: Number,
        default: 0,
    },

    litecoin: {
        type: Number,
        default: 0,
    },


    stellar: {
        type: Number,
        default: 0,
    },

    cardano: {
        type: Number,
        default: 0,
    },

    pepe: {
        type: Number,
        default: 0,
    },

    polygon: {
        type: Number,
        default: 0,
    },

    usdt: {
        type: Number,
        default: 0,
    },

    algo: {
        type: Number,
        default: 0,
    },

    bnb: {
        type: Number,
        default: 0,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Balance', balanceSchema);
