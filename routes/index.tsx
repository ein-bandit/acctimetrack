import Features from "../components/Features.tsx";
import BaseLayout from "../components/layout/BaseLayout.tsx";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <div class="flex content-center items-center">
          <div class="py-4 px-2">
            <img
              src="/logo.svg"
              alt="acc time track logo"
            />
          </div>

          <div class="flex content-center">
            <p class="">
              Welcome to acc time track
            </p>
          </div>
        </div>
        <Features></Features>
      </BaseLayout>
    </>
  );
}
