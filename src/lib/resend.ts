import { Resend } from 'resend';
import { environment } from '~/environment';

class ResendClient {
  private client: Resend | null = null;

  public getClient(): Resend | null {
    if (!environment.RESEND_API_KEY) {
      return null;
    }

    if (!this.client) {
      this.client = new Resend(environment.RESEND_API_KEY);
    }

    return this.client;
  }

  public async sendEmail(
    parameters: Parameters<Resend['emails']['send']>[0],
  ): Promise<ReturnType<Resend['emails']['send']>> {
    const client = this.getClient();

    if (!client) {
      throw new Error('Resend API key is not configured');
    }

    return client.emails.send(parameters);
  }
}

export const resend = new ResendClient();
