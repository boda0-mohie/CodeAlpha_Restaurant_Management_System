const { mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Restuarant_DB IS HERE");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};


module.exports = connectDB;