import { isNumber } from "https://deno.land/x/is_number@v1.6.1/mod.ts";
import { SessionResults } from "./types.d.ts";
import { cleanName } from "./data-helper.ts";

export const MAX_META_NAME_LENGTH = 64;
export const MIN_META_NAME_LENGTH = 4;
export const MIN_META_CLEANNAME_LENGTH = 4;

export const MAX_PASSWORD_LENGTH = 64;
export const MIN_PASSWORD_LENGTH = 4;

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

export const validateGroupName = (name: string | null | undefined): boolean => {
  if (
    !name || name.length < MIN_META_NAME_LENGTH ||
    name.length > MAX_META_NAME_LENGTH || isNumber(name) ||
    cleanName(name).length < MIN_META_CLEANNAME_LENGTH
  ) return false;

  return true;
};

export const validateGroupPassword = (
  password: string | null | undefined,
): boolean => {
  if (
    !password || password.length < MIN_PASSWORD_LENGTH ||
    password.length > MAX_PASSWORD_LENGTH
  ) return false;

  return true;
};
