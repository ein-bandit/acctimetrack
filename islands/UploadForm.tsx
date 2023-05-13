// deno-lint-ignore-file no-explicit-any
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

  const tryLoadFile = (
    file: File,
    encoding: "UTF-16" | "UTF-8",
    success: (data: any) => void,
    error: (exc: any) => void,
  ) => {
    const reader = new FileReader();

    reader.readAsText(file, encoding);
    reader.onload = (event) => {
      console.log(event.target?.result);
      const string_data = event.target?.result ?? "";
      try {
        const obj = JSON.parse(string_data as string);
        success(obj);
      } catch (exc) {
        error(exc);
      }
    };
  };

  const handleFileSelect = (
    e: Event,
  ) => {
    const files = (e.target as HTMLInputElement)?.files;
    setFileError(false);
    if (files?.length) {
      const file = files[0];
      tryLoadFile(file, "UTF-16", successHandler, (error: any) => {
        console.error(
          "could not parse uploaded file with UTF-16",
          error.message,
        );

        console.log("trying UTF-8 encoding");
        tryLoadFile(file, "UTF-8", successHandler, (error: any) => {
          console.error("could not parse uploaded file", error.message);
          setFile("");
          setFileError(true);
        });
      });
    } else {
      setFile(null);
      setFileError(false);
    }
  };

  const successHandler = (data: any) => {
    console.log(data);
    setFile(data);
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
                  if (
                    meta.password.length > 0 &&
                    !validateGroupPassword(meta.password)
                  ) {
                    setPasswordError(true);
                  }
                  setPwBlured(true);
                }}
                label="[Optional] Grouping Password"
                maxLength={MAX_PASSWORD_LENGTH}
                minLength={MIN_PASSWORD_LENGTH}
                value={meta.password}
                onInput={(e) => {
                  setPasswordError(false);
                  const value = (e.target as HTMLInputElement).value ?? "";
                  if (
                    pwBlured && value.length > 0 &&
                    !validateGroupPassword(value)
                  ) {
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
            dashboard
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
          console.log("upload clicked", meta, file);
          if (
            (meta.name && !validateGroupName(meta.name)) ||
            (meta.password && !validateGroupPassword(meta.password))
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
            disabled={fileError || !file ||
              (groupingActive && (nameError || passwordError))}
          >
          </Button>
        </div>
      </form>
    </>
  );
}
