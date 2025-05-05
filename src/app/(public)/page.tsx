import Image from "next/image";
import Link from "next/link";

function LandingPage() {
  return (
    <main className="min-h-svh flex flex-col">
      <section id="hero" className="flex">
        <div className="flex flex-col items-center lg:items-start flex-1 px-4 lg:pl-20 pt-28 pb-8 ">
          <div className="flex flex-col items-center text-center lg:text-start lg:items-start gap-4 mb-6">
            <h1 className="heading-1">Meet the Luna</h1>
            <p className="text-1">The Artificial Intelligence and Furia Fan</p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/chat"
              className="flex justify-center items-center heading-3 bg-brand text-primary-foreground hover:bg-brand/90 h-11 px-5 py-4 rounded-md transition-all"
            >
              Test now
            </Link>
            <Link
              href={"#about"}
              className="flex justify-center items-center heading-3 border-2 border-brand bg-transparent hover:bg-brand/90 hover:border-brand/90 h-11 px-5 py-4 rounded-md transition-all "
            >
              About
            </Link>
          </div>
        </div>

        <div className="flex-1 hidden lg:block">
          <Image
            src={"/assets/images/crowd.jpg"}
            width="1400"
            height="1000"
            alt="Furia Crowd"
            className="w-full h-full"
          />
        </div>
      </section>

      <section
        id="about"
        className="flex flex-1 items-center lg:items-start flex-col px-8 lg:pl-20 pt-12 pb-8 bg-secondary-background "
      >
        <h2 className="heading-1 mb-4">About Luna</h2>
        <p className="text-1 w-fit lg:w-152 text-center lg:text-start">
          Hey, Fan! Luna is an artificial intelligence and a proud FURIA
          supporter, ready to answer all your questions about the team&apos;s
          history, game modes, stats, and fun facts. Get to know this Brazilian
          eSports organization that has brought so much joy to fans across the
          country!
        </p>
      </section>
    </main>
  );
}

export default LandingPage;
