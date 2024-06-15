"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const SupportChat = () => {
  useEffect(() => {
    Crisp.configure("2101b95d-2726-4ee2-bddf-d0461e68b600");
  }, []);
  return <></>;
};
