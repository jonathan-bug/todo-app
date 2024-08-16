import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DB_CONN
})

export default pool;
