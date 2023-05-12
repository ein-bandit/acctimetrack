import { PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import UploadForm from "../islands/UploadForm.tsx";

export default function Counter(props: PageProps) {
  return (
    <BaseLayout path={props.url.pathname}>
      <div class="mb-4">
        If you are searching for the automatic upload scripts for your server,
        head over to our{" "}
        <a
          href="https://github.com/ein-bandit/acctimetrack"
          target="_blank"
          class="text-underline"
        >
          github
        </a>
      </div>

      <h2 class="mb-2 mt-0 text-4xl font-medium leading-tight text-primary">
        Upload Results
      </h2>
      <UploadForm></UploadForm>
    </BaseLayout>
  );
}
