import postgres from "postgres";

// En anslutning till Supabase-databasen som hela servern delar.
// Adressen kommer från DATABASE_URL i .env och används bara på servern.
const sql = postgres(process.env.DATABASE_URL!);

export default sql;
