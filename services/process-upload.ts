import { Redis } from "https://deno.land/x/redis@v0.29.3/mod.ts";
import { createClient, getNextId } from "./redis-client.ts";
import { getLapsPerDriver } from "./results-gatherer.ts";
import { LapTimeResult, MetaData, SessionResults } from "./types.d.ts";
import { cleanName } from "./data-helper.ts";

export type StorageInfo = [number, string];

export interface DBSession {
  internalId: number;
  sessionType: string;
  trackName: string;
  isWetSession: boolean;
  timestamp: number;
  times: {
    [key: string]: LapTimeResult;
  };
}

export const processFiles = async (
  _meta: MetaData,
  results: SessionResults,
): Promise<StorageInfo> => {
  console.log("Processing files", _meta, results);

  const best_lap_times_per_driver = getLapsPerDriver(results);

  const redis = await createClient();
  const id = await getNextId(redis);

  const session: DBSession = {
    internalId: id,
    sessionType: results.sessionType,
    trackName: results.trackName,
    isWetSession: results.sessionResult.isWetSession === 1,
    timestamp: new Date().getTime(),
    times: best_lap_times_per_driver,
  };

  await storeSession(redis, id, session);

  const meta = {
    name: _meta.name && _meta.name.length ? cleanName(_meta.name) : "",
  };

  if (meta.name && meta.name.length) {
    await storeCollection(redis, meta.name, id);
  }

  return [id, meta.name];
};

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
