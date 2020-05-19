import { Router } from "https://deno.land/x/oak/mod.ts";
import Database from "./db/db.js";
import UrlRepo from "./model/url.js";
import URLHandler from "./handler/url.js";

const router = new Router();

const db = new Database();
await db.client.connect();

const urlRepo = new UrlRepo(db.client);

const urlHandler = new URLHandler(urlRepo);

router.get("/:tiny", urlHandler.redirect);
router.get("/shorten/:url", urlHandler.shorten);

export default router;
