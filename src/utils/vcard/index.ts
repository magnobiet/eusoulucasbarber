import { VCard } from 'vcard-creator';
import type { Config } from '~/config';

export function createVCard(data: Config['vcard']): string {
  return new VCard()
    .addRevision(new Date(0))
    .addFullName(data.fullName)
    .addName({ familyName: data.lastName, givenName: data.firstName })
    .addCompany({ name: data.organization })
    .addJobtitle(data.title)
    .addPhoneNumber({ number: data.phone, type: data.phoneType })
    .addAddress({
      street: data.street,
      locality: data.city,
      region: data.region,
      country: data.country,
      type: ['work'],
    })
    .addUrl({ url: data.url, type: ['work'] })
    .addNote(data.note)
    .toString();
}
