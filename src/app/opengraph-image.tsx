import { ImageResponse } from 'next/og';
import { OpenGraphContent } from '~/components';
import { config } from '~/config';
import { getOpenGraphFonts } from '~/utils';

const data = config.opengraph;

export const alt = `${data.title} | ${data.eyebrow}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image(): Promise<ImageResponse> {
  const fonts = await getOpenGraphFonts({
    fontName: 'Outfit',
    variants: [
      { fileName: 'outfit-400.ttf', weight: 400, style: 'normal' },
      { fileName: 'outfit-700.ttf', weight: 700, style: 'normal' },
    ],
  });

  return new ImageResponse(<OpenGraphContent context={data} />, {
    ...size,
    fonts,
  });
}
