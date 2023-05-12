import { PageProps } from "$fresh/server.ts";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import UploadForm from "../islands/UploadForm.tsx";

import { HandlerContext } from "$fresh/server.ts";
import { createResponse } from "../services/api-helper.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (_req.method === "POST") {
    const formData = await _req.formData();

    console.log(_req.headers.get("content-type"));

    const meta = formData.get("meta");
    const file = formData.get("file");
    console.log(meta);
    console.log(file);

    let json = "";

    try {
      json = JSON.parse(file as string);
      console.log("success, file was parsable");
    } catch (e) {
      console.log("retrieved invalid json");

      return createResponse(
        400,
        "Invalid acc server results file retrieved. Please check your file upload",
      );
    }

    // validate json file

    // work with data

    return createResponse(
      200,
      "Lap Times stored successfully. url: ...",
    );
  }
  // if GET request
  return _ctx.render();
};

export default function Upload(props: PageProps) {
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
