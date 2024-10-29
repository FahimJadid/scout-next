import { openai } from "./openai"

export const vectorize = async (input: string): Promise<number[]> => {
    const embeddingResponse = await openai.embeddings.create({
        input,
        model: "text-embedding-ada-002"
    })
    const vector = embeddingResponse.data[0].embedding
    
	return vector;
}













// import { openai } from "./openai";

// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000; // Initial delay in milliseconds

// export const vectorize = async (input: string): Promise<number[]> => {
//   let retries = 0;

//   while (retries < MAX_RETRIES) {
//     try {
//       const embeddingResponse = await openai.embeddings.create({
//         input,
//         model: "text-embedding-ada-002",
//       });

//       // Assuming the response contains an array of embeddings

//       if (embeddingResponse && embeddingResponse.data) {
//         const vector = embeddingResponse.data[0].embedding;
//         return vector;
//       } else {
//         throw new Error("Invalid response from OpenAI Embeddings API");
//       }
//     } catch (error) {
//       retries++;
//       console.error("Error during vectorization:", error);
//       console.warn(
//         `Rate limit exceeded. Retrying in ${RETRY_DELAY * retries}ms...`
//       );
//       await new Promise((resolve) =>
//         setTimeout(resolve, RETRY_DELAY * retries)
//       );
//     }
//   }

//   throw new Error("Exceeded maximum retries for OpenAI API requests");
// };
