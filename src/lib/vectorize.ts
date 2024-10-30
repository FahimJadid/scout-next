// Open API
// import { openai } from "./openai"

// export const vectorize = async (input: string): Promise<number[]> => {
//     const embeddingResponse = await openai.embeddings.create({
//         input,
//         model: "text-embedding-ada-002"
//     })
//     const vector = embeddingResponse.data[0].embedding
    
// 	return vector;
// }

// Hugging Face
import { hugging } from "./huggingFace";

export const vectorize = async (text: string): Promise<number[]> => {
    const model = 'sentence-transformers/all-mpnet-base-v2'

    const vector = await hugging.featureExtraction({
        model,
        inputs: text,
    })
    
	return vector as number[];
}


