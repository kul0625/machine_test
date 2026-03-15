const mongoose = require('mongoose');

const connectDb = async () => {
  console.log(process.env.MONGO_URI,"process.env.MONGO_URI")
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
