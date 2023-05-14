import BaseLayout from "../components/layout/BaseLayout.tsx";
import TimeTable from "../components/TimeTable.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DBSession } from "../services/process-upload.ts";
import { getSessionData } from "../services/data-fetcher.ts";
import { convertSessionData, getType } from "../services/data-helper.ts";
import SessionOverview from "../components/SessionOverview.tsx";
import { isNumber } from "https://deno.land/x/is_number@v1.6.1/mod.ts";
import { validateGroupName } from "../services/validator.ts";

export const handler: Handlers<DBSession[]> = {
  async GET(_, ctx) {
    const data = await getSessionData(ctx.params.name);
    console.log("requested url", ctx.params.name);

    const name = ctx.params.name;
    const is_valid_url = isNumber(name) || validateGroupName(name);

    if (data.length === 0 || !is_valid_url) {
      return ctx.renderNotFound();
    }
    return ctx.render(data);
  },
};

export default function Greet(
  { data, params, url }: PageProps<DBSession[]>,
) {
  const type: "group" | "session" = getType(params.name);

  const results = convertSessionData(data);

  return (
    <>
      <BaseLayout path={url.pathname}>
        <SessionOverview name={params.name} type={type} data={data} />
        <TimeTable results={results}></TimeTable>
      </BaseLayout>
    </>
  );
}
