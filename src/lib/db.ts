import { Pool, QueryResult } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
});

export async function query(text: string, params?: any[]): Promise<any[]> {
    const result: QueryResult = await pool.query(text, params);
    return result.rows;
  }