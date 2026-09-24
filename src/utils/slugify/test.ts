import { slugify } from '.';

describe('slugify', () => {
  it('creates a slug from multiple parts', () => {
    expect(slugify('Hello', 'World')).toBe('hello-world');
  });

  it('removes accents and normalizes separators', () => {
    expect(slugify('  Café & Pão  ')).toBe('cafe-pao');
  });

  it('returns an empty string when parts contain no slug characters', () => {
    expect(slugify('---', '  ')).toBe('');
  });
});
