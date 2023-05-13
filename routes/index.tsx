import Features from "../components/Features.tsx";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import { PageProps } from "$fresh/server.ts";
import IconCalendarTime from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/calendar-time.tsx";

export default function Home(props: PageProps) {
  return (
    <>
      <BaseLayout path={props.url.pathname}>
        <div class="flex content-center items-center">
          <div class="flex content-center">
            <h1 class="mb-2 mt-0 text-3xl font-medium leading-tight text-yellow-600">
              Welcome to <span class="font-bold">ACC Time Track</span>
            </h1>
          </div>
        </div>
        <Features></Features>
      </BaseLayout>
    </>
  );
}
