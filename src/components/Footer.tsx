import Image from "next/image";
import Link from "next/link";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Featured",
    links: [
      { label: "Air Force 1", href: "#" },
      { label: "Huarache", href: "#" },
      { label: "Air Max 90", href: "#" },
      { label: "Air Max 95", href: "#" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { label: "All Shoes", href: "#" },
      { label: "Custom Shoes", href: "#" },
      { label: "Jordan Shoes", href: "#" },
      { label: "Running Shoes", href: "#" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { label: "All Clothing", href: "#" },
      { label: "Modest Wear", href: "#" },
      { label: "Hoodies & Pullovers", href: "#" },
      { label: "Shirts & Tops", href: "#" },
    ],
  },
  {
    title: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "#" },
      { label: "Kids' Shoes", href: "#" },
      { label: "Kids' Jordan Shoes", href: "#" },
      { label: "Kids' Basketball Shoes", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: "/x.svg", alt: "X (Twitter)", href: "#" },
  { icon: "/facebook.svg", alt: "Facebook", href: "#" },
  { icon: "/instagram.svg", alt: "Instagram", href: "#" },
];

const bottomLinks = [
  { label: "Guides", href: "#" },
  { label: "Terms of Sale", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Nike Privacy Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-dark-900 text-light-100">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={80}
                height={29}
              />
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-body-medium font-medium text-light-100 mb-4">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-caption text-dark-500 hover:text-light-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-start gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.alt}
                href={social.href}
                aria-label={social.alt}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-70 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={18}
                  height={18}
                  className="invert"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700/30">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          {/* Left side */}
          <div className="flex flex-wrap items-center gap-2 text-footnote text-dark-500">
            <span className="flex items-center gap-1">
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 16 6 16C6 16 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z"
                  fill="currentColor"
                />
              </svg>
              Croatia
            </span>
            <span>© 2025 Nike, Inc. All Rights Reserved</span>
          </div>

          {/* Right side links */}
          <ul className="flex flex-wrap items-center gap-6">
            {bottomLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-footnote text-dark-500 hover:text-light-100 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
