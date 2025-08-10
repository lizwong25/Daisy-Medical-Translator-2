# OpenAI API Setup for Daisy Medical Translator

## Overview
The Daisy Medical Translator now uses OpenAI's GPT models to generate real after-visit summaries from patient-doctor conversations. This replaces the mock data with AI-powered medical summaries.

## Setup Instructions

### 1. Get an OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in your dashboard
4. Click "Create new secret key"
5. Copy the generated API key (keep it secure!)

### 2. Add API Key to Environment
1. Create a `.env.local` file in the root directory of your project
2. Add your API key to the file:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# Optional: Model configuration (defaults to gpt-4)
OPENAI_MODEL=gpt-4
```

### 3. Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
```

## API Configuration

### Environment Variables
- `OPENAI_API_KEY` (required): Your OpenAI API key
- `OPENAI_MODEL` (optional): Model to use (defaults to 'gpt-4')

### API Endpoint
- **URL**: `/api/generate-summary`
- **Method**: POST
- **Input**: 
  ```json
  {
    "translatedText": "Patient conversation text",
    "targetLanguage": "en|es|fr"
  }
  ```
- **Output**: JSON with medical summary sections

## How It Works

1. **Recording**: User records voice conversation
2. **Transcription**: Audio is transcribed and translated
3. **AI Summary**: Translated text is sent to OpenAI API
4. **Medical Format**: AI generates structured after-visit summary
5. **Display**: Summary appears in the UI with proper medical formatting

## Security Notes

- ✅ API key is stored server-side only
- ✅ API calls are made through Next.js API routes
- ✅ No API key exposure in client-side code
- ✅ Environment variables are not committed to git

## Cost Considerations

- OpenAI API charges per token used
- GPT-4 is more expensive but higher quality
- Consider using GPT-3.5-turbo for cost savings
- Monitor usage in OpenAI dashboard

## Troubleshooting

### "OpenAI API key not configured"
- Check that `.env.local` file exists
- Verify API key is correct
- Restart development server

### "Failed to generate summary"
- Check OpenAI API key validity
- Verify internet connection
- Check OpenAI service status
- Review console logs for detailed errors

### Rate Limiting
- OpenAI has rate limits on API calls
- Implement retry logic if needed
- Consider caching for repeated requests

## Example Usage

Once configured, the summary generation happens automatically:

1. Record a conversation
2. Stop recording
3. Wait for transcription
4. AI automatically generates medical summary
5. Summary displays in proper medical format

The system will now generate real, contextual medical summaries based on the actual conversation content!
