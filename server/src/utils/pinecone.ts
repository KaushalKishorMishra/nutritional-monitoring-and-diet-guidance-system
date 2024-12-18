import { Pinecone } from "@pinecone-database/pinecone";

// index "nutrition-index-1"
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.Index("nutrition-index-1");

export const queryVectors = async (queryVector) => {
  const queryResponse = await index.namespace("iter5").query({
    topK: 5,
    vector: queryVector,
    includeValues: false,
    includeMetadata: true,
  });

  return queryResponse;
};
