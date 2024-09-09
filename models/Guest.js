const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure guest names are unique in the database
    trim: true // Remove whitespace from both ends of a string
  },
  uniqueCode: {
    type: String,
    default: null, // Initially, guests don't have a unique code
    unique: false // Ensure unique codes are unique if not empty
  },
  attended: {
    type: Boolean,
    default: false // Track if a guest has attended the event
  },
  email: {
    type: String,
    required: false, // Optional: You might want to send emails, e.g., for invitations or updates
    trim: true
  },
  phone: {
    type: String,
    required: false, // Optional: Useful for SMS notifications or urgent communications
    trim: true
  },
  remarks: {
    type: String,
    required: false // Any special notes about dietary restrictions, seating preferences, etc.
  }
});

const Guest = mongoose.models.Guest || mongoose.model('Guest', guestSchema);


module.exports = Guest;
