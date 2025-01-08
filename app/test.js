require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function queryDatabase() {
  try {
    const client = await pool.connect();
    console.log("Connected to the database!");

    // Perform a query
    const result = await client.query('SELECT * FROM admin LIMIT 5'); // Change 'trains' to your table
    console.log("Query result:", result.rows);

    client.release();
  } catch (error) {
    console.error("Error executing query:", error.message);
  } finally {
    pool.end();
  }
}

queryDatabase();