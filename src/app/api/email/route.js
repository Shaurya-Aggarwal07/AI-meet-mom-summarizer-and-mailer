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

    // Validate email configuration
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration:', {
        host: !!process.env.EMAIL_HOST,
        user: !!process.env.EMAIL_USER,
        pass: !!process.env.EMAIL_PASS
      });
      return NextResponse.json(
        { error: "Email configuration is incomplete. Please check your environment variables." },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Send email
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
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

    console.log('Email sent successfully:', result.messageId);
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = "Failed to send email";
    if (error.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check your email credentials.";
    } else if (error.code === 'ECONNECTION') {
      errorMessage = "Could not connect to email server. Please check your email settings.";
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = "Email server connection timed out.";
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 