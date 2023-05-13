import Button from "../islands/Button.tsx";
import Input from "../components/Input.tsx";
import { useState } from "preact/hooks";
import { MAX_META_NAME_LENGTH } from "../services/validator.ts";
import DashboardLinkPreview from "../components/DashboardLinkPreview.tsx";

interface UIMeta {
  name: string;
}
export default function UploadForm() {
  const [meta, setMeta] = useState<UIMeta>({ name: "" });
  const [file, setFile] = useState<string | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);

  const handleFileSelect = (
    e: Event,
  ) => {
    const files = (e.target as HTMLInputElement)?.files;
    setFileError(false);
    if (files?.length) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target?.result);
        const string_data = event.target?.result ?? "";
        try {
          const obj = JSON.parse(string_data as string);
          console.log(obj);
          setFile(obj);
        } catch (exc) {
          console.error("could not parse uploaded file", exc.message);
          (e.target as HTMLInputElement).value = "";
          setFileError(true);
        }
      };
      reader.readAsText(files[0]);
    } else {
      setFile(null);
      setFileError(false);
    }
  };

  return (
    <>
      <Input
        type="file"
        name="file-upload"
        label={fileError ? "File is not valid" : "Upload your results file"}
        error={fileError}
        accept=".json"
        onChange={handleFileSelect}
      >
      </Input>
      <Input
        placeholder="[optional] add server name"
        name="server-name"
        type="text"
        label="Server Name"
        maxLength={MAX_META_NAME_LENGTH}
        value={meta.name}
        onInput={(e) => {
          setMeta({
            ...meta,
            name: (e.target as HTMLInputElement).value ?? "",
          });
        }}
      >
      </Input>
      <div>
        {meta.name.length > 0 && (
          <div>
            <DashboardLinkPreview name={meta.name}></DashboardLinkPreview>
          </div>
        )}
      </div>
      <div class="mt-2">
        Hint: add a server name to group multiple sessions in a single dashboard
      </div>

      <form
        method={"post"}
        onSubmit={(e) => {
          console.log("upload clicked", meta.name, file);
        }}
      >
        <input
          type="hidden"
          name="meta"
          value={JSON.stringify(meta)}
        />
        <input
          type="hidden"
          name="file"
          value={JSON.stringify(file)}
        />
        <div class="flex justify-end">
          <Button
            type="submit"
            text="Upload"
            disabled={!file || !meta.name.length || fileError}
          >
          </Button>
        </div>
      </form>
    </>
  );
}
