import { connect, Redis } from "https://deno.land/x/redis@v0.29.3/mod.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

export const createClient = async () => {
  const client = await connect({
    hostname: Deno.env.get("REDIS_HOST") || "",
    port: parseInt(Deno.env.get("REDIS_PORT") || ""),
    username: Deno.env.get("REDIS_USER"),
    password: Deno.env.get("REDIS_PASS"),
  });

  return client;
};

export const getNextId = (client: Redis): Promise<number> => {
  return client.incr("ID_GENERATOR");
};
