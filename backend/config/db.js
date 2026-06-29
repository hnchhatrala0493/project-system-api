const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing from environment variables");
  }

  const connection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
