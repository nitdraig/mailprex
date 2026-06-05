import { FaGithub, FaLinkedin, FaNpm } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import Terms from "./Terms";

const FOOTER_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/avellaneda-agustín-tns/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://www.github.com/nitdraig",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://docs.mailprex.excelso.xyz",
    label: "Documentation",
    icon: IoDocumentTextSharp,
  },
  {
    href: "https://www.npmjs.com/package/usemailprex-react",
    label: "NPM package",
    icon: FaNpm,
  },
] as const;

const Footer = () => {
  return (
    <footer className="relative z-10 py-4 px-4 pb-6 pt-2 sm:px-6 bg-primary mx-auto">
      <div className=" relative   overflow-hidden ">
        <div aria-hidden className="postal-route-line" />

        <div className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-accent/10 blur-lg"
                />
                <img
                  src="/logo.png"
                  alt="Mailprex Logo"
                  className="relative h-14 w-14 rounded-full border border-accent/25 object-cover float"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="postal-eyebrow mb-1">Excelso</p>
                <p className="text-lg font-bold uppercase tracking-[0.08em] text-white">
                  Mailprex
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-accent/85">
                  Your definitive solution for sending email from the web.
                </p>
              </div>
            </div>

            <nav
              aria-label="Footer navigation"
              className="hidden flex-wrap justify-center gap-x-8 gap-y-3 lg:flex"
            >
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-semibold uppercase tracking-[0.12em] text-accent/85 transition-colors hover:text-white"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
                  />
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 border-t border-accent/20 pt-6">
            <div className="mb-5 flex flex-wrap justify-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-white/5 text-xl text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-accent/80">
                &copy; {new Date().getFullYear()} Mailprex. All rights reserved.
              </p>
              <Terms />
              <p className="text-sm text-accent/90">Powered by <a href="https://excelso.xyz" target="_blank" rel="noreferrer" className="text-accent/80 hover:text-white">Excelso</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
