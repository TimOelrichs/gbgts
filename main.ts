import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import router from "./backend/routes/pkm-routes.ts";

import populateKvStoreIfEmpty from "./backend/data/populateDB.ts"

const kv = await Deno.openKv();

// Create an async iterator to go through all keys in the Kv store
for await (const entry of kv.list({ prefix: [] })) {
    // Delete each key found in the Kv store
    await kv.delete(entry.key);
}

console.log("All keys deleted.");

await kv.close();

/*
const jsonFilePath = "./backend/data/db-seed.json";
await populateKvStoreIfEmpty(jsonFilePath);
*/

const app = new Application();

//serve Backend REST API
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000
console.log(`Listening on port ${PORT} ...`)
await app.listen({ port: PORT });
