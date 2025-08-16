import { NextResponse } from 'next/server';
import  Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { transcript, customPrompt } = body;
    
    console.log("API received transcript length:", transcript?.length);
    console.log("API received prompt:", customPrompt);

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }

    // Default prompt if none provided
    const prompt = customPrompt || "Summarize the key points of this meeting transcript, including any decisions made and action items.";

    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes meeting transcripts."
        },
        {
          role: "user",
          content: `${prompt}\n\nTranscript: ${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const summary = response.choices[0].message.content;

    return NextResponse.json({ summary });
  } 
  catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }

}