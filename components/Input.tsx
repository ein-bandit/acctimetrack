import { JSX } from "preact";

type InputProps = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};
export default function Input(props: InputProps) {
  return (
    <div class="flex flex-col">
      <label
        style={props.error ? "color: red" : ""}
        for="basic-url"
        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {props.label}
      </label>
      <input
        style={props.error ? "border-color: red" : ""}
        {...props}
        disabled={props.disabled}
        class={`px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
          props.class ?? ""
        }`}
      />
    </div>
  );
}
