import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, content } = body;

    if (!to || !content) {
      return NextResponse.json(
        { error: "Email address and content are required" },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: subject || "Meeting Summary",
      text: content,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <h2>Meeting Summary</h2>
               <div style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                 ${content.replace(/\n/g, '<br />')}
               </div>
               <p style="margin-top: 20px; color: #666;">
                 This summary was generated using AI Meeting Notes Summariser.
               </p>
             </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}