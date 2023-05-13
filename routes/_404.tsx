import BaseLayout from "../components/layout/BaseLayout.tsx";
import { UnknownPageProps } from "$fresh/server.ts";
import IconError404 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/error-404.tsx";

export default function NotFoundPage(props: UnknownPageProps) {
  return (
    <>
      <BaseLayout path={props.url.pathname}>
        <div class="flex content-center items-center">
          <div class="py-4 px-2">
            <IconError404></IconError404>
          </div>

          <div class="flex content-center justify-center">
            <p>
              The page you requestd can not be found
            </p>
            <br />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
