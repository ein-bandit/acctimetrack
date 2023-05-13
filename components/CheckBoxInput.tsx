import { JSX } from "preact";

type InputProps = JSX.HTMLAttributes<HTMLInputElement> & {
  checked: boolean;
};
export default function CheckBoxInput(props: InputProps) {
  return (
    <div class="flex mt-4">
      <input
        id="cb"
        name="cb"
        type="checkbox"
        {...props}
        disabled={props.disabled}
        class={`px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
          props.class ?? ""
        }`}
      />
      <label
        for="cb"
        class="ml-3 inline-block text-neutral-700 dark:text-neutral-200"
      >
        {props.label}
      </label>
    </div>
  );
}
