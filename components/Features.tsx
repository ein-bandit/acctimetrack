import IconAlarm from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/alarm.tsx";
import IconAirBalloon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/air-balloon.tsx";
import IconArmchair from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/armchair.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import IconBrandOnedrive from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-onedrive.tsx";

interface FeatureItem {
  // deno-lint-ignore no-explicit-any
  icon: any;
  description: string;
  link?: string;
}

export default function Features() {
  const featureItems: FeatureItem[] = [
    {
      icon: IconAlarm,
      description: "Lap Times of your ACC sessions publicly available",
    },
    {
      icon: IconAirBalloon,
      description:
        "Automatic Leaderboard with Best Lap Times over multiple sessions",
    },
    {
      icon: IconArmchair,
      description: "Scripts for your server for automatic results upload",
    },
    {
      icon: IconBrandOnedrive,
      description: "Use cloud version or host yourself",
    },
  ];

  return (
    <div class="flex flex-col flex-row gap-8 bg-white pt-6">
      {featureItems.map((item) => {
        return (
          <div class="flex">
            <div class="flex-initial">
              <div class="bg-yellow-600 inline-block p-3 rounded-xl text-white">
                <item.icon class="w-8 h-8" />
              </div>
            </div>
            <p class="flex-1 ml-4 text-xl">
              {item.description}
            </p>

            {item.link &&
              (
                <a class="block" href={item.link}>
                  <p class="text-blue-500 cursor-pointer hover:underline inline-flex items-center group">
                    Read More{" "}
                    <IconChevronRight class="inline-block w-5 h-5 transition group-hover:translate-x-0.5" />
                  </p>
                </a>
              )}
          </div>
        );
      })}
    </div>
  );
}
