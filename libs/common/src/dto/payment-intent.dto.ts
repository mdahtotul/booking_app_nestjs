import Stripe from 'stripe';

export class PaymentIntentDto {
  id: string;
  object: 'payment_intent';
  amount: number;
  amount_capturable: number;
  amount_details?: Stripe.PaymentIntent.AmountDetails | undefined;
  amount_received: number;
  application: string | Stripe.Application | null;
  application_fee_amount: number | null;
  automatic_payment_methods: Stripe.PaymentIntent.AutomaticPaymentMethods | null;
  canceled_at: number | null;
  cancellation_reason: Stripe.PaymentIntent.CancellationReason | null;
  capture_method: Stripe.PaymentIntent.CaptureMethod;
  client_secret: string | null;
  confirmation_method: Stripe.PaymentIntent.ConfirmationMethod;
  created: number;
  currency: string;
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  description: string | null;
  excluded_payment_method_types:
    | Stripe.PaymentIntent.ExcludedPaymentMethodType[]
    | null;
  last_payment_error: Stripe.PaymentIntent.LastPaymentError | null;
  latest_charge: string | Stripe.Charge | null;
  livemode: boolean;
  metadata: Stripe.Metadata;
  next_action: Stripe.PaymentIntent.NextAction | null;
  on_behalf_of: string | Stripe.Account | null;
  payment_method: string | Stripe.PaymentMethod | null;
  payment_method_configuration_details: Stripe.PaymentIntent.PaymentMethodConfigurationDetails | null;
  payment_method_options: Stripe.PaymentIntent.PaymentMethodOptions | null;
  payment_method_types: string[];
  presentment_details?: Stripe.PaymentIntent.PresentmentDetails | undefined;
  processing: Stripe.PaymentIntent.Processing | null;
  receipt_email: string | null;
  review: string | Stripe.Review | null;
  setup_future_usage: Stripe.PaymentIntent.SetupFutureUsage | null;
  shipping: Stripe.PaymentIntent.Shipping | null;
  source: string | Stripe.CustomerSource | Stripe.DeletedCustomerSource | null;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: Stripe.PaymentIntent.Status;
  transfer_data: Stripe.PaymentIntent.TransferData | null;
  transfer_group: string | null;
  extra: Stripe.Metadata;
}
