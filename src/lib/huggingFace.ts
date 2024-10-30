import { config } from "dotenv";

import { HfInference } from "@huggingface/inference";

config({ path: ".env" }); // or .env.local


const apiKey = process.env.HUGGING_FACE_API_KEY;

if (!apiKey) {
  throw new Error(
    "The HUGGING_FACE_API_KEY environment variable is missing or empty."
  );
}

export const hugging = new HfInference(apiKey);



