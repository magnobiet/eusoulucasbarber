import { ImageResponse } from 'next/og';
import { config } from '~/config';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

const {
  favicon: { background, foreground, text },
} = config;

export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        background,
        color: foreground,
        fontSize: 24,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text}
    </div>,
    { ...size },
  );
}
