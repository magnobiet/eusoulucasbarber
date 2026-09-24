import { NextResponse } from 'next/server';
import {
  IbgeStatesResponseSchema,
  StateResponseSchema,
  StatesResponseSchema,
  type StateResponse,
} from './schema';

const IBGE_STATES_API_URL =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

type ApiErrorResponse = {
  error: string;
};

export async function GET(): Promise<
  NextResponse<Array<StateResponse> | ApiErrorResponse>
> {
  const response = await fetch(IBGE_STATES_API_URL, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch states from IBGE' },
      { status: 502 },
    );
  }

  const rawData: unknown = await response.json();
  const ibgeStates = IbgeStatesResponseSchema.parse(rawData);

  const states = ibgeStates.map<StateResponse>((state) =>
    StateResponseSchema.parse({
      id: state.id,
      abbreviation: state.sigla,
      name: state.nome,
    }),
  );

  const mappedStates = StatesResponseSchema.parse(states);

  return NextResponse.json(mappedStates);
}
