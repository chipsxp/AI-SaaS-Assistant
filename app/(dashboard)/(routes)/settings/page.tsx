import { Heading } from "@/components/heading";
import { SubscribeUser } from "@/components/subscribe-user";
import { validSubscribe } from "@/lib/validsubscribe";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await validSubscribe();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your settings"
        icon={Settings}
        iconColor="text-sky-700"
        iconBgColor="bg-sky-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are on Pro Subscription"
            : "You are on Free Subscription"}
        </div>
        <SubscribeUser isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
