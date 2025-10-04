import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null = null;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsClient: ClientProxy,
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2025-09-30.clover',
      },
    );
  }

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    let paymentMethod: Stripe.PaymentMethod | undefined = undefined;
    try {
      paymentMethod = await this.stripe?.paymentMethods.create({
        type: 'card',
        card,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.log(err);
    }

    // for test payment_method = pm_card_visa

    const paymentIntent = await this.stripe?.paymentIntents.create({
      payment_method: paymentMethod?.id || 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    this.notificationsClient.emit('notify_email', {
      email,
    });
    return paymentIntent;
  }
}
