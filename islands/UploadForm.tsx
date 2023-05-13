import Button from "../islands/Button.tsx";
import Input from "../components/Input.tsx";
import { useState } from "preact/hooks";
import {
  MAX_META_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_META_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  validateGroupName,
  validateGroupPassword,
} from "../services/validator.ts";
import DashboardLinkPreview from "../components/DashboardLinkPreview.tsx";
import CheckBoxInput from "../components/CheckBoxInput.tsx";

interface UIMeta {
  name: string;
  password: string;
}
export default function UploadForm() {
  const [meta, setMeta] = useState<UIMeta>({ name: "", password: "" });
  const [file, setFile] = useState<string | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameBlured, setNameBlured] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [pwBlured, setPwBlured] = useState<boolean>(false);
  const [groupingActive, setGroupingActive] = useState<boolean>(false);

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
      <CheckBoxInput
        type="checkbox"
        checked={groupingActive}
        onChange={(e) => {
          setGroupingActive((e.target as HTMLInputElement).checked);
        }}
        label="Group multiple sessions?"
      >
      </CheckBoxInput>
      <div>
        {groupingActive && (
          <>
            <div>
              <Input
                placeholder="add server name"
                name="server-name"
                type="text"
                error={nameError}
                onBlur={(e) => {
                  if (!validateGroupName(meta.name)) {
                    setNameError(true);
                  }
                  setNameBlured(true);
                }}
                label="Server Name"
                maxLength={MAX_META_NAME_LENGTH}
                minLength={MIN_META_NAME_LENGTH}
                value={meta.name}
                onInput={(e) => {
                  setNameError(false);
                  const value = (e.target as HTMLInputElement).value ?? "";
                  if (nameBlured && !validateGroupName(value)) {
                    setNameError(true);
                  }
                  setMeta({
                    ...meta,
                    name: value,
                  });
                }}
              >
              </Input>
              <div>
                {meta.name.length > 0 && (
                  <div>
                    <DashboardLinkPreview name={meta.name} />
                  </div>
                )}
              </div>
            </div>
            <div class="mt-1">
              <Input
                placeholder="password to add more sessions to group later"
                name="server-password"
                type="text"
                error={passwordError}
                onBlur={(e) => {
                  if (!validateGroupPassword(meta.password)) {
                    setPasswordError(true);
                  }
                  setPwBlured(true);
                }}
                label="Grouping Password"
                maxLength={MAX_PASSWORD_LENGTH}
                minLength={MIN_PASSWORD_LENGTH}
                value={meta.password}
                onInput={(e) => {
                  setPasswordError(false);
                  const value = (e.target as HTMLInputElement).value ?? "";
                  if (pwBlured && !validateGroupPassword(value)) {
                    setPasswordError(true);
                  }
                  setMeta({
                    ...meta,
                    password: (e.target as HTMLInputElement).value ?? "",
                  });
                }}
              >
              </Input>
            </div>
          </>
        )}
      </div>

      <div class="mt-2">
        {!groupingActive && (
          <div>
            Hint: add a server name to group multiple sessions in a single
            dashboard.
          </div>
        )}
        {groupingActive &&
          (
            <div>
              Hint: use an optional password to make sure only you can add more
              sessions to the group
            </div>
          )}
      </div>

      <form
        method={"post"}
        onSubmit={(e) => {
          console.log("upload clicked", meta.name, file);
          if (
            !validateGroupName(meta.name) ||
            !validateGroupPassword(meta.password)
          ) {
            e.preventDefault();
            console.log("invalid data to submit");
            return false;
          }
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
        <div class="flex justify-end mt-5">
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
