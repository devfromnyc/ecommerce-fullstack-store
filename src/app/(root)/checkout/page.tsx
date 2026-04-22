"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore, type SavedCheckoutDraft } from "@/store/checkout";
import { getPaymentGateway } from "@/lib/payments/gateway";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

type Step = 1 | 2 | 3 | 4;

type PaymentForm = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type CheckoutErrors = Partial<Record<string, string>>;

const SHIPPING_COSTS: Record<SavedCheckoutDraft["shippingMethod"], number> = {
  standard: 4.99,
  express: 12.99,
};

function normalizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

function validateInformation(draft: SavedCheckoutDraft): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.contact.email);
  const phoneDigits = normalizeDigits(draft.contact.phone);

  if (!emailValid) errors.email = "Please enter a valid email address.";
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Phone number must be 10 to 15 digits.";
  }

  return errors;
}

function validateShipping(draft: SavedCheckoutDraft): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const address = draft.shippingAddress;
  const postalValid = /^[A-Za-z0-9 -]{4,10}$/.test(address.postalCode.trim());

  if (address.firstName.trim().length < 2) errors.firstName = "First name is required.";
  if (address.lastName.trim().length < 2) errors.lastName = "Last name is required.";
  if (address.address1.trim().length < 5) errors.address1 = "Enter a valid street address.";
  if (address.city.trim().length < 2) errors.city = "City is required.";
  if (address.region.trim().length < 2) errors.region = "State/Region is required.";
  if (!postalValid) errors.postalCode = "Enter a valid postal code.";
  if (address.country.trim().length < 2) errors.country = "Country is required.";

  return errors;
}

function validatePayment(payment: PaymentForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const cardDigits = normalizeDigits(payment.cardNumber);
  const cvvDigits = normalizeDigits(payment.cvv);
  const expiryMatch = payment.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

  if (payment.cardholderName.trim().length < 2) {
    errors.cardholderName = "Cardholder name is required.";
  }
  if (cardDigits.length !== 16) {
    errors.cardNumber = "Card number must be exactly 16 digits.";
  }
  if (!expiryMatch) {
    errors.expiry = "Expiration must be in MM/YY format.";
  } else {
    const month = Number(expiryMatch[1]);
    const year = Number(`20${expiryMatch[2]}`);
    const now = new Date();
    const expiresAt = new Date(year, month, 0, 23, 59, 59, 999);
    if (expiresAt < now) errors.expiry = "Card expiration date is in the past.";
  }
  if (cvvDigits.length < 3 || cvvDigits.length > 4) {
    errors.cvv = "CVV must be 3 or 4 digits.";
  }

  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const clearCart = useCartStore((s) => s.clearCart);

  const draft = useCheckoutStore((s) => s.draft);
  const setDraft = useCheckoutStore((s) => s.setDraft);
  const addOrder = useCheckoutStore((s) => s.addOrder);
  const resetDraft = useCheckoutStore((s) => s.resetDraft);

  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState<PaymentForm>({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shippingCost = SHIPPING_COSTS[draft.shippingMethod];
  const tax = useMemo(() => total * 0.08, [total]);
  const grandTotal = useMemo(() => total + shippingCost + tax, [total, shippingCost, tax]);

  const updateContact = (key: keyof SavedCheckoutDraft["contact"], value: string) => {
    setDraft({ contact: { [key]: value } as Partial<SavedCheckoutDraft["contact"]> });
  };

  const updateShipping = (key: keyof SavedCheckoutDraft["shippingAddress"], value: string) => {
    setDraft({
      shippingAddress: { [key]: value } as Partial<SavedCheckoutDraft["shippingAddress"]>,
    });
  };

  const goNext = () => {
    const validationErrors =
      step === 1
        ? validateInformation(draft)
        : step === 2
        ? validateShipping(draft)
        : step === 3
        ? validatePayment(payment)
        : {};

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  };

  const submitOrder = async () => {
    const paymentErrors = validatePayment(payment);
    if (Object.keys(paymentErrors).length > 0) {
      setErrors(paymentErrors);
      setStep(3);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      const gateway = getPaymentGateway();
      const result = await gateway.authorizeCard({
        cardholderName: payment.cardholderName,
        cardNumber: payment.cardNumber,
        expiry: payment.expiry,
        cvv: payment.cvv,
        amount: grandTotal,
        currency: "USD",
      });

      if (!result.success) {
        setSubmitError(result.error ?? "Payment could not be authorized.");
        return;
      }

      const orderId = crypto.randomUUID();
      const orderNumber = `#${new Date().getFullYear()}${Math.floor(Math.random() * 900000 + 100000)}`;

      addOrder({
        id: orderId,
        orderNumber,
        createdAt: new Date().toISOString(),
        status: "confirmed",
        items,
        subtotal: total,
        shippingCost,
        tax,
        total: grandTotal,
        contact: draft.contact,
        shippingAddress: draft.shippingAddress,
        payment: {
          method: "card",
          transactionId: result.transactionId,
          last4: result.last4,
        },
      });

      clearCart();
      resetDraft();
      router.push(`/checkout/thank-you/${orderId}`);
    } catch (_err) {
      setSubmitError("Something went wrong while placing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-heading-2 text-dark-900">Checkout</h1>
        <p className="mt-2 text-body text-dark-700">
          Shopify-style flow for demo purposes. Payment is processed by a local mock gateway.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-light-300 bg-light-100 p-6">
          <p className="text-body text-dark-700">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-full bg-dark-900 px-5 py-2 text-body-medium text-light-100"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-xl border border-light-300 bg-light-100 p-6">
            <ol className="mb-6 flex items-center gap-3 text-caption text-dark-700">
              {[
                { id: 1, label: "Information" },
                { id: 2, label: "Shipping" },
                { id: 3, label: "Payment" },
                { id: 4, label: "Review" },
              ].map((entry) => (
                <li key={entry.id} className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                      step >= entry.id
                        ? "border-dark-900 bg-dark-900 text-light-100"
                        : "border-light-300 text-dark-700"
                    }`}
                  >
                    {entry.id}
                  </span>
                  <span className="hidden sm:inline">{entry.label}</span>
                </li>
              ))}
            </ol>

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-heading-3 text-dark-900">Contact Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Email</span>
                    <input
                      value={draft.contact.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="you@example.com"
                    />
                    {errors.email ? <p className="text-caption text-red-600">{errors.email}</p> : null}
                  </label>
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Phone Number</span>
                    <input
                      value={draft.contact.phone}
                      onChange={(e) => updateContact("phone", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="+1 (555) 555-1234"
                    />
                    {errors.phone ? <p className="text-caption text-red-600">{errors.phone}</p> : null}
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-heading-3 text-dark-900">Shipping Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">First Name</span>
                    <input
                      value={draft.shippingAddress.firstName}
                      onChange={(e) => updateShipping("firstName", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.firstName ? <p className="text-caption text-red-600">{errors.firstName}</p> : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">Last Name</span>
                    <input
                      value={draft.shippingAddress.lastName}
                      onChange={(e) => updateShipping("lastName", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.lastName ? <p className="text-caption text-red-600">{errors.lastName}</p> : null}
                  </label>
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Address</span>
                    <input
                      value={draft.shippingAddress.address1}
                      onChange={(e) => updateShipping("address1", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.address1 ? <p className="text-caption text-red-600">{errors.address1}</p> : null}
                  </label>
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Apartment, suite, etc. (optional)</span>
                    <input
                      value={draft.shippingAddress.address2}
                      onChange={(e) => updateShipping("address2", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">City</span>
                    <input
                      value={draft.shippingAddress.city}
                      onChange={(e) => updateShipping("city", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.city ? <p className="text-caption text-red-600">{errors.city}</p> : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">State / Region</span>
                    <input
                      value={draft.shippingAddress.region}
                      onChange={(e) => updateShipping("region", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.region ? <p className="text-caption text-red-600">{errors.region}</p> : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">Postal Code</span>
                    <input
                      value={draft.shippingAddress.postalCode}
                      onChange={(e) => updateShipping("postalCode", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.postalCode ? <p className="text-caption text-red-600">{errors.postalCode}</p> : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">Country</span>
                    <input
                      value={draft.shippingAddress.country}
                      onChange={(e) => updateShipping("country", e.target.value)}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                    />
                    {errors.country ? <p className="text-caption text-red-600">{errors.country}</p> : null}
                  </label>
                </div>

                <div className="space-y-2 rounded-lg border border-light-300 p-4">
                  <p className="text-body-medium text-dark-900">Shipping Method</p>
                  <label className="flex items-center justify-between gap-3 rounded-md border border-light-300 p-3">
                    <span className="text-body text-dark-900">Standard (3-5 business days)</span>
                    <div className="flex items-center gap-3">
                      <span className="text-body text-dark-900">{formatPrice(SHIPPING_COSTS.standard)}</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={draft.shippingMethod === "standard"}
                        onChange={() => setDraft({ shippingMethod: "standard" })}
                      />
                    </div>
                  </label>
                  <label className="flex items-center justify-between gap-3 rounded-md border border-light-300 p-3">
                    <span className="text-body text-dark-900">Express (1-2 business days)</span>
                    <div className="flex items-center gap-3">
                      <span className="text-body text-dark-900">{formatPrice(SHIPPING_COSTS.express)}</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={draft.shippingMethod === "express"}
                        onChange={() => setDraft({ shippingMethod: "express" })}
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-heading-3 text-dark-900">Payment</h2>
                <p className="text-body text-dark-700">
                  Secure card payment (demo mode). This architecture is ready for Stripe later.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Cardholder Name</span>
                    <input
                      value={payment.cardholderName}
                      onChange={(e) =>
                        setPayment((prev) => ({ ...prev, cardholderName: e.target.value }))
                      }
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="Name on card"
                    />
                    {errors.cardholderName ? (
                      <p className="text-caption text-red-600">{errors.cardholderName}</p>
                    ) : null}
                  </label>
                  <label className="space-y-1 sm:col-span-2">
                    <span className="text-caption text-dark-700">Card Number</span>
                    <input
                      inputMode="numeric"
                      maxLength={19}
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment((prev) => ({ ...prev, cardNumber: e.target.value }))
                      }
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber ? (
                      <p className="text-caption text-red-600">{errors.cardNumber}</p>
                    ) : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">Expiration (MM/YY)</span>
                    <input
                      value={payment.expiry}
                      onChange={(e) => setPayment((prev) => ({ ...prev, expiry: e.target.value }))}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="MM/YY"
                    />
                    {errors.expiry ? <p className="text-caption text-red-600">{errors.expiry}</p> : null}
                  </label>
                  <label className="space-y-1">
                    <span className="text-caption text-dark-700">Security Code</span>
                    <input
                      inputMode="numeric"
                      maxLength={4}
                      value={payment.cvv}
                      onChange={(e) => setPayment((prev) => ({ ...prev, cvv: e.target.value }))}
                      className="w-full rounded-lg border border-light-300 px-3 py-2"
                      placeholder="CVV"
                    />
                    {errors.cvv ? <p className="text-caption text-red-600">{errors.cvv}</p> : null}
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-heading-3 text-dark-900">Review & Place Order</h2>
                <div className="space-y-3 rounded-lg border border-light-300 p-4">
                  <p className="text-body-medium text-dark-900">Contact</p>
                  <p className="text-body text-dark-700">{draft.contact.email}</p>
                  <p className="text-body text-dark-700">{draft.contact.phone}</p>
                </div>
                <div className="space-y-3 rounded-lg border border-light-300 p-4">
                  <p className="text-body-medium text-dark-900">Shipping</p>
                  <p className="text-body text-dark-700">
                    {draft.shippingAddress.firstName} {draft.shippingAddress.lastName}
                  </p>
                  <p className="text-body text-dark-700">
                    {draft.shippingAddress.address1}
                    {draft.shippingAddress.address2 ? `, ${draft.shippingAddress.address2}` : ""}
                  </p>
                  <p className="text-body text-dark-700">
                    {draft.shippingAddress.city}, {draft.shippingAddress.region}{" "}
                    {draft.shippingAddress.postalCode}
                  </p>
                  <p className="text-body text-dark-700">{draft.shippingAddress.country}</p>
                </div>
                <div className="space-y-3 rounded-lg border border-light-300 p-4">
                  <p className="text-body-medium text-dark-900">Payment</p>
                  <p className="text-body text-dark-700">
                    Card ending in {normalizeDigits(payment.cardNumber).slice(-4) || "----"}
                  </p>
                </div>
                {submitError ? <p className="text-caption text-red-600">{submitError}</p> : null}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || submitting}
                className="rounded-full border border-light-300 px-5 py-2 text-body-medium text-dark-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-dark-900 px-6 py-2 text-body-medium text-light-100 hover:bg-dark-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={submitting}
                  className="rounded-full bg-dark-900 px-6 py-2 text-body-medium text-light-100 hover:bg-dark-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-light-300 bg-light-100 p-6 lg:sticky lg:top-6">
            <h2 className="text-heading-3 text-dark-900">Order Summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 text-body">
                  <div>
                    <p className="text-dark-900">{item.name}</p>
                    <p className="text-caption text-dark-700">Qty {item.quantity}</p>
                  </div>
                  <span className="text-dark-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-light-300 pt-4 text-body">
              <div className="flex items-center justify-between text-dark-700">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between text-dark-700">
                <span>Shipping</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex items-center justify-between text-dark-700">
                <span>Estimated tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-light-300 pt-3 text-body-medium text-dark-900">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
