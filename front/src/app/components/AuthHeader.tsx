import Link from "next/link";

type AuthHeaderProps = {
  variant?: "light" | "dark";
};

const AuthHeader = ({ variant = "dark" }: AuthHeaderProps) => {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Back to Mailprex home"
    >
      <img
        className={`h-10 w-10 rounded-full border object-cover transition-transform duration-300 group-hover:scale-105 ${
          isLight ? "border-accent/30" : "border-primary/20"
        }`}
        src="https://mailprex.excelso.xyz/logo.webp"
        alt="Mailprex Logo"
      />
      <span className="hidden flex-col sm:flex">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
            isLight ? "text-accent/70" : "text-primary/60"
          }`}
        >
          Excelso
        </span>
        <span
          className={`-mt-0.5 text-base font-bold uppercase tracking-[0.08em] ${
            isLight ? "text-white" : "text-primary"
          }`}
        >
          Mailprex
        </span>
      </span>
    </Link>
  );
};

export default AuthHeader;
