import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-light-300 bg-light-100 p-8">
        <p className="text-caption uppercase tracking-wide text-dark-700">Contact Nike Store</p>
        <h1 className="mt-2 text-heading-2 text-dark-900">We&apos;re Here To Help</h1>
        <p className="mt-4 max-w-2xl text-body text-dark-700">
          Need help with orders, delivery, returns, or product questions? Reach out to our
          support team and we&apos;ll get back to you as quickly as possible.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-light-300 bg-light-100 p-6">
          <h2 className="text-heading-3 text-dark-900">Customer Support</h2>
          <ul className="mt-4 space-y-2 text-body text-dark-700">
            <li>Phone: +1 (212) 555-0147</li>
            <li>Email: support@nikestore-example.com</li>
            <li>Hours: Mon-Sat, 8:00 AM - 8:00 PM EST</li>
          </ul>
        </article>

        <article className="rounded-xl border border-light-300 bg-light-100 p-6">
          <h2 className="text-heading-3 text-dark-900">Flagship Office</h2>
          <p className="mt-4 text-body text-dark-700">
            Nike Store NYC
            <br />
            475 Broadway
            <br />
            New York, NY 10013
          </p>
          <p className="mt-4 text-caption text-dark-700">
            Looking for returns? Start with our returns portal to generate your label in minutes.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-light-300 bg-light-100 p-6">
        <h2 className="text-heading-3 text-dark-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100 hover:bg-dark-700"
          >
            Shop Products
          </Link>
          <a
            href="mailto:support@nikestore-example.com"
            className="rounded-full border border-light-300 px-5 py-2 text-body-medium text-dark-900 hover:border-dark-700"
          >
            Email Support
          </a>
        </div>
      </section>
    </main>
  );
}
