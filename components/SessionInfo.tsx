import {
  getMultiSessionCols,
  getSingleSessionCols,
} from "../services/data-preparation.ts";
import { DBSession } from "../services/process-upload.ts";

type Props = {
  data: DBSession[];
  type: "group" | "session";
};

export default function SessionInfo({ data, type }: Props) {
  let cols: [string, string][] = [];

  if (type === "session" || data.length === 1) {
    cols = getSingleSessionCols(data);
  } else if (type === "group") {
    cols = getMultiSessionCols(data);
  }

  return (
    <div class="grid grid-cols-5 gap-4">
      {cols.map((col) => {
        return (
          <div class="p-4">
            <div>{col[0]}</div>
            <div class="font-bold">{col[1]}</div>
          </div>
        );
      })}
    </div>
  );
}
