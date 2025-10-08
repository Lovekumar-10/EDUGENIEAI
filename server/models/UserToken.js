// models/UserToken.js
const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String, // format: YYYY-MM-DD to track daily usage
    required: true,
  },
  tokensUsed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UserToken", userTokenSchema);
