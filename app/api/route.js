import { NextResponse } from 'next/server';
import { scheduleWienerTask } from '@/lib/scheduleWiener';
import { addCorsHeaders } from '@/lib/cors';
import dbConnect from '@/lib/mongodb'; // In case you need to connect to the database for other tasks

// Schedule the Wiener task with a GET request
export async function GET(req) {
  await dbConnect(); // Connect to the database if needed

  try {
    // Schedule the Wiener task
    scheduleWienerTask();

    // Respond with a success message
    let response = NextResponse.json({ message: 'Wiener task scheduled successfully!' });
    response = addCorsHeaders(response); // Add CORS headers if needed
    return response;
  } catch (error) {
    // Handle any errors and return a 500 response
    let response = NextResponse.json(
      { message: 'Error scheduling Wiener task', error: error.message },
      { status: 500 }
    );
    response = addCorsHeaders(response); // Add CORS headers if needed
    return response;
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
