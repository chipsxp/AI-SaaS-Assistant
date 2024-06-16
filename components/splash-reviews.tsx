import { Card, CardFooter } from "./ui/card";
import { CardDescription } from "./ui/card";
import { CardTitle } from "./ui/card";
import { CardHeader } from "./ui/card";
import { CardContent } from "./ui/card";

const reviews = [
  {
    key: 11,
    name: "Jim B.",
    place: "St. Petersburg, FL",
    title: "Product Designer",
    review:
      "I love using the AI Assistant. It's so easy to use and has so many features. I can't recommend it enough!",
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
    name: "Jim B.",
    place: "St. Petersburg, FL",
    title: "Product Designer",
    review:
      "I love using the AI Assistant. It's so easy to use and has so many features. I can't recommend it enough!",
  },
  {
    key: 14,
    name: "James B.",
    place: "St. Petersburg, FL",
    title: "Product Tester",
    review: "App looks great and is very user-friendly. I love it!",
  },
];

const SplashReviews = () => {
  return (
    <div className="px10 pb-10">
      <h2 className="text-center text-4xl text-zinc-200 font-extrabold mb-10">
        What Our Clients Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((item) => (
          <Card
            key={item.name}
            className="border-blue-500 bg-[#2e2626] text-zinc-200"
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="text-zinc-400">
                {item.title}
              </CardDescription>
            </CardHeader>

            <CardContent>{item.review}</CardContent>
            <CardFooter className="text-zinc-400">{item.place}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SplashReviews;
