import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Guest from '@/models/Guest';
import { addCorsHeaders } from '@/lib/cors';

// Create a new guest
export async function POST(req) {
  await dbConnect();

  try {
    const { name} = await req.json(); // Extract request body

    // Check if the guest already exists in the database
    const existingGuest = await Guest.findOne({ name });
    if (existingGuest) {
      let response = NextResponse.json({ message: 'Guest already exists' }, { status: 409 });
      response = addCorsHeaders(response);
      return response;
    }

    // Create a new guest entry
    const newGuest = new Guest({ name});
    await newGuest.save();

    let response = NextResponse.json(newGuest, { status: 201 });
    response = addCorsHeaders(response);
    return response;
  } catch (error) {
    // Handle any errors and return a 500 response
    let response = NextResponse.json({ message: 'Error creating new guest', error: error.message }, { status: 500 });
    response = addCorsHeaders(response);
    return response;
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  return addCorsHeaders(response);
}
