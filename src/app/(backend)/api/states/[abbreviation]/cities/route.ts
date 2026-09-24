import { NextResponse } from 'next/server';
import { StateSchema } from '~/config/schema';
import {
  CitiesResponseSchema,
  CityResponseSchema,
  IbgeCitiesResponseSchema,
  type CityResponse,
} from './schema';

const IBGE_CITIES_API_URL =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

type ApiErrorResponse = {
  error: string;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ abbreviation: string }> },
): Promise<NextResponse<Array<CityResponse> | ApiErrorResponse>> {
  const { abbreviation } = await params;
  const stateValidation = StateSchema.safeParse(abbreviation);

  if (!stateValidation.success) {
    return NextResponse.json(
      { error: 'Invalid state abbreviation' },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${IBGE_CITIES_API_URL}/${abbreviation}/municipios`,
    {
      next: { revalidate: 86_400 },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch cities from IBGE' },
      { status: 502 },
    );
  }

  const rawData: unknown = await response.json();
  const ibgeCities = IbgeCitiesResponseSchema.parse(rawData);

  const cities = ibgeCities.map<CityResponse>((city) =>
    CityResponseSchema.parse({
      id: city.id,
      name: city.nome,
    }),
  );

  const mappedCities = CitiesResponseSchema.parse(cities);

  return NextResponse.json(mappedCities);
}
