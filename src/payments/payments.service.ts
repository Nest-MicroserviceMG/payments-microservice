import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from '../confing/envs';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripreSecret);

  async createPaymentSession() {
    const session = await this.stripe.checkout.sessions.create({
      // Colocar los ID de mi orden
      payment_intent_data: {
        metadata: {},
      },

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000, //2000 centavos = 20 dolares
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancel',
    });

    return session;
  }
}
