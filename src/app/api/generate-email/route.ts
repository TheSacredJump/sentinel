// app/api/generate-email/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional email writer. Write emails that are clear, concise, and appropriate for business communication."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return NextResponse.json({ 
      email: completion.choices[0].message.content 
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error generating email' }, 
      { status: 500 }
    );
  }
}