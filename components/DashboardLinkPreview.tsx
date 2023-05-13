import { cleanName } from "../services/data-helper.ts";

type Props = {
  name: string;
};

export default function DashboardLinkPreview(props: Props) {
  return (
    <div class="pt-1">
      <span class="pr-1" style="white-space: nowrap;">link preview:</span>
      <div style="width: max-content; display: inline-block;">
        <span style="white-space: nowrap;">
          https://acctimetrack.herokuapp.com/{cleanName(props.name)}
        </span>
      </div>
    </div>
  );
}
