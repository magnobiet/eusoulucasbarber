import '@testing-library/jest-dom';

beforeAll(() => {
  const methods = ['debug', 'log', 'info', 'warn', 'error'] as const;

  for (const method of methods) {
    jest.spyOn(console, method).mockImplementation(() => {
      /* suppressed in tests */
    });
  }
});
