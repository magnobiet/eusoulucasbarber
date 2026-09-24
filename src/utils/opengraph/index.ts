import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontStyle = 'normal' | 'italic';

export type OpenGraphFont = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: FontStyle;
};

export async function getOpenGraphFontData(
  fontPath: string,
): Promise<ArrayBuffer> {
  const file = await readFile(fontPath);

  return file.buffer.slice(
    file.byteOffset,
    file.byteOffset + file.byteLength,
  ) as ArrayBuffer;
}

export interface OpenGraphFontVariant {
  fileName: string;
  weight: FontWeight;
  style: FontStyle;
}

export interface OpenGraphFontConfig {
  fontName: string;
  variants: Array<OpenGraphFontVariant>;
}

export async function getOpenGraphFonts(
  config: OpenGraphFontConfig,
): Promise<Array<OpenGraphFont>> {
  const rootDirectory = process.cwd();
  const folder = config.fontName.toLowerCase();

  const fontDataArray = await Promise.all(
    config.variants.map((variant) =>
      getOpenGraphFontData(
        path.join(rootDirectory, 'fonts', folder, variant.fileName),
      ),
    ),
  );

  return config.variants.map((variant, index) => ({
    name: config.fontName,
    data: fontDataArray[index],
    weight: variant.weight,
    style: variant.style,
  }));
}
