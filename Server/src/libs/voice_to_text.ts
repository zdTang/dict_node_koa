module.exports={
async voiceToText(voice){

  

  return await this.main(voice).catch(console.error);

},

async main(voicePath:string) {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  //const fileName = './brooklyn.flac';
  const fileName = voicePath;

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };

  // Config
  const config = {
    encoding: 'FLAC',
    //sampleRateHertz: 16000,// this one is not for FLAC
    languageCode: 'en-US',
    model: 'command_and_search'
  };

  // Request
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  return transcription;
}



}