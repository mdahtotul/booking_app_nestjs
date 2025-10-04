import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  get stripe(): Stripe {
    if (!this._stripe) {
      this._stripe = new Stripe(
        this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
        {
          apiVersion: '2025-09-30.clover',
        },
      );
    }
    return this._stripe;
  }

  private _stripe: Stripe | null = null;

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this._stripe?.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this._stripe?.paymentIntents.create({
      payment_method: paymentMethod?.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    return paymentIntent;
  }
}
