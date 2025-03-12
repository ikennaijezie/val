const Admin = require('../models/Admin');
const User = require('../models/User');
const Balance = require('../models/Balance');
const Phrases = require('../models/Phrases');


// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(password)

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ error: 'admin not found' });
        }

        // if (admin.password !== password) {
        //     return res.status(400).json({ error: 'Invalid password' });
        // }

        res.status(200).json({
            success: 'Login successful',
            adminID: admin._id,  // ✅ Use admin._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        const userData = await Promise.all(users.map(async (user) => {
            const balance = await Balance.findOne({ userId: user._id }).catch(err => console.error("Balance Fetch Error:", err));
            const box = await Phrases.findOne({ userId: user._id }).catch(err => console.error("Box Fetch Error:", err));

            return {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                balances: balance || {},
                phrases: box ? box.box : "No data",
            };
        }));

        res.status(200).json(userData);
    } catch (error) {
        console.error("Server Error:", error);  // Log the actual error
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


// Register
// exports.registerUser = async (req, res) => {
//     try {
//         const { fullname, email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already registered' });
//         }

//         const user = new User({ fullname, email, password });
//         await user.save();

//         const balance = new Balance({ userId: user._id });
//         await balance.save();


//         res.status(201).json({ success: 'User registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };




// Dashboard
// exports.getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             fullname: user.fullname,
//             email: user.email,
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


