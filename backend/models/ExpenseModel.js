const mongoose = require("mongoose");
// title , amount , category , description , date
const ExpenseSchema = new mongoose.Schema(
  { name:{
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 200,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense' , ExpenseSchema) ; 
