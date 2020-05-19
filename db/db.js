import { Client } from "https://deno.land/x/postgres/mod.ts";
import * as cfg from "../config/config.js";

export default class Database {
  constructor() {
    this.client = new Client({
      user: cfg.DB_USER,
      database: cfg.DB_NAME,
      hostname: cfg.DB_ADDR,
      password: cfg.DB_PASS,
      port: cfg.DB_PORT,
    });
  }
}
