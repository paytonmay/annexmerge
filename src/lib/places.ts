// Canonical list of places for the "claim your place" signup. Order matters:
// corridor spine south to north, then open branches, then catch-alls.
export const PLACES = [
  'Pikeville',
  'Coal Run Village',
  'Broad Bottom',
  'Harold',
  'Betsy Layne',
  'Stanville',
  'Ivel',
  'Dwale',
  'Allen',
  'Prestonsburg',
  'Shelbiana',
  'Millard',
  'Elkhorn City',
  'Robinson Creek',
  'Virgie',
  'Paintsville',
  'Elsewhere in Pike County',
  'Elsewhere in Floyd County',
  'Elsewhere in the region',
  'Outside the region',
] as const;

export type Place = (typeof PLACES)[number];

export function isPlace(value: string): value is Place {
  return (PLACES as readonly string[]).includes(value);
}
