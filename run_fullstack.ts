import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import router from "./backend/routes/pkm-routes.ts";

import populateKvStoreIfEmpty from "./backend/data/populateDB.ts"

const jsonFilePath = "./backend/data/db-seed.json";
await populateKvStoreIfEmpty(jsonFilePath);


const app = new Application();

//serve Backend REST API
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

//serve frontent
app.use(async (context) => {
    await context.send({
        root: `${Deno.cwd()}/frontend/dist`,
        index: "index.html",
    });
});

const PORT = 8000
console.log(`Listening on port ${PORT} ...`)
await app.listen({ port: PORT });
