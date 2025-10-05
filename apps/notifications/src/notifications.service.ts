import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { EmailResponse } from './interfaces/email-response.interface';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: configService.get<string>('SMTP_SERVICE'),
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async notifyEmail({ email, text }: NotifyEmailDto): Promise<EmailResponse> {
    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Notify Reservation',
      text: text,
    };

    try {
      const info = (await this.transporter?.sendMail(
        options,
      )) as unknown as SMTPTransport.SentMessageInfo;

      return {
        statusCode: '200',
        status: 'success',
        responseResult: `Email sent to ${info.accepted.map((obj: string) => obj.toString()).join(', ')}`,
      };
    } catch (error) {
      return {
        statusCode:
          (error as unknown as { responseCode: string })?.responseCode || '500',
        status: 'error',
        responseResult: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
