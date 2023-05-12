/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "https://deno.land/std@0.145.0/dotenv/load.ts"; // We just need to add this
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

const port = parseInt(Deno.env.get("PORT") as string || "3000");
await start(manifest, {
  port: port,
  plugins: [twindPlugin(twindConfig)],
});
