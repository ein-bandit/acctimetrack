import { fmt } from "../services/data-helper.ts";
import { LapTimeResult } from "../services/types.d.ts";
import SessionLink from "./SessionLink.tsx";

export interface UIResult {
  driver: string;
  session: number;
  lap: LapTimeResult;
}

type Props = {
  results: UIResult[];
};

export default function TimeTable(props: Props) {
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Laptime</th>
                  <th scope="col" class="px-6 py-4">S1</th>
                  <th scope="col" class="px-6 py-4">S2</th>
                  <th scope="col" class="px-6 py-4">S3</th>
                  <th scope="col" class="px-6 py-4">Session</th>
                </tr>
              </thead>
              <tbody>
                {props.results.map((result) => {
                  return (
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {result.driver}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {fmt(result.lap.lap)}
                      </td>
                      {result.lap.splits.map((split) => {
                        return (
                          <td class="whitespace-nowrap px-6 py-4">
                            {fmt(split)}
                          </td>
                        );
                      })}
                      <td class="whitespace-nowrap px-6 py-4">
                        <SessionLink id={result.session}></SessionLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
