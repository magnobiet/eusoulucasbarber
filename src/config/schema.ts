import { z } from 'zod';

const LANGUAGE_REGEX = new RegExp('^[a-z]{2}-[A-Z]{2}$');
const PHONE_REGEX = new RegExp(String.raw`^\+?[0-9\s\-\(\)]{10,20}$`);
const ZIP_CODE_REGEX = new RegExp(String.raw`^\d{5}-?\d{3}$`);
const COLOR_REGEX = new RegExp(
  String.raw`^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[0-9.]+\s*\))$`,
);

const ColorSchema = z.string().regex(COLOR_REGEX, {
  message: 'Invalid color format. Must be a valid color code.',
});

const ThemeSchema = z.object({
  background: ColorSchema,
  foreground: ColorSchema,
});

const SocialNetworkSchema = z.object({
  platform: z.enum([
    'facebook',
    'instagram',
    'linkedin',
    'x',
    'youtube',
    'tiktok',
    'whatsapp',
    'other',
  ]),
  url: z.url(),
  handle: z.string(),
});

const PhoneSchema = z.string().regex(PHONE_REGEX).optional();
const EmailSchema = z.email().optional();
const SocialNetworksSchema = z.array(SocialNetworkSchema).optional();

const ContactSchema = z.object({
  phone: PhoneSchema,
  email: EmailSchema,
  socialNetworks: SocialNetworksSchema,
});

const StateSchema = z.enum([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

const CoordinateSchema = z.object({
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
});

const CoordinatesSchema = CoordinateSchema.optional();
const ZipCodeSchema = z.string().regex(ZIP_CODE_REGEX);

const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: StateSchema,
  zipCode: ZipCodeSchema,
  coordinates: CoordinatesSchema,
});

const OpenGraphSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  badge: z.string().optional(),
  footer: z.string().optional(),
  colors: z.object({
    backgroundStart: ColorSchema,
    backgroundEnd: ColorSchema,
    eyebrowBackground: ColorSchema,
    eyebrowBorder: ColorSchema,
    eyebrowText: ColorSchema,
    accentStart: ColorSchema,
    accentEnd: ColorSchema,
    text: ColorSchema,
    muted: ColorSchema,
  }),
});

const LanguageSchema = z.string().regex(LANGUAGE_REGEX);
const PageTitleSchema = z.string().min(1).max(45);
const ShortTitleSchema = z.string().min(1).max(12);

export const FaviconSchema = ThemeSchema.extend({
  text: z.string().min(1).max(2),
});

export const ConfigSchema = z.object({
  language: LanguageSchema,
  pageTitle: PageTitleSchema,
  shortTitle: ShortTitleSchema,
  description: z.string().min(1).max(300),
  theme: ThemeSchema,
  contact: ContactSchema.optional(),
  address: AddressSchema.optional(),
  opengraph: OpenGraphSchema,
  favicon: FaviconSchema,
});

export type Config = z.infer<typeof ConfigSchema>;

export type OpenGraphConfig = z.infer<typeof ConfigSchema.shape.opengraph>;
