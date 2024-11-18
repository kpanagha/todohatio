
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  projectId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Project', required: true },
  description: {
     type: String,
      required: true },
  status: { 
   type: Boolean, // Boolean instead of String
   default: false // false = Pending, true = Completed
   },
  createdDate: {
     type: Date,
      default: Date.now },
  updatedDate: {
     type: Date }
});

module.exports = mongoose.model('Todo', todoSchema);
