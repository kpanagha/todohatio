const mongoose = require('mongoose');
const conn = async (req, res) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("connected");
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };
  
  conn();