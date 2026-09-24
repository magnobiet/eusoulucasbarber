describe('logger', () => {
  it('uses console when Sentry is not configured', async () => {
    await jest.isolateModulesAsync(async () => {
      jest.doMock('~/environment', () => ({
        environment: {
          SENTRY_DSN: undefined,
        },
      }));

      const { logger } = await import('.');

      expect(logger).toBe(console);
    });
  });

  it('uses Sentry when Sentry is configured', async () => {
    const sentryLogger = { error: jest.fn() };

    await jest.isolateModulesAsync(async () => {
      jest.doMock('~/environment', () => ({
        environment: {
          SENTRY_DSN: 'https://example@sentry.io/123',
        },
      }));

      jest.doMock('@sentry/nextjs', () => ({
        logger: sentryLogger,
      }));

      const { logger } = await import('.');

      expect(logger).toBe(sentryLogger);
    });
  });
});
