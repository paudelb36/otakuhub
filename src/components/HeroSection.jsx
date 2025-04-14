import Image from "next/image";
import Button from "./ui/Button";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-purple-500 to-white ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Ultimate Anime Companion
              </h1>
              <p className="max-w-[600px] text-gray-800 md:text-xl dark:text-black">
                Track, discover, and manage your anime journey with OtakuHub.
                Get personalized recommendations and never lose track of what
                you're watching.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/onepiece.webp"
                alt="OtakuHub App Screenshot"
                width={800}
                height={800}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
