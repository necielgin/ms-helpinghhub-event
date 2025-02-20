import app from './src/app.js';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

app.get('/health', async (req, res) => {
    try {
      // Check database connection (e.g., query a simple table)
      const { data, error } = await supabase
        .schema('HHTest')
        .from('Events')
        .select('*')
        .limit(1);
  
      if (error) throw error;
  
      // If everything is fine, return 200 OK
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: 'Connected',
      });
    } catch (err) {
      // If something is wrong, return 503 Service Unavailable
      res.status(503).json({
        status: 'Error',
        timestamp: new Date().toISOString(),
        database: 'Disconnected',
        error: err.message,
      });
    }
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});