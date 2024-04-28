"use client";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { FC, useState } from "react";
import axios from "axios";
import { boolean } from "zod";

interface SubscribeUserProps {
  isPro: boolean;
}

export const SubscribeUser: FC<SubscribeUserProps> = ({ isPro = boolean }) => {
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      className="w-1/3"
      onClick={onSubscribe}
    >
      {isPro ? "Upgrade to Pro" : "Manage Subscription"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-sky-700" />}
    </Button>
  );
};
