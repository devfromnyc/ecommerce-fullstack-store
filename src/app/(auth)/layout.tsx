import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left panel — brand showcase (hidden on mobile) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between bg-dark-900 p-10">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Nike"
            width={80}
            height={29}
            priority
          />
        </Link>

        {/* Hero text */}
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-2 font-bold text-light-100">
            Just Do It
          </h2>
          <p className="max-w-md text-lead text-dark-500">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>

          {/* Carousel dots (decorative) */}
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-light-100" />
            <span className="h-2.5 w-2.5 rounded-full bg-dark-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-dark-700" />
          </div>
        </div>

        {/* Footer */}
        <p className="text-footnote text-dark-500">
          &copy; {new Date().getFullYear()} Nike. All rights reserved.
        </p>
      </div>

      {/* Right panel — auth form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-light-100 px-6 py-10 lg:w-1/2 lg:px-16">
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo-dark.svg"
              alt="Nike"
              width={64}
              height={23}
              priority
            />
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
