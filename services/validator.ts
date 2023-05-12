import { MetaData, SessionResults } from "./types.d.ts";

export const MAX_META_NAME_LENGTH = 64;

export const validateResults = (results: SessionResults | null): boolean => {
  if (results === null) return false;

  if (!results.sessionResult) return false;

  if (
    !results.sessionResult.leaderBoardLines ||
    results.sessionResult.leaderBoardLines?.length === 0
  ) return false;

  if (!results.trackName || results.trackName.length === 0) return false;

  return true;
};

export const validateMeta = (meta: MetaData): boolean => {
  if (meta.name && meta.name.length > MAX_META_NAME_LENGTH) return false;

  return true;
};
