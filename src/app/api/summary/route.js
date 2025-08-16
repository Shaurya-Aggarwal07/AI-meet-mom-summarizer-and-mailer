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

    // Enhanced default prompt for polished, email-ready summaries
    const defaultPrompt = `Please create a comprehensive, professional meeting summary that is ready to be shared via email. Structure your response as follows:

**Meeting Summary**

**Key Points Discussed:**
- [List the main topics and discussions]

**Decisions Made:**
- [List any decisions that were reached]

**Action Items:**
- [List specific tasks with assignees if mentioned]

**Next Steps:**
- [Outline what needs to happen next]

**Important Notes:**
- [Any critical information or deadlines mentioned]

Please ensure the summary is:
- Professional and well-formatted
- Easy to read and understand
- Comprehensive yet concise
- Suitable for email distribution
- Focused on actionable insights`;

    const prompt = customPrompt || defaultPrompt;

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `You are a professional meeting summarizer with expertise in creating clear, actionable, and well-structured meeting summaries. Your summaries should be:

1. **Professional**: Use business-appropriate language and tone
2. **Structured**: Organize information logically with clear sections
3. **Actionable**: Highlight decisions, action items, and next steps
4. **Concise**: Be comprehensive but avoid unnecessary details
5. **Email-ready**: Format appropriately for email distribution
6. **Clear**: Use bullet points and formatting for easy reading

Always maintain a professional tone and ensure the summary is immediately useful to recipients who weren't present at the meeting.`
        },
        {
          role: "user",
          content: `${prompt}\n\nMeeting Transcript:\n${transcript}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
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