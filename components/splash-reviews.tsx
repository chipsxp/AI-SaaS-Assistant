import { Card, CardFooter } from "./ui/card";
import { CardDescription } from "./ui/card";
import { CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardContent } from "./ui/card";

const reviews = [
  {
    key: 11,
    name: "Jimmy B.",
    place: "St. Petersburg, FL",
    title: "Product Developer",
    review:
      "I enjoy using the AI Assistant. It's so easy to use and has so many features. I can't recommend it enough!",
  },
  {
    key: 12,
    name: "James B.",
    place: "St. Petersburg, FL",
    title: "Product Tester",
    review: "App looks great and is very user-friendly. I love it!",
  },
  {
    key: 13,
    name: "Maxwell G.",
    place: "St. Petersburg, FL",
    title: "Product User",
    review:
      "It's simple to use the AI Assistant. It's a great tool for my business. Get free credits to start with!",
  },
  {
    key: 14,
    name: "Alexander N.",
    place: "St. Petersburg, FL",
    title: "Product User",
    review:
      "The AI Assistant has significantly improved my workflow. It's intuitive and packed with useful features.",
  },
];

const SplashReviews = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-center text-4xl text-zinc-200 font-extrabold mb-12">
        What Our Clients Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((item) => (
          <Card
            key={item.name}
            className="border-blue-500 bg-[#2e2626] text-zinc-200 transform transition-transform hover:scale-105 shadow-lg"
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="text-zinc-400">
                {item.title}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">{item.review}</CardContent>
            <CardFooter className="text-zinc-400 pt-2">{item.place}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SplashReviews;
