import { z } from 'zod';

const IbgeRegionSchema = z.object({
  id: z.number(),
  sigla: z.string(),
  nome: z.string(),
});

export const IbgeStateSchema = z.object({
  id: z.number(),
  sigla: z.string(),
  nome: z.string(),
  regiao: IbgeRegionSchema,
});

export const IbgeStatesResponseSchema = z.array(IbgeStateSchema);

export const StateResponseSchema = z.object({
  id: z.number(),
  abbreviation: z.string(),
  name: z.string(),
});

export const StatesResponseSchema = z.array(StateResponseSchema);

export type IbgeState = z.infer<typeof IbgeStateSchema>;
export type StateResponse = z.infer<typeof StateResponseSchema>;
