import BaseLayout from "../components/layout/BaseLayout.tsx";
import { PageProps } from "$fresh/server.ts";
import IconHomeEdit from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/home-edit.tsx";

export default function Home(props: PageProps) {
  return (
    <>
      <BaseLayout path={props.url.pathname}>
        <div class="flex content-center items-center">
          <div class="py-4 px-2">
            <IconHomeEdit></IconHomeEdit>
          </div>

          <div class="flex content-center justify-center">
            <p>
              build your dashboard - coming soon
            </p>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
