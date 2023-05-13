import { getShortStringFromMillis } from "./data-helper.ts";
import { DBSession } from "./process-upload.ts";

export const getSingleSessionCols = (data: DBSession[]): [string, string][] => {
  const dataCols: [string, string][] = [];
  const single = data[0];
  dataCols.push(["session type", single.sessionType]);
  dataCols.push(["track", single.trackName]);
  dataCols.push([
    "date",
    getShortStringFromMillis(single.timestamp),
  ]);
  dataCols.push(["conditions", single.isWetSession ? "dry" : "wet"]);
  dataCols.push(["laps", Object.keys(single.times).length.toString()]);

  return dataCols;
};

export const getMultiSessionCols = (data: DBSession[]): [string, string][] => {
  const dataCols: [string, string][] = [];
  const types = data.map((s) => s.sessionType);
  const typeNumbers: { [key: string]: number } = {
    "P": types.filter((t) => t.startsWith("P")).length,
    "Q": types.filter((t) => t.startsWith("Q")).length,
    "R": types.filter((t) => t.startsWith("R")).length,
  };
  const typeSummary = Object.keys(typeNumbers).map((key) => {
    if (typeNumbers[key] === 0) return null;
    return `${typeNumbers[key]}x ${key}`;
  }).filter((t) => t === null).join(" ");

  dataCols.push(["session type", typeSummary]);

  dataCols.push(["track", data[0].trackName]);

  const dates = data.map((s) => s.timestamp).sort((a, b) => a - b);
  const timeRange = `${getShortStringFromMillis(dates[0])} - ${
    getShortStringFromMillis(dates[dates.length - 1])
  }`;

  dataCols.push(["date", timeRange]);

  return dataCols;
};
