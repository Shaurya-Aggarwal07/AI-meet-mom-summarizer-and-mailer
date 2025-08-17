# AI Meeting Notes Summariser

An AI-powered web application that summarizes meeting transcripts using the Groq API. Upload your meeting transcripts in various formats (TXT, DOCX, PDF) and get intelligent summaries with customizable prompts.

## Features

- 📄 **Multiple File Formats**: Support for TXT, DOCX, and PDF files
- 🤖 **AI-Powered Summaries**: Uses Groq's Mixtral model for intelligent summarization
- ✏️ **Custom Prompts**: Customize how the AI summarizes your content
- 📧 **Email Sharing**: Send summaries directly via email
- 📋 **Copy to Clipboard**: Easy copying of generated summaries
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

-------------------------
The link to the deployed website is here: 
https://meet-sumarizer.netlify.app/

The link to documentation is here:
https://docs.google.com/document/d/1fdl8UP9cqOXxVGDnM-ul6LEyYo6vs0YkeBLz21M9aGU/edit?tab=t.0

----------------------

## Usage

1. **Upload a transcript**: Drag and drop or click to upload your meeting transcript file
2. **Customize the prompt**: Modify the AI instructions to get the type of summary you want
3. **Generate summary**: Click "Generate Summary" to create your AI-powered summary
4. **Share or copy**: Use the copy button or email the summary to others

## File Format Support

- **TXT files**: Direct text processing
- **DOCX files**: Text extraction using mammoth.js
- **PDF files**: Text extraction using pdftotext (requires system installation)

## API Endpoints

- `POST /api/summary` - Generate AI summaries
- `POST /api/extract` - Extract text from uploaded files
- `POST /api/email` - Send summaries via email

## Technologies Used

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **AI**: Groq API 
- **File Processing**: Formidable, Mammoth.js
- **Email**: Nodemailer
- **UI Components**: Radix UI, Lucide React icons

-------------------------------
