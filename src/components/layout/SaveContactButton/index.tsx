'use client';

import { Contact } from 'lucide-react';
import { useMemo, type ReactElement } from 'react';
import { VCard } from 'vcard-creator';
import { config } from '~/config';

function createVCardDownloadUrl(): string {
  const {
    firstName,
    lastName,
    fullName,
    organization,
    title,
    phone,
    phoneType,
    street,
    city,
    region,
    country,
    url,
    note,
  } = config.vcard;

  const vCard = new VCard()
    .addRevision(new Date(0))
    .addFullName(fullName)
    .addName({ familyName: lastName, givenName: firstName })
    .addCompany({ name: organization })
    .addJobtitle(title)
    .addPhoneNumber({ number: phone, type: phoneType })
    .addAddress({
      street,
      locality: city,
      region,
      country,
      type: ['work'],
    })
    .addUrl({ url, type: ['work'] })
    .addNote(note);

  return `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard.toString())}`;
}

export function SaveContactButton(): ReactElement {
  const href = useMemo(() => createVCardDownloadUrl(), []);

  return (
    <a
      className="border-coffee-700 bg-coffee-850 text-cream hover:border-brand-cognac/40 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold shadow-sm transition-all duration-200 hover:bg-[#2d231b] active:scale-95"
      download="LucasXavier.vcf"
      href={href}
    >
      <Contact className="text-brand-cognac h-4 w-4 transition-transform duration-200" />
      <span>Salvar contato</span>
    </a>
  );
}
