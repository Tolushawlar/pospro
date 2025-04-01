import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log('API route hit with POST request');
    // console.log('Request body:', request);
    try {
        const token = request.headers.get('authorization')?.split(' ')[1] || '';
        const orderData = await request.json();
        console.log('Received order data:', orderData);

        // Get token from environment variable only since localStorage is not available server-side
        // const token = process.env.API_TOKEN || '';

        const response = await axios.post(
            'https://salespro.livepetal.com/v1/addorder/',
            orderData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        return NextResponse.json(response.data);

    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { message: 'Error processing order', error: error.message },
            { status: 500 }
        );
    }
}
