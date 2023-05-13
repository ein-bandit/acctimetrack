import { BulkString, Redis } from "https://deno.land/x/redis@v0.29.3/mod.ts";
import { getType } from "./data-helper.ts";
import { DBSession } from "./process-upload.ts";
import { createClient } from "./redis-client.ts";

export const getSessionData = async (
  id: string,
): Promise<DBSession[]> => {
  const redis = await createClient();

  const data_exists = await redis.exists(id);
  if (!data_exists) {
    return [];
  }

  const type = getType(id);

  const sessions = [];

  if (type === "session") {
    const data = await loadSession(redis, id);
    sessions.push(data);
  }
  if (type === "group") {
    const raw = await redis.get(id) as BulkString;
    const sessionIds: number[] = JSON.parse(raw);

    for (const sessionId of sessionIds) {
      const session = await loadSession(redis, sessionId.toString());
      sessions.push(session);
    }
  }

  return sessions;
};

const loadSession = async (client: Redis, id: string): Promise<DBSession> => {
  const raw = await client.get(id) as BulkString;
  return JSON.parse(raw) as DBSession;
};
