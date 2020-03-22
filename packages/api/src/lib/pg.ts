import { Client } from "pg";

export async function pgClient(): Promise<Client> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();

    return client;
}
