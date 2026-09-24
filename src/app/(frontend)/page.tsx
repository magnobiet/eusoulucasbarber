import type { ReactElement } from 'react';
import {
  Channels,
  OperatingHours,
  PrimaryCTA,
  ProfileHero,
  SecondaryActions,
} from '~/components/layout';

export default function HomePage(): ReactElement {
  return (
    <main className="flex w-full flex-col items-center">
      <ProfileHero />
      <PrimaryCTA />
      <SecondaryActions />
      <Channels />
      <OperatingHours />
    </main>
  );
}
