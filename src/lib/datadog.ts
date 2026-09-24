import * as configcat from '@configcat/sdk/node';
import { environment } from '~/environment';

class ConfigCatClient {
  private client: configcat.IConfigCatClient | null = null;

  public getClient(): configcat.IConfigCatClient | null {
    if (!environment.CONFIGCAT_SDK_KEY) {
      return null;
    }

    if (!this.client) {
      const logger = configcat.createConsoleLogger(configcat.LogLevel.Info);

      this.client = configcat.getClient(
        environment.CONFIGCAT_SDK_KEY,
        configcat.PollingMode.AutoPoll,
        { logger },
      );
    }

    return this.client;
  }

  public async getValue<T extends string | number | boolean | null | undefined>(
    key: string,
    defaultValue: T,
  ): Promise<T> {
    const client = this.getClient();

    return client
      ? (client.getValueAsync(key, defaultValue) as Promise<T>)
      : defaultValue;
  }

  public async getValueJSON<T>(key: string, defaultValue: T): Promise<T> {
    const client = this.getClient();

    if (!client) {
      return defaultValue;
    }

    const value = await client.getValueAsync(key, JSON.stringify(defaultValue));

    return typeof value === 'string' ? (JSON.parse(value) as T) : defaultValue;
  }
}

export const configCat = new ConfigCatClient();
