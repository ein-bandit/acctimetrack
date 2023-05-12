import { JSX } from "preact";

export default function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <div class="flex flex-col">
      <label
        for="basic-url"
        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {props.label}
      </label>
      <input
        {...props}
        disabled={props.disabled}
        class={`px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
          props.class ?? ""
        }`}
      />
    </div>
  );
}
