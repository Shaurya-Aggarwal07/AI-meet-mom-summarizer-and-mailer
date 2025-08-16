# AI Meeting Notes Summariser

An AI-powered web application that summarizes meeting transcripts using the Groq API. Upload your meeting transcripts in various formats (TXT, DOCX, PDF) and get intelligent summaries with customizable prompts.

## Features

- 📄 **Multiple File Formats**: Support for TXT, DOCX, and PDF files
- 🤖 **AI-Powered Summaries**: Uses Groq's Mixtral model for intelligent summarization
- ✏️ **Custom Prompts**: Customize how the AI summarizes your content
- 📧 **Email Sharing**: Send summaries directly via email
- 📋 **Copy to Clipboard**: Easy copying of generated summaries
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Groq API key (get one at [console.groq.com](https://console.groq.com))
- For PDF processing: `pdftotext` command-line tool (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-sumarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # Required: Groq API Key
   GROQ_API_KEY=your_groq_api_key_here
   
   # Optional: Email configuration for sharing summaries
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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
- **AI**: Groq API (Mixtral-8x7b-32768 model)
- **File Processing**: Formidable, Mammoth.js
- **Email**: Nodemailer
- **UI Components**: Radix UI, Lucide React icons

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key | Yes |
| `EMAIL_HOST` | SMTP server host | No |
| `EMAIL_PORT` | SMTP server port | No |
| `EMAIL_SECURE` | Use SSL/TLS | No |
| `EMAIL_USER` | SMTP username | No |
| `EMAIL_PASS` | SMTP password | No |
| `EMAIL_FROM` | From email address | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
