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

    // Enhanced default prompt for professional, email-ready summaries
    const defaultPrompt = `Create a comprehensive, professional meeting summary suitable for email distribution to stakeholders. Structure the response as follows:

MEETING SUMMARY

1. EXECUTIVE OVERVIEW
[Provide a 2-3 sentence high-level summary of the meeting's purpose and key outcomes]

2. KEY DISCUSSION POINTS
1. [List main topics discussed with brief context]
2. [Highlight important insights or revelations]
3. [Note any significant concerns or opportunities raised]

3. DECISIONS MADE
1. [List all decisions reached with clear action items]
2. [Include any approvals, rejections, or policy changes]
3. [Note who made the decisions and any conditions]

4. ACTION ITEMS & ASSIGNMENTS
1. [Task] - [Assignee] - [Deadline] - [Priority]
2. [Include specific deliverables and expectations]
3. [Note any dependencies or blockers]

5. NEXT STEPS & TIMELINE
1. [Immediate next actions (this week)]
2. [Short-term goals (next 2-4 weeks)]
3. [Long-term objectives (next quarter)]

6. IMPORTANT NOTES & DEADLINES
1. [Critical dates, milestones, or deadlines]
2. [Resource requirements or budget implications]
3. [Risk factors or contingency plans]

7. KEY METRICS & KPIS
1. [Any performance indicators discussed]
2. [Targets or benchmarks mentioned]
3. [Success criteria for projects]

Please ensure the summary is:
• Professional and business-appropriate
• Well-structured with clear sections
• Actionable with specific next steps
• Concise yet comprehensive
• Suitable for executive review
• Easy to scan and reference
• Use numbered lists instead of bullet points
• Avoid markdown formatting symbols`;

    const prompt = customPrompt || defaultPrompt;

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `You are a senior business analyst and executive communication specialist with expertise in creating professional meeting summaries for corporate environments. Your summaries should be:

Professional Standards:
• Use formal business language and professional tone
• Maintain executive-level communication standards
• Ensure clarity and precision in all statements
• Avoid jargon unless industry-specific terms are necessary

Structure & Formatting:
• Use clear, hierarchical numbered headings (1., 2., 3., etc.)
• Implement numbered lists for easy scanning and reference
• Group related information logically
• Use consistent formatting throughout
• Avoid markdown symbols like ** or ##

Content Quality:
• Focus on actionable insights and decisions
• Highlight strategic implications and business impact
• Include specific deadlines, assignees, and deliverables
• Identify risks, opportunities, and dependencies

Email Readiness:
• Format for immediate email distribution
• Include executive summary for busy stakeholders
• Make information easily scannable and referenceable
• Ensure professional appearance in email clients
• Use numbered lists instead of bullet points for better email formatting

Business Context:
• Consider stakeholder perspectives and information needs
• Highlight financial, operational, or strategic implications
• Include relevant metrics, KPIs, or performance indicators
• Address potential questions or concerns proactively

Always maintain a professional, authoritative tone suitable for executive communication and ensure the summary provides immediate value to recipients who weren't present at the meeting. Use numbered lists and avoid markdown formatting.`
        },
        {
          role: "user",
          content: `${prompt}\n\nMeeting Transcript:\n${transcript}`
        }
      ],
      temperature: 0.2,
      max_tokens: 2000,
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