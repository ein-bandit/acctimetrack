import { PageProps } from "$fresh/server.ts";
import BaseLayout from "../components/layout/BaseLayout.tsx";
import UploadForm from "../islands/UploadForm.tsx";

import { HandlerContext } from "$fresh/server.ts";
import { createDataResponse, createResponse } from "../services/api-helper.ts";
import {
  MAX_META_NAME_LENGTH,
  validateGroupName,
  validateResults,
} from "../services/validator.ts";
import { MetaData, SessionResults } from "../services/types.d.ts";
import { processFiles, StorageInfo } from "../services/process-upload.ts";

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

    let json: SessionResults | null = null;

    try {
      json = JSON.parse(file as string) as SessionResults;
      console.log("success, file was parsable");
    } catch (e) {
      console.log("retrieved invalid json");

      return createResponse(
        400,
        "Invalid acc server results file retrieved. Please check your file upload",
      );
    }

    let meta_data: MetaData | null = null;
    try {
      meta_data = JSON.parse(meta as string) as MetaData;
    } catch (e) {
      console.log("retrieved invalid meta data");

      return createResponse(
        400,
        "Invalid meta data retrieved. Please check name",
      );
    }

    // validate json file
    if (json && !validateResults(json)) {
      console.log("results was not valid");
      return createResponse(400, "Missing or wrong data in results file");
    }
    // validate meta data
    if (meta_data && !validateGroupName(meta_data.name)) {
      console.log("meta data was not valid");
      return createResponse(
        400,
        `Invalid meta data retrieved. Name is longer than ${MAX_META_NAME_LENGTH} characters`,
      );
    }

    const storageInfo = await processFiles(meta_data, json);

    const links = createLinksFromStorageInfo(storageInfo);
    return createDataResponse(
      200,
      {
        message: "Lap Times stored successfully.",
        links,
      },
    );
  }
  // if GET request
  return _ctx.render();
};

const createLinksFromStorageInfo = (storageInfo: StorageInfo): string[] => {
  return storageInfo.map((si) => `${Deno.env.get("HOST")}/${si}`);
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
