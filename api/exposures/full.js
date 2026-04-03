import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM exposure_full_mview WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
}
