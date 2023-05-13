import { isNumber } from "https://deno.land/x/is_number@v1.6.1/mod.ts";

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
