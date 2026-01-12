import Link from "next/link";
import { footerNavigation } from "@/lib/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-color.png"
                alt="Databender"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm">
              Boutique strategy. Enterprise delivery.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/databender"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Industries</h3>
            <ul className="space-y-3">
              {footerNavigation.industries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            &copy; {currentYear} Databender. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
