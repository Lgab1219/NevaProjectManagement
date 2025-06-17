import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Allow file to grab keys from .env
dotenv.config()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

//Initiate express server
const app = express();

// Middleware
// CORS allows requests from differente frontend URLs
// express.json allows Express to read JSON data
app.use(cors());
app.use(express.json());

// Fetch users and filter them by display name
app.get('/search-users', async (request, result) => {
  try {
    const { query } = request.query;
    if (!query) return result.status(400).json({ error: 'No query provided!' });

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Supabase Error:", error);
      return result.status(500).json({ error: error.message });
    }

    const filteredData = data.users.filter((user) => {
      const username = user.user_metadata?.displayName;
      return username.toLowerCase().includes(query.toLowerCase());
    });

    result.json(filteredData);

  } catch (err) {
    console.error("Unhandled Error:", err);
    result.status(500).json({ error: 'Something went wrong!' });
  }
});


app.listen(4000, () => console.log('Server listening on port 4000'));




