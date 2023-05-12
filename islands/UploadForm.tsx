import Button from "../islands/Button.tsx";
import Input from "../components/Input.tsx";
import { useState } from "preact/hooks";

export default function UploadForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Input
        type="file"
        name="file-upload"
        label="Upload your results file"
        onChange={(e) => {
          const files = (e.target as HTMLInputElement)?.files;
          if (files?.length) {
            setFile(files[0]);
          } else {
            setFile(null);
          }
        }}
      >
      </Input>
      <Input
        placeholder="[optional] add server name"
        name="server-name"
        type="text"
        label="Server Name"
        value={name}
        onInput={(e) => {
          setName((e.target as HTMLInputElement).value ?? "");
        }}
      >
      </Input>
      <div class="mt-2">
        Hint: add a server name to group multiple sessions in a single dashboard
      </div>
      <div class="flex justify-end">
        <Button
          type="button"
          text="Upload"
          disabled={!file || !name.length}
          onClick={() => {
            console.log("upload clicked", name, file);
          }}
        >
        </Button>
      </div>
    </>
  );
}
