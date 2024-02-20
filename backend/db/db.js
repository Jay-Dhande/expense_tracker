const mongoose = require("mongoose");

const db = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Specify the correct write concern mode
    writeConcern: {
      w: "majority",
      wtimeout: 1000,
    },
  });
  // Listen for successful connection
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  // Listen for connection errors
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });
};

module.exports = { db };
