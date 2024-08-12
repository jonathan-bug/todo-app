import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "todo_app",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

export default pool;
