import { Head } from "https://deno.land/x/fresh@1.1.5/runtime.ts";
import Header from "../../islands/Header.tsx";
import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};
export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css"
        />
        <script src="https://cdn.tailwindcss.com/3.3.0"></script>
        <script>
        </script>
      </Head>
      <Header active="/"></Header>
      <div class="p-4 mx-auto max-w-screen-md">
        {children}
      </div>
    </>
  );
}
