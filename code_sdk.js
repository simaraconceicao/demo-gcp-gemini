// dependencies
// {
//   "dependencies": {
//     "@google-cloud/functions-framework": "^3.0.0",
//     "fs": "^0.0.1-security",
//     "@google/generative-ai": "^0.3.1",
//     "@google-cloud/storage": "^7.9.0",
//     "dotenv": "^16.4.5"
//   }
// }

const functions = require('@google-cloud/functions-framework');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require("fs");
const { Storage } = require('@google-cloud/storage');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const storage = new Storage();

functions.cloudEvent('helloGCS', async (cloudEvent) => {
  try {
    const file = cloudEvent.data;
    const bucketName = file.bucket;
    const filePath = file.name;

    const tempFilePath = `/tmp/${filePath}`;
    await storage.bucket(bucketName).file(filePath).download({ destination: tempFilePath });

    function fileToGenerativePart(path, mimeType) {
      return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType
        },
      };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = 'Descrice this photo in portuguese';
    const imageParts = [
      fileToGenerativePart(tempFilePath, "image/jpeg"),
    ];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    fs.unlinkSync(tempFilePath);

  } catch (error) {
    console.error('Error processing image:', error);
  }
});  