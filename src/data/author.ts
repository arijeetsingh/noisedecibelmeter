// The maintainer behind the tool.
//
// E-E-A-T note: this describes *experience* — who built the thing, how it works, and what
// its limits are — rather than claiming acoustics credentials. If you hold a relevant
// qualification, add it to `credentials` and it will render in the byline; leave it empty
// and nothing is claimed. Do not add credentials that cannot be verified.
export const author = {
  name: 'Arijeet Singh',
  role: 'Builder and maintainer',
  credentials: '' as string,
  email: 'arijeet632@gmail.com',
  url: 'https://noisedecibelmeter.com/about/',
  bio: 'Built Noise Decibel Meter and maintains its measurement code. Writes up the ' +
       'sound-level references on this site from primary sources — OSHA, NIOSH, WHO and ' +
       'ISO — and states plainly where a browser microphone stops being good enough.',
} as const;

// Primary sources cited across the reference pages. Keep this list to standards bodies
// and public-health agencies; it is the sourcing that makes the numbers trustworthy.
export const sources = [
  {
    label: 'OSHA — Occupational Noise Exposure (29 CFR 1910.95)',
    url: 'https://www.osha.gov/noise',
    note: '90 dBA PEL over 8 hours, 5 dB exchange rate, 85 dBA action level.',
  },
  {
    label: 'NIOSH — Occupational Noise Exposure, Recommended Exposure Limit',
    url: 'https://www.cdc.gov/niosh/topics/noise/default.html',
    note: '85 dBA REL over 8 hours, 3 dB exchange rate. Stricter than OSHA.',
  },
  {
    label: 'WHO — Environmental Noise Guidelines for the European Region',
    url: 'https://www.who.int/europe/publications/i/item/9789289053563',
    note: 'Night-time outdoor noise below 40 dB Lnight for undisturbed sleep.',
  },
  {
    label: 'IEC 61672-1 — Electroacoustics: Sound Level Meters',
    url: 'https://webstore.iec.ch/en/publication/5708',
    note: 'Class 1 and Class 2 tolerances that certified hardware meters are built to.',
  },
] as const;
