import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="postal-mesh-bg relative min-h-[calc(100dvh-5.5rem)] w-full overflow-hidden text-white"
      id="home"
    >
      <div aria-hidden className="postal-grid-overlay absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-16 h-56 w-56 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-5.5rem)] max-w-7xl flex-col items-center px-6 py-16 md:flex-row md:items-center md:gap-10 md:px-10 lg:px-16 lg:py-20">
        <div className="flex w-full justify-center md:hidden">
          <img
            src="/email-bg.svg"
            alt="Mailprex illustration"
            className="float w-full max-w-sm"
            loading="lazy"
          />
        </div>

        <div className="w-full text-center md:w-1/2 md:text-left">
          <p className="postal-eyebrow postal-stagger-1 mb-4 text-accent/80">
            API · Forms · Email
          </p>
          <h1 className="postal-stagger-2 mb-6 text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] lg:text-7xl">
            Mailprex
          </h1>
          <p className="postal-stagger-3 mx-auto mb-10 max-w-xl text-lg leading-relaxed text-accent/90 md:mx-0 md:text-xl">
            We take care of making it easier for you to send forms from your
            website. Import the hook, add the data and{" "}
            <span className="font-bold text-2xl color-changing-text">voilà!</span>{" "}
            Direct to your email.
          </p>
          <div className="postal-stagger-4 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Link href="/login" className="postal-btn-primary w-full sm:w-auto">
              Get Started
            </Link>
            <a
              href="https://docs.mailprex.excelso.xyz"
              target="_blank"
              rel="noreferrer"
              className="postal-btn-ghost w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative hidden w-full justify-center md:flex md:w-1/2">
          <div
            aria-hidden
            className="absolute inset-6 rounded-3xl border border-accent/20 bg-white/5 backdrop-blur-sm"
          />
          <img
            src="/email-bg.svg"
            alt="Mailprex illustration"
            className="float relative z-10 w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
