# Scout

## Quick Planning for Scout

**Table of Contents**

- HomePage 
    - To display the products preview upon the search
- Search 
    - intuitive
    - functional (like when press the search it'll put the search in the url & keep the progress even after reload the page)
- Product Preview

## Getting Started

A cutting-edge search engine that combines the speed of Postgres full-text search with the precision of semantic querying, delivering fast and highly accurate search results.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FahimJadid/scout-next.git
   cd scout-next
   ```

2. **Install dependencies:**

   ```bash
   npm install # yarn or pnpm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the project root directory based on the provided `.env.example` file by simply using command `mv .env.example .env`.

   ```dotenv
   DATABASE_URL=             # Database URL
   UPSTASH_VECTOR_REST_URL=  # Upstash Vector REST API URL
   UPSTASH_VECTOR_REST_TOKEN= # Upstash Vector REST API Token
   HUGGING_FACE_API_KEY=     # Hugging Face API Key
   OPENAI_API_KEY=           # OpenAI API Key (Optional)
   ```

4. **Database Setup:**

   - Create a Postgres db using [Neon](https://neon.tech)
   - get the connection string and add it to env variables

5. **Run the application:**

   ```bash
   npm run dev
   ```


> [!IMPORTANT]
>If you want to use a free embedding model that Hugging Face (inference) provides instead of openai; You can follow this steps:

1. Sign Up to [Hugging Face](https://huggingface.co/)
2. get the HUGGING_FACE_API_KEY from settings > keys
3. add env variable `HUGGING_FACE_API_KEY=your-key`