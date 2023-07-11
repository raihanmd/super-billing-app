import { Pool } from "mysql2/promise";

const { createPool } = require("mysql2/promise");

export const con: Pool = createPool(process.env.DATABASE_URL);
