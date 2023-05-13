import { Redis } from "https://deno.land/x/redis@v0.29.3/mod.ts";
import { createClient, getNextId } from "./redis-client.ts";
import { getLapsPerDriver } from "./results-gatherer.ts";
import { LapTimeResult, MetaData, SessionResults } from "./types.d.ts";
import { cleanName } from "./meta-helper.ts";

export type StorageInfo = [number, string];

export const processFiles = async (
  _meta: MetaData,
  results: SessionResults,
): Promise<StorageInfo> => {
  console.log("Processing files", _meta, results);

  const best_lap_times_per_driver = getLapsPerDriver(results);

  const session = {
    sessionType: results.sessionType,
    trackName: results.trackName,
    isWetSession: results.sessionResult.isWetSession === 1,
    times: best_lap_times_per_driver,
  };

  const redis = await createClient();
  const id = await getNextId(redis);

  await storeSession(redis, id, session);

  const meta = {
    name: _meta.name && _meta.name.length ? cleanName(_meta.name) : "",
  };

  if (meta.name && meta.name.length) {
    await storeCollection(redis, meta.name, id);
  }

  return [id, meta.name];
};

interface DBSession {
  sessionType: string;
  trackName: string;
  isWetSession: boolean;
  times: {
    [key: string]: LapTimeResult;
  };
}

const storeSession = async (redis: Redis, id: number, session: DBSession) => {
  await redis.set(id.toString(), JSON.stringify(session));
};

const storeCollection = async (
  redis: Redis,
  collectionName: string,
  id: number,
) => {
  const raw_collection = await redis.get(collectionName);

  let collection = JSON.parse(raw_collection as string) as number[];

  if (collection) {
    collection = [...collection, id];
  } else {
    collection = [id];
  }
  await redis.set(collectionName, JSON.stringify(collection));
};
