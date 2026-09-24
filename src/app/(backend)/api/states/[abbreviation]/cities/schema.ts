import { z } from 'zod';

const IbgeRegionSchema = z.object({
  id: z.number(),
  sigla: z.string(),
  nome: z.string(),
});

const IbgeStateSchema = z.object({
  id: z.number(),
  sigla: z.string(),
  nome: z.string(),
  regiao: IbgeRegionSchema,
});

const IbgeMicroregionSchema = z.object({
  id: z.number(),
  nome: z.string(),
  mesorregiao: z.object({
    id: z.number(),
    nome: z.string(),
    UF: IbgeStateSchema,
  }),
});

const IbgeImmediateRegionSchema = z.object({
  id: z.number(),
  nome: z.string(),
  'regiao-intermediaria': z.object({
    id: z.number(),
    nome: z.string(),
    UF: IbgeStateSchema,
  }),
});

export const IbgeCitySchema = z.object({
  id: z.number(),
  nome: z.string(),
  microrregiao: IbgeMicroregionSchema,
  'regiao-imediata': IbgeImmediateRegionSchema,
});

export const IbgeCitiesResponseSchema = z.array(IbgeCitySchema);

export const CityResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CitiesResponseSchema = z.array(CityResponseSchema);

export type IbgeCity = z.infer<typeof IbgeCitySchema>;
export type CityResponse = z.infer<typeof CityResponseSchema>;
