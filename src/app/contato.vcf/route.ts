import { config } from '~/config';
import { createVCard, slugify } from '~/utils';

export const dynamic = 'force-static';

export function GET(): Response {
  const fileName = `${slugify(config.vcard.fullName)}.vcf`;

  return new Response(createVCard(config.vcard), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
