const kv = await Deno.openKv();

// Function to check if "Pkm" prefix exists and populate if it's empty
export default async function populateKvStoreIfEmpty(jsonFilePath: string) {
    try {
        // Check if there are any keys with the prefix "Pkm"
        const iterator = kv.list({ prefix: ["Pkm"] });
        const firstEntry = await iterator.next();

        if (!firstEntry.done) return;

        console.log("No entries with prefix 'ey'. Populating Kv store...");

        // Read the JSON file
        const jsonData = await Deno.readTextFile(jsonFilePath);

        // Parse the JSON into an array of objects
        const data = JSON.parse(jsonData);

        // Loop through the array and store each object using its `id` with the prefix "Pkm"
        for (const item of data) {
            const key = ["Pkm", item.id]; // Store data with the "Pkm" prefix
            await kv.set(key, item);
            console.log(`Inserted data for key: ${key}`);
        }

        console.log("Kv store populated successfully!");
    } catch (error) {
        console.error("Error populating Kv store:", error);
    }
}

