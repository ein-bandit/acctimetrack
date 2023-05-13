import { DBSession } from "../services/process-upload.ts";
import SessionInfo from "./SessionInfo.tsx";
import SessionLink from "./SessionLink.tsx";

type Props = {
  data: DBSession[];
  type: "group" | "session";
  name: string;
};

export default function SessionOverview(
  { type, data, name }: Props,
) {
  const ids = data.map((session) => session.internalId);

  return (
    <div class="flex flex-col">
      <div class="flex justify-between">
        <div class="flex">
          <div class="pr-1">session {type === "group" ? "group" : null}</div>
          <div class="font-bold">{name}</div>
        </div>
        <div>
          {type === "group" && (
            <div>
              <span class="pr-1">Sessions IDs:</span>
              {ids.map((id) => <SessionLink id={id} />)}
            </div>
          )}
        </div>
      </div>
      <div class="flex flex-row">
        <SessionInfo type={type} data={data}></SessionInfo>
      </div>
    </div>
  );
}
