# Seamless Integration Guide

## Overview
The Daisy Medical Translator is designed to be easily integrated with Meta's Seamless model for real-time transcription and translation. The current implementation uses OpenAI Whisper and GPT-4, but the architecture is modular and ready for Seamless integration.

## Current Architecture

### Service Layer Design
The transcription API (`/api/transcribe`) uses a service-oriented architecture with:

1. **TranscriptionService Interface**: Defines the contract for transcription and translation services
2. **OpenAIWhisperService**: Current implementation using OpenAI Whisper + GPT-4
3. **SeamlessService**: Placeholder for future Seamless integration
4. **Service Factory**: Dynamically selects the appropriate service based on environment configuration

### Environment Configuration
```bash
# Current: Uses OpenAI for both transcription and summary
TRANSCRIPTION_SERVICE=openai
SUMMARY_SERVICE=openai

# Future: Use Seamless for transcription/translation, OpenAI for summary
TRANSCRIPTION_SERVICE=seamless
SUMMARY_SERVICE=openai

# Future: Use Seamless for everything
TRANSCRIPTION_SERVICE=seamless
SUMMARY_SERVICE=seamless
```

## Seamless Integration Steps

### 1. Install Seamless Dependencies
```bash
npm install seamless-communication
# or
pip install seamless-communication
```

### 2. Update Environment Variables
```bash
# Add to .env.local
TRANSCRIPTION_SERVICE=seamless  # Use Seamless for transcription/translation
SUMMARY_SERVICE=openai          # Keep OpenAI for medical summaries
SEAMLESS_MODEL_PATH=/path/to/seamless/model
# Add any other Seamless-specific configuration
```

### 3. Implement SeamlessService Class
Replace the placeholder methods in `app/api/transcribe/route.ts`:

```typescript
class SeamlessService implements TranscriptionService {
  async transcribe(audioBuffer: Buffer, audioFile: File, inputLanguage: string): Promise<string> {
    // TODO: Implement Seamless transcription
    // Example implementation:
    // const model = await loadSeamlessModel()
    // const transcription = await model.transcribe(audioBuffer, { language: inputLanguage })
    // return transcription.text
  }

  async translate(text: string, inputLanguage: string, outputLanguage: string): Promise<string> {
    // TODO: Implement Seamless translation
    // Example implementation:
    // const model = await loadSeamlessModel()
    // const translation = await model.translate(text, { 
    //   sourceLanguage: inputLanguage, 
    //   targetLanguage: outputLanguage 
    // })
    // return translation.text
  }
}

// Note: Summary generation will continue to use OpenAI by default
// unless you also implement SeamlessSummaryService
```

### 4. Language Code Mapping
Ensure proper language code mapping between the app and Seamless:

```typescript
const LANGUAGE_MAPPING = {
  'en': 'eng',      // English
  'es': 'spa',      // Spanish
  'zh': 'cmn',      // Mandarin Chinese
}
```

### 5. Audio Format Compatibility
Seamless may require specific audio formats. Update the audio processing:

```typescript
// Convert audio to Seamless-compatible format
const convertAudioForSeamless = (audioBuffer: Buffer): Buffer => {
  // TODO: Implement audio format conversion
  // Seamless typically expects 16kHz, 16-bit PCM
  return audioBuffer
}
```

## Benefits of Seamless Integration

### Real-time Processing
- **Lower Latency**: Seamless is optimized for real-time applications
- **Streaming Support**: Can provide partial results as audio is being processed
- **Better Performance**: Optimized for medical conversation scenarios

### Multilingual Capabilities
- **100+ Languages**: Seamless supports extensive language coverage
- **Dialect Support**: Better handling of regional variations
- **Code-switching**: Natural handling of mixed-language conversations

### Medical Domain Optimization
- **Medical Terminology**: Better understanding of medical vocabulary
- **Context Awareness**: Improved accuracy in healthcare conversations
- **Professional Language**: Maintains formal medical communication style

## Migration Strategy

### Phase 1: Parallel Testing
1. Keep OpenAI service as primary
2. Implement Seamless service in parallel
3. A/B test both services for accuracy and performance

### Phase 2: Gradual Rollout
1. Switch to Seamless for specific language pairs
2. Monitor performance and user feedback
3. Gradually expand to all supported languages

### Phase 3: Full Migration
1. Make Seamless the default service
2. Keep OpenAI as fallback for edge cases
3. Optimize based on real-world usage data

## Configuration Examples

### Development Environment
```bash
# .env.local
TRANSCRIPTION_SERVICE=openai
OPENAI_API_KEY=your_openai_key
```

### Production with Seamless
```bash
# .env.local
TRANSCRIPTION_SERVICE=seamless
SEAMLESS_MODEL_PATH=/models/seamless-large
SEAMLESS_DEVICE=cuda  # or cpu
```

### Hybrid Setup
```bash
# .env.local
TRANSCRIPTION_SERVICE=hybrid
OPENAI_API_KEY=your_openai_key
SEAMLESS_MODEL_PATH=/models/seamless-large
# Use Seamless for common languages, OpenAI for others
```

## Testing Seamless Integration

### Unit Tests
```typescript
describe('SeamlessService', () => {
  it('should transcribe English audio correctly', async () => {
    const service = new SeamlessService()
    const result = await service.transcribe(audioBuffer, audioFile, 'en')
    expect(result).toContain('medical terminology')
  })

  it('should translate between supported languages', async () => {
    const service = new SeamlessService()
    const result = await service.translate('Hello doctor', 'en', 'es')
    expect(result).toBe('Hola doctor')
  })
})
```

### Integration Tests
```typescript
describe('Transcription API', () => {
  it('should work with Seamless service', async () => {
    process.env.TRANSCRIPTION_SERVICE = 'seamless'
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    })
    expect(response.status).toBe(200)
  })
})
```

## Performance Considerations

### Model Loading
- **Lazy Loading**: Load Seamless model only when needed
- **Caching**: Cache model instances for reuse
- **Memory Management**: Monitor memory usage with large models

### Audio Processing
- **Chunking**: Process audio in smaller chunks for real-time feedback
- **Format Optimization**: Use optimal audio formats for Seamless
- **Quality vs Speed**: Balance between accuracy and latency

### Error Handling
- **Fallback Strategy**: Automatically fallback to OpenAI if Seamless fails
- **Retry Logic**: Implement retry mechanisms for transient failures
- **Graceful Degradation**: Maintain functionality even with service issues

## Monitoring and Analytics

### Key Metrics
- **Transcription Accuracy**: Compare with ground truth
- **Translation Quality**: User feedback and professional review
- **Latency**: End-to-end processing time
- **Error Rates**: Service failure and fallback frequency

### Logging
```typescript
console.log('Transcription service:', TRANSCRIPTION_SERVICE)
console.log('Processing time:', processingTime)
console.log('Confidence score:', confidence)
console.log('Language pair:', `${inputLanguage} -> ${outputLanguage}`)
```

The architecture is now ready for seamless integration with Meta's Seamless model while maintaining the current OpenAI-based functionality as a reliable fallback.
