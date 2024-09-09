import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Guest from '@/models/Guest';
import { addCorsHeaders } from '@/lib/cors';

// Fetch or generate unique code for a guest by name
export async function GET(req, { params }) {
  await dbConnect();

  const { name } = params; // Extract guest name from request parameters

  try {
    // Find the guest by name in the database
    const guest = await Guest.findOne({ name });

    if (!guest) {
      // If guest is not found, return a 404 response
      let response = NextResponse.json({ message: 'Guest not found' }, { status: 404 });
      response = addCorsHeaders(response);
      return response;
    }

    // Check if the guest already has a unique code
    if (!guest.uniqueCode) {
      // Generate a new unique code and save it to the guest entry
      guest.uniqueCode = `GUEST-${new Date().getTime()}`;
      await guest.save();
    }

    // Return the guest's unique code
    let response = NextResponse.json({ uniqueCode: guest.uniqueCode });
    response = addCorsHeaders(response);
    return response;
  } catch (error) {
    // Handle any errors and return a 500 response
    let response = NextResponse.json({ message: 'Error fetching or generating unique code', error: error.message }, { status: 500 });
    response = addCorsHeaders(response);
    return response;
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
