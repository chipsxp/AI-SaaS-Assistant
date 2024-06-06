"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";

interface SubscribeUserProps {
  isPro: boolean;
}

export const SubscribeUser = ({ isPro = false }: SubscribeUserProps) => {
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "STRIPE_BILLING_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={isPro ? "premium" : "default"}
      className="w-1/3"
      onClick={onSubscribe}
    >
      {isPro ? "Mangage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
