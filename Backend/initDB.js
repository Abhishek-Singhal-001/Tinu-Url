const { pool } = require('./db.js'); 
const initDB = async function () {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      code VARCHAR(8) UNIQUE NOT NULL,
      target_url TEXT NOT NULL,
      clicks INTEGER DEFAULT 0,
      last_clicked TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  
  const createIndexQuery = `
    CREATE INDEX IF NOT EXISTS idx_code ON links(code);
  `;
  
  try {
    await pool.query(createTableQuery);
    await pool.query(createIndexQuery);
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
  }
};

module.exports = { initDB };
