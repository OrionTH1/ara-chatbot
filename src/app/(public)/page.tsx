import Image from "next/image";
import Link from "next/link";

function LandingPage() {
  return (
    <main className="min-h-svh flex flex-col">
      <section id="hero" className="flex">
        <div className="flex flex-col items-center lg:items-start flex-1 px-4 lg:pl-20 pt-28 pb-8 ">
          <div className="flex flex-col items-center text-center lg:text-start lg:items-start gap-4 mb-6">
            <h1 className="heading-1">Conheça a Ara</h1>
            <p className="text-1">
              A inteligência artificial, torcedora da FURIA
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/chat"
              className="flex justify-center items-center heading-3 bg-brand text-primary-foreground hover:bg-brand/90 h-11 px-5 py-4 rounded-md transition-all"
            >
              Testar agora
            </Link>
            <Link
              href={"#about"}
              className="flex justify-center items-center heading-3 border-2 border-brand bg-transparent hover:bg-brand/90 hover:border-brand/90 h-11 px-5 py-4 rounded-md transition-all "
            >
              Sobre
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
        <h2 className="heading-1 mb-4">Sobre a Ara</h2>
        <p className="text-1 w-fit lg:w-152 text-center lg:text-start">
          Salve, Torcedor! A Ara, é uma inteligência artificial, torcedora da
          FURIA, pronta para tirar todas as suas dúvidas sobre história,
          modalidades, estatísticas e curiosidades desta organização Brasileira
          de E-Sports que já trouxe tantas felicidades para o Brasileiro
        </p>
      </section>
    </main>
  );
}

export default LandingPage;
