import Image from "next/image";
import { TrialCounter } from "./trial-counter";

const loader = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-10 h-10 animate-spin rounded-full">
        <Image src="/logo.png" fill={true} alt="loader" />
      </div>
      <p className="text-center text-sm text-muted-foreground font-light">
        AI Assistant is thinking...
      </p>
    </div>
  );
};

export default loader;
