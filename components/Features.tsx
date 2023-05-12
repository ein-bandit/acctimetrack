import IconAlarm from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/alarm.tsx";
import IconAirBalloon from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/air-balloon.tsx";
import IconArmchair from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/armchair.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

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
      description: "Laps Times of your ACC sessions publicly available",
    },
    {
      icon: IconAirBalloon,
      description:
        "Automatic Leaderboard with Best Lap Times over multiple sessions",
    },
    {
      icon: IconArmchair,
      description: "Scripts for your server for automatic upload",
    },
  ];

  return (
    <div class="flex flex-col md:flex-row gap-8 bg-white p-8">
      {featureItems.map((item) => {
        return (
          <div class="flex">
            <div class="flex-initial">
              <div class="bg-blue-600 inline-block p-3 rounded-xl text-white">
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
