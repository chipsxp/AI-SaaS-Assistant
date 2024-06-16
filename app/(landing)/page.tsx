import { SplashNavbar } from "@/components/splash-navbar";
import { SplashHero } from "@/components/splash-hero";
import SplashReviews from "@/components/splash-reviews";
const SplashPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold justify-evenly text-zinc-200">
        One Great Office Service is Coming Our Way!
      </h1>
      <SplashNavbar />
      <SplashHero />
      <SplashReviews />
    </div>
  );
};

export default SplashPage;
