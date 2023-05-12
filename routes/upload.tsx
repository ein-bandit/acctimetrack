import { PageProps } from "$fresh/server.ts";
import Input from "../components/Input.tsx";
import BaseLayout from "../components/layout/BaseLayout.tsx";

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
      <Input type="file" name="file-upload" label="Upload your results file">
      </Input>
      <Input
        placeholder="[optional] add server name"
        name="server-name"
        type="text"
        label="Server Name"
      >
      </Input>
      <div class="mt-2">
        Hint: add a server name to created a named dashboard to group sessions
      </div>
    </BaseLayout>
  );
}
