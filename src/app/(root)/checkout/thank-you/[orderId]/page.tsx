"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function ThankYouPage() {
  const params = useParams<{ orderId: string }>();
  const order = useCheckoutStore((s) => s.getOrderById(params.orderId));

  if (!order) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-light-300 bg-light-100 p-6">
          <h1 className="text-heading-3 text-dark-900">Order not found</h1>
          <p className="mt-2 text-body text-dark-700">
            We could not find this order in your local checkout history.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-light-300 bg-light-100 p-6">
        <p className="text-caption uppercase tracking-wide text-dark-700">Thank You</p>
        <h1 className="mt-2 text-heading-2 text-dark-900">Your order is confirmed</h1>
        <p className="mt-3 text-body text-dark-700">
          {order.orderNumber} placed on {new Date(order.createdAt).toLocaleString()}.
        </p>
        <div className="mt-4 inline-flex rounded-full border border-green-700 bg-green-50 px-3 py-1 text-caption text-green-800">
          Status: {order.status}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-light-300 bg-light-100 p-6">
          <h2 className="text-heading-3 text-dark-900">Shipping Details</h2>
          <p className="mt-3 text-body text-dark-700">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="text-body text-dark-700">
            {order.shippingAddress.address1}
            {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ""}
          </p>
          <p className="text-body text-dark-700">
            {order.shippingAddress.city}, {order.shippingAddress.region}{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p className="text-body text-dark-700">{order.shippingAddress.country}</p>
          <p className="mt-4 text-caption text-dark-700">Contact: {order.contact.email}</p>
          <p className="text-caption text-dark-700">Phone: {order.contact.phone}</p>
        </article>

        <article className="rounded-xl border border-light-300 bg-light-100 p-6">
          <h2 className="text-heading-3 text-dark-900">Payment Summary</h2>
          <p className="mt-3 text-body text-dark-700">Card ending in {order.payment.last4}</p>
          <p className="text-caption text-dark-700">Transaction: {order.payment.transactionId}</p>

          <div className="mt-5 space-y-2 border-t border-light-300 pt-4">
            <div className="flex items-center justify-between text-body text-dark-700">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-body text-dark-700">
              <span>Shipping</span>
              <span>{formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex items-center justify-between text-body text-dark-700">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-light-300 pt-2 text-body-medium text-dark-900">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-xl border border-light-300 bg-light-100 p-6">
        <h2 className="text-heading-3 text-dark-900">Items</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-body">
              <span className="text-dark-900">
                {item.name} x {item.quantity}
              </span>
              <span className="text-dark-900">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100"
        >
          Continue Shopping
        </Link>
        <Link
          href="/checkout"
          className="rounded-full border border-light-300 px-5 py-2 text-body-medium text-dark-900"
        >
          Start New Checkout
        </Link>
      </div>
    </main>
  );
}
