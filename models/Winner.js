import mongoose from 'mongoose';

// Define the Winner schema
const WinnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
  },
  dateChosen: {
    type: Date,
    default: Date.now, // Automatically sets the date when the winner is chosen
  },
});

// Create the Winner model from the schema
const Winner = mongoose.models.Winner || mongoose.model('Winner', WinnerSchema);

export default Winner;
