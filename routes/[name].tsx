import BaseLayout from "../components/layout/BaseLayout.tsx";
import TimeTable from "../components/TimeTable.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { DBSession } from "../services/process-upload.ts";
import { getSessionData } from "../services/data-fetcher.ts";
import { getType } from "../services/data-helper.ts";
import SessionOverview from "../components/SessionOverview.tsx";

export const handler: Handlers<DBSession[]> = {
  async GET(_, ctx) {
    const data = await getSessionData(ctx.params.name);
    return ctx.render(data);
  },
};

export default function Greet(
  { data, params, url }: PageProps<DBSession[]>,
) {
  const type: "group" | "session" = getType(params.name);

  return (
    <>
      <BaseLayout path={url.pathname}>
        <SessionOverview name={params.name} type={type} data={data} />
        <TimeTable></TimeTable>
      </BaseLayout>
    </>
  );
}
