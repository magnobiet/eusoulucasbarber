import type {
  FaviconSettings,
  MasterIcon,
} from '@realfavicongenerator/generate-favicon';
import faviconGenerator from '@realfavicongenerator/generate-favicon';
import imageAdapterNode from '@realfavicongenerator/image-adapter-node';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { config } from '~/config/config';

const {
  generateFaviconFiles,
  initFaviconIconSettings,
  IconTransformationType,
} = faviconGenerator;
const { getNodeImageAdapter, loadAndConvertToSvg } = imageAdapterNode;
const publicDirectory = new URL('../public/', import.meta.url);
const logoPath = fileURLToPath(new URL('logo.svg', import.meta.url));

async function generateFavicons(): Promise<void> {
  const imageAdapter = await getNodeImageAdapter();
  const masterIcon: MasterIcon = {
    icon: await loadAndConvertToSvg(logoPath),
  };
  const iconSettings = initFaviconIconSettings();

  iconSettings.desktop.regularIconTransformation = {
    ...iconSettings.desktop.regularIconTransformation,
    type: IconTransformationType.Background,
    backgroundColor: config.favicon.background,
    backgroundRadius: 0.8,
    imageScale: 0.8,
  };

  iconSettings.webAppManifest = {
    ...iconSettings.webAppManifest,
    backgroundColor: config.favicon.background,
    themeColor: config.favicon.background,
    name: config.pageTitle,
    shortName: config.shortTitle,
  };

  const faviconSettings: FaviconSettings = {
    icon: iconSettings,
    path: '/',
    skipMetadataInjection: false,
    version: Date.now().toString(),
  };

  const files = await generateFaviconFiles(
    masterIcon,
    faviconSettings,
    imageAdapter,
  );

  await Promise.all(
    Object.entries(files).map(async ([fileName, content]) => {
      const fileContent =
        content instanceof Blob
          ? Buffer.from(await content.arrayBuffer())
          : content;

      await writeFile(new URL(fileName, publicDirectory), fileContent);
    }),
  );

  console.log('Generated files:', Object.keys(files));
}

await generateFavicons();
