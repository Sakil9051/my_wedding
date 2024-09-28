import schedule from 'node-schedule';
import dbConnect from '@/lib/mongodb';
import Guest from '@/models/Guest';
import Winner from '@/models/Winner'; // Import the Winner model

// Helper function to fetch random Unicode values from the Guest model
const getRandomWienerFromGuests = async () => {
  await dbConnect();

  try {
    // Find all guests and select only the 'name' and 'uniqueCode' fields
    const guests = await Guest.find({}, 'name uniqueCode');

    if (!guests || guests.length === 0) {
      console.log('No guests found with uniqueCode');
      return [];
    }

    // Filter guests with a uniqueCode
    const unicodeValues = guests.filter(guest => guest.uniqueCode);

    if (unicodeValues.length < 2) {
      console.log('Not enough Unicode values to pick two random entries.');
      return [];
    }

    // Randomly select two unique codes from the available list
    const randomIndexes = [
      Math.floor(Math.random() * unicodeValues.length),
      Math.floor(Math.random() * unicodeValues.length),
    ];

    const selectedUnicodes = [unicodeValues[randomIndexes[0]], unicodeValues[randomIndexes[1]]];
    return selectedUnicodes;
  } catch (error) {
    console.error('Error fetching Unicode values:', error);
    return [];
  }
};

// Schedule the function to run on October 1st, 2024 at 1 AM
export const scheduleWienerTask = () => {
  const date = new Date(2024, 9, 1, 1, 0, 0); // October 1st 2024, 1:00 AM

  schedule.scheduleJob(date, async () => {
    const selectedUnicodes = await getRandomWienerFromGuests();

    if (selectedUnicodes.length === 2) {
      console.log(`Random Wiener Unicode Characters: ${selectedUnicodes[0].uniqueCode}, ${selectedUnicodes[1].uniqueCode}`);

      // Save both winners to the database
      try {
        await dbConnect();

        // Save the first winner
        const winner1 = new Winner({
          name: selectedUnicodes[0].name,
          uniqueCode: selectedUnicodes[0].uniqueCode,
        });
        await winner1.save();

        // Save the second winner
        const winner2 = new Winner({
          name: selectedUnicodes[1].name,
          uniqueCode: selectedUnicodes[1].uniqueCode,
        });
        await winner2.save();

        console.log('Winners saved successfully!');
      } catch (error) {
        console.error('Error saving winners:', error);
      }
    } else {
      console.log('Could not pick two random Unicode values.');
    }
  });
};
