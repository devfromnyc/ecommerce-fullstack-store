export type CardPaymentInput = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
  amount: number;
  currency: "USD";
};

export type CardPaymentResult = {
  success: boolean;
  transactionId: string;
  last4: string;
  error?: string;
};

export interface PaymentGateway {
  authorizeCard(input: CardPaymentInput): Promise<CardPaymentResult>;
}

const mockGateway: PaymentGateway = {
  async authorizeCard(input) {
    const digits = input.cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) {
      return {
        success: false,
        transactionId: "",
        last4: "",
        error: "Card number is invalid.",
      };
    }

    return {
      success: true,
      transactionId: `mock_txn_${crypto.randomUUID().slice(0, 12)}`,
      last4: digits.slice(-4),
    };
  },
};

// Keep this factory so Stripe can be dropped in later.
export function getPaymentGateway(): PaymentGateway {
  return mockGateway;
}
