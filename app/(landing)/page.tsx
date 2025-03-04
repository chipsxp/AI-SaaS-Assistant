import { SplashNavbar } from "@/components/splash-navbar";
import { SplashHero } from "@/components/splash-hero";
import SplashReviews from "@/components/splash-reviews";
const SplashPage = () => {
  return (
    <div className="flex flex-col items-center mt-8 justify-evenly min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 text-zinc-200 w-full">
        One Great Office Assistant Services is Coming Our Way!
      </h1>
      <SplashNavbar />
      <SplashHero />
      <SplashReviews />
    </div>
  );
};

export default SplashPage;
