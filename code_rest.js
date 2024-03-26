// dependencies
// {
//   "dependencies": {
//     "@google-cloud/functions-framework": "^3.0.0",
//     "axios": "^1.3.3",
//     "google-auth-library": "^9.6.3"
//   }
// }

// chave
// {
//   "type": "service_account",
//   "project_id": "seu-projeto",
//   "private_key_id": "sua_key_id",
//   "private_key": "sua-private-key",
//   "client_email": "seu-client-email",
//   "client_id": "seu-client-id",
//   "auth_uri": "sua-uri",
//   "token_uri": "seu-token-uri",
//   "auth_provider_x509_cert_url": "url,
//   "client_x509_cert_url": "url",
//   "universe_domain": "url"
// }

const functions = require('@google-cloud/functions-framework');
const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

const projectId = 'seu-projeto-id';
const location = 'us-central1';
const modelName = 'gemini-1.0-pro-vision';
const serviceAccountKeyPath = './servicos.json';

async function generateAccessToken() {
 const auth = new GoogleAuth({
   keyFile: serviceAccountKeyPath,
   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
 });

 const token = await auth.getAccessToken();
 return token;
}

functions.cloudEvent('helloGCS', async (cloudEvent) => {
  try {
    const file = cloudEvent.data;
    const bucketName = file.bucket;
    const filePath = file.name;
    const fileUri = `gs://${bucketName}/${filePath}`;

    const requestBody = {
      contents: [{
        role: 'user',
        parts: [
          { fileData: { mimeType: 'image/jpeg', fileUri } },
          { text: 'Describe this picture in portuguese.' },
        ],
      }],
    };

    const accessToken = await generateAccessToken();

    const instance = axios.create({
      baseURL: `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelName}:streamGenerateContent`,

      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await instance.post('', requestBody);

    const data = response.data;

    console.log('API response:', JSON.stringify(data));

  } catch (error) {
    console.error('Error processing image:', error);
  }
});