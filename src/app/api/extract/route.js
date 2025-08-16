import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import formidable from 'formidable';

const execPromise = promisify(exec);
const tempDir = path.join(process.cwd(), 'tmp');

// Parse form with formidable
const parseForm = async (req) => {
  const form = formidable({ 
    uploadDir: tempDir,
    keepExtensions: true,
  });
  
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(request) {
  try {
    // Ensure temp directory exists
    try {
      await fs.mkdir(tempDir, { recursive: true });
    } catch (err) {
      // Directory already exists or can't be created
    }

    // Parse the incoming form data
    const { files } = await parseForm(request);
    const file = files.file[0];
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    let text = '';
    const fileType = file.mimetype;
    
    if (fileType === 'application/pdf') {
      try {
        // Extract text from PDF using pdftotext
        const { stdout } = await execPromise(`pdftotext "${file.filepath}" -`);
        text = stdout;
      } catch (error) {
        console.error('PDF extraction error:', error);
        return NextResponse.json(
          { error: "Failed to extract text from PDF. Please ensure pdftotext is installed." },
          { status: 500 }
        );
      }
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        // For DOCX, use mammoth.js
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: file.filepath });
        text = result.value;
      } catch (error) {
        console.error('DOCX extraction error:', error);
        return NextResponse.json(
          { error: "Failed to extract text from DOCX file" },
          { status: 500 }
        );
      }
    } else {
      // For other file types, just read as text
      try {
        text = await fs.readFile(file.filepath, 'utf8');
      } catch (error) {
        console.error('Text file reading error:', error);
        return NextResponse.json(
          { error: "Failed to read text file" },
          { status: 500 }
        );
      }
    }

    // Clean up the temp file
    try {
      await fs.unlink(file.filepath);
    } catch (err) {
      console.error('Error deleting temp file:', err);
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error extracting text:', error);
    return NextResponse.json(
      { error: "Failed to extract text from file" },
      { status: 500 }
    );
  }
} 