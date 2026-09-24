export function slugify(...parts: Array<string>): string {
  return parts
    .join('-')
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .split('-')
    .filter(Boolean)
    .join('-');
}
