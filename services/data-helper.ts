import { isNumber } from "https://deno.land/x/is_number@v1.6.1/mod.ts";
import { DBSession } from "./process-upload.ts";
import { UIResult } from "../components/TimeTable.tsx";

export const cleanName = (name: string): string => {
  return name.trim().replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
};

export const getType = (id: string): "group" | "session" =>
  isNumber(id) ? "session" : "group";

export const getShortStringFromMillis = (millis: number): string => {
  const d = new Date(millis);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};

export const fmt = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  return `${minutes.toString().padStart(2, "0")}:${
    seconds.toString().padStart(2, "0")
  }.${ms}`;
};

export const convertSessionData = (sessions: DBSession[]): UIResult[] => {
  //fastet times per driver
  const ftpd: { [key: string]: UIResult } = {};

  sessions.forEach((session) => {
    const drivers = Object.keys(session.times);
    drivers.forEach((driver) => {
      const result: UIResult = {
        session: session.internalId,
        driver,
        lap: session.times[driver],
      };

      if (ftpd[driver] === undefined) {
        ftpd[driver] = result;
      } else if (ftpd[driver].lap.lap > result.lap.lap) {
        // we have already an entry. if it is slower set ne array
        ftpd[driver] = result;
      } // else do nothing, before added lap was faster
    });
  });

  const results: UIResult[] = Object.values(ftpd)
    .sort((r1, r2) => r1.lap.lap - r2.lap.lap);

  return results;
};
