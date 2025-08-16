#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI Meeting Notes Summariser...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env.local from template...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env.local created successfully!');
    console.log('⚠️  Please edit .env.local and add your Groq API key and email configuration.\n');
  } else {
    console.log('❌ env.example not found. Please create .env.local manually with the following variables:');
    console.log('   GROQ_API_KEY=your_groq_api_key_here');
    console.log('   EMAIL_HOST=smtp.gmail.com');
    console.log('   EMAIL_PORT=587');
    console.log('   EMAIL_SECURE=false');
    console.log('   EMAIL_USER=your_email@gmail.com');
    console.log('   EMAIL_PASS=your_app_password');
    console.log('   EMAIL_FROM=your_email@gmail.com\n');
  }
} else {
  console.log('✅ .env.local already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  console.log('   Run: npm install\n');
} else {
  console.log('✅ Dependencies already installed\n');
}

console.log('🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Edit .env.local with your API keys and email settings');
console.log('2. Run: npm run dev');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\nFor PDF support, install pdftotext:');
console.log('   macOS: brew install poppler');
console.log('   Ubuntu: sudo apt-get install poppler-utils');
console.log('   Windows: Download from https://poppler.freedesktop.org/\n'); 