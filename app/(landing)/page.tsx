import Link from "next/link";
import { Button } from "@/components/ui/button";

const SplashPage = () => {
    return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Landing Splash Page AI Saas!
      </h1>
    <div>
        <Button asChild>
          <Link href="/sign-up">Register</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
      </div>
    </div>
    )
};

export default SplashPage;