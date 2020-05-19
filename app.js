import { Application } from "https://deno.land/x/oak/mod.ts";
import * as cfg from "./config/config.js";
import router from "./routes.js";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started...");

await app.listen({ port: cfg.PORT });
