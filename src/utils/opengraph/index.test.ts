import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  getOpenGraphFontData,
  getOpenGraphFonts,
  type OpenGraphFontConfig,
} from './index';

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
}));

const mockedReadFile = jest.mocked(readFile);

function createBuffer(content: string, offset = 0): Buffer<ArrayBuffer> {
  const padded = Buffer.concat([
    Buffer.alloc(offset),
    Buffer.from(content),
    Buffer.alloc(4),
  ]);

  return padded.subarray(offset, offset + content.length);
}

describe('getOpenGraphFontData', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the exact bytes read from the file', async () => {
    const buffer = createBuffer('font-binary-data', 8);
    mockedReadFile.mockResolvedValue(buffer);

    const result = await getOpenGraphFontData('/fonts/inter/regular.woff');

    expect(mockedReadFile).toHaveBeenCalledWith('/fonts/inter/regular.woff');
    expect(result.byteLength).toBe(buffer.byteLength);
    expect(Buffer.from(result).toString()).toBe('font-binary-data');
  });

  it('should not include bytes outside the buffer boundary', async () => {
    const buffer = createBuffer('abc', 16);
    mockedReadFile.mockResolvedValue(buffer);

    const result = await getOpenGraphFontData('/fonts/inter/bold.woff');

    expect(result.byteLength).toBe(3);
    expect(Buffer.from(result).toString()).toBe('abc');
  });

  it('should propagate errors thrown by readFile', async () => {
    const error = new Error('ENOENT: no such file or directory');
    mockedReadFile.mockRejectedValue(error);

    await expect(getOpenGraphFontData('/missing.woff')).rejects.toThrow(
      'ENOENT: no such file or directory',
    );
  });
});

describe('getOpenGraphFonts', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should resolve font files under fonts/<lowercased-font-name>/', async () => {
    mockedReadFile.mockResolvedValue(createBuffer('x'));

    await getOpenGraphFonts({
      fontName: 'Inter',
      variants: [{ fileName: 'regular.woff', weight: 400, style: 'normal' }],
    });

    expect(mockedReadFile).toHaveBeenCalledWith(
      path.join(process.cwd(), 'fonts', 'inter', 'regular.woff'),
    );
  });

  it('should map each variant to an OpenGraphFont preserving order, weight and style', async () => {
    mockedReadFile
      .mockResolvedValueOnce(createBuffer('regular-data'))
      .mockResolvedValueOnce(createBuffer('bold-italic-data'));

    const config: OpenGraphFontConfig = {
      fontName: 'Inter',
      variants: [
        { fileName: 'regular.woff', weight: 400, style: 'normal' },
        { fileName: 'bold-italic.woff', weight: 700, style: 'italic' },
      ],
    };

    const fonts = await getOpenGraphFonts(config);

    expect(fonts).toHaveLength(2);
    expect(fonts[0].name).toBe('Inter');
    expect(fonts[0].weight).toBe(400);
    expect(fonts[0].style).toBe('normal');
    expect(fonts[1].name).toBe('Inter');
    expect(fonts[1].weight).toBe(700);
    expect(fonts[1].style).toBe('italic');
    expect(Buffer.from(fonts[0].data).toString()).toBe('regular-data');
    expect(Buffer.from(fonts[1].data).toString()).toBe('bold-italic-data');
  });

  it('should associate each variant with the data of its own file', async () => {
    mockedReadFile.mockImplementation((filePath) =>
      Promise.resolve(createBuffer(String(filePath))),
    );

    const fonts = await getOpenGraphFonts({
      fontName: 'Inter',
      variants: [
        { fileName: 'a.woff', weight: 100, style: 'normal' },
        { fileName: 'b.woff', weight: 900, style: 'italic' },
      ],
    });

    expect(Buffer.from(fonts[0].data).toString()).toContain('a.woff');
    expect(Buffer.from(fonts[1].data).toString()).toContain('b.woff');
  });

  it('should return an empty array when there are no variants', async () => {
    const fonts = await getOpenGraphFonts({ fontName: 'Inter', variants: [] });

    expect(fonts).toEqual([]);
    expect(mockedReadFile).not.toHaveBeenCalled();
  });

  it('should reject when any variant fails to load', async () => {
    mockedReadFile
      .mockResolvedValueOnce(createBuffer('ok'))
      .mockRejectedValueOnce(new Error('permission denied'));

    await expect(
      getOpenGraphFonts({
        fontName: 'Inter',
        variants: [
          { fileName: 'a.woff', weight: 400, style: 'normal' },
          { fileName: 'b.woff', weight: 700, style: 'normal' },
        ],
      }),
    ).rejects.toThrow('permission denied');
  });
});
