import Features from "../components/Features.tsx";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import { PageProps } from "$fresh/server.ts";

export default function Home(props: PageProps) {
  return (
    <>
      <BaseLayout path={props.url.pathname}>
        <div class="flex content-center items-center">
          <div class="py-4 px-2">
            <img
              src="/logo.svg"
              alt="acc time track logo"
            />
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
