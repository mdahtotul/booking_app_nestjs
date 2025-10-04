import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null = null;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2025-09-30.clover',
      },
    );
  }

  async createCharge({ card, amount }: CreateChargeDto) {
    let paymentMethod: Stripe.PaymentMethod | undefined = undefined;
    try {
      paymentMethod = await this.stripe?.paymentMethods.create({
        type: 'card',
        card,
      });
    } catch (err) {
      console.log(err);
    }

    // for test payment_method = pm_card_visa

    const paymentIntent = await this.stripe?.paymentIntents.create({
      payment_method: paymentMethod?.id || 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    console.log('👀 payments.service:37', paymentIntent);
    return paymentIntent;
  }
}
