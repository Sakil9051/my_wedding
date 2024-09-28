import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Winner from '@/models/Winner'; // Import the Winner model
import { addCorsHeaders } from '@/lib/cors';

// Fetch all winners
export async function GET() {
  await dbConnect(); // Ensure database connection

  try {
    // Find all winners in the database
    const winners = await Winner.find({});

    if (!winners || winners.length === 0) {
      // If no winners are found, return a 404 response
      let response = NextResponse.json({ message: 'No winners found' }, { status: 404 });
      response = addCorsHeaders(response);
      return response;
    }

    // Return the list of winners
    let response = NextResponse.json({ winners });
    response = addCorsHeaders(response);
    return response;
  } catch (error) {
    // Handle any errors and return a 500 response
    let response = NextResponse.json(
      { message: 'Error fetching winners', error: error.message },
      { status: 500 }
    );
    response = addCorsHeaders(response);
    return response;
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
