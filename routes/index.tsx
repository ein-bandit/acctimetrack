import Features from "../components/Features.tsx";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import { PageProps } from "$fresh/server.ts";
import IconCalendarTime from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/calendar-time.tsx";

export default function Home(props: PageProps) {
  return (
    <>
      <BaseLayout path={props.url.pathname}>
        <div class="flex content-center items-center">
          <div class="py-4 px-2">
            <IconCalendarTime></IconCalendarTime>
          </div>

          <div class="flex content-center">
            <p class="">
              Welcome to acc time track
            </p>
          </div>
        </div>
        <Features></Features>
      </BaseLayout>
    </>
  );
}
