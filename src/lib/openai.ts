import OpenAI from "openai";
import { config } from "dotenv";

// Load environment variables from .env file
config({ path: ".env" }); // or .env.local

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty."
  );
}

export const openai = new OpenAI({ apiKey });
