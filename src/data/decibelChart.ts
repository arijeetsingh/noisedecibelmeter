// Sound pressure levels for common sources, in dBA.
//
// `low`/`high` are a realistic range, not a single headline number — the range is the
// honest answer, and competitor pages that quote one figure disagree with each other
// precisely because they hide it.
//
// `ref` records where the figure comes from:
//   'niosh'   — appears on CDC/NIOSH published noise material
//   'osha'    — OSHA occupational noise material
//   'who'     — WHO environmental noise guidelines
//   'typical' — widely reported consensus range, no single authoritative publisher
// Do not upgrade a 'typical' to a named body without checking the source first.

export type Ref = 'niosh' | 'osha' | 'who' | 'typical';

export interface SoundEntry {
  name: string;
  low: number;
  high: number;
  ref: Ref;
  note?: string;
}

export const refLabels: Record<Ref, string> = {
  niosh: 'NIOSH / CDC',
  osha: 'OSHA',
  who: 'WHO',
  typical: 'Typical reported range',
};

export const sounds: SoundEntry[] = [
  { name: 'Threshold of hearing',        low: 0,   high: 0,   ref: 'typical', note: 'The quietest sound a healthy young ear can detect. The zero point of the scale.' },
  { name: 'Anechoic chamber',            low: 0,   high: 10,  ref: 'typical', note: 'Purpose-built rooms measure below 0 dB; you hear your own body.' },
  { name: 'Rustling leaves',             low: 10,  high: 20,  ref: 'typical' },
  { name: 'Ticking watch',               low: 20,  high: 30,  ref: 'typical' },
  { name: 'Whisper',                     low: 20,  high: 30,  ref: 'niosh' },
  { name: 'Quiet rural area at night',   low: 25,  high: 35,  ref: 'who' },
  { name: 'Quiet bedroom',               low: 30,  high: 40,  ref: 'who',     note: 'WHO recommends below 40 dB outdoors at night for undisturbed sleep.' },
  { name: 'Library',                     low: 35,  high: 45,  ref: 'typical' },
  { name: 'Refrigerator hum',            low: 40,  high: 50,  ref: 'typical' },
  { name: 'Light rainfall',              low: 45,  high: 55,  ref: 'typical' },
  { name: 'Quiet office',                low: 45,  high: 55,  ref: 'typical' },
  { name: 'Electric toothbrush',         low: 50,  high: 60,  ref: 'typical' },
  { name: 'Dishwasher',                  low: 55,  high: 70,  ref: 'typical' },
  { name: 'Normal conversation',         low: 60,  high: 70,  ref: 'niosh',   note: 'NIOSH gives 60–70 dB for conversation at typical speaking distance.' },
  { name: 'Air conditioner',             low: 60,  high: 70,  ref: 'typical' },
  { name: 'Washing machine',             low: 60,  high: 75,  ref: 'typical' },
  { name: 'Busy office',                 low: 65,  high: 75,  ref: 'typical' },
  { name: 'Television at normal volume', low: 65,  high: 75,  ref: 'typical' },
  { name: 'Busy restaurant',             low: 70,  high: 80,  ref: 'typical' },
  { name: 'Vacuum cleaner',              low: 70,  high: 80,  ref: 'typical', note: 'Commonly quoted at 75 dB. Cordless models run quieter.' },
  { name: 'Hair dryer',                  low: 70,  high: 85,  ref: 'typical' },
  { name: 'Car interior at highway speed', low: 70, high: 80, ref: 'typical' },
  { name: 'Alarm clock',                 low: 75,  high: 85,  ref: 'typical' },
  { name: 'City traffic from the pavement', low: 75, high: 85, ref: 'niosh' },
  { name: 'Garbage disposal',            low: 78,  high: 88,  ref: 'typical' },
  { name: 'Blender',                     low: 80,  high: 90,  ref: 'typical' },
  { name: 'Snoring (loud)',              low: 80,  high: 90,  ref: 'typical', note: 'Ordinary snoring sits near 50–60 dB; heavy snoring reaches 80+.' },
  { name: 'Lawn mower (petrol)',         low: 85,  high: 95,  ref: 'niosh',   note: 'Sources disagree widely — 85 to 105 dB. Electric mowers run 56–80 dB.' },
  { name: 'Hearing damage threshold',    low: 85,  high: 85,  ref: 'niosh',   note: 'NIOSH sets its recommended exposure limit here: 85 dBA over 8 hours.' },
  { name: 'Heavy city traffic, roadside', low: 85, high: 95,  ref: 'typical' },
  { name: 'Food processor',              low: 85,  high: 95,  ref: 'typical' },
  { name: 'Motorcycle',                  low: 90,  high: 100, ref: 'niosh' },
  { name: 'Hand drill',                  low: 90,  high: 100, ref: 'typical' },
  { name: 'Subway train',                low: 90,  high: 100, ref: 'typical' },
  { name: 'Sporting event crowd',        low: 94,  high: 110, ref: 'niosh' },
  { name: 'Nightclub',                   low: 95,  high: 105, ref: 'typical' },
  { name: 'Chainsaw',                    low: 100, high: 115, ref: 'typical' },
  { name: 'Angle grinder',               low: 100, high: 110, ref: 'typical' },
  { name: 'Leaf blower',                 low: 100, high: 110, ref: 'typical' },
  { name: 'Rock concert',                low: 105, high: 120, ref: 'typical', note: 'Reported anywhere from 105 to 129 dB depending on venue and position.' },
  { name: 'Car horn at 1 metre',         low: 105, high: 115, ref: 'typical' },
  { name: 'Nail gun',                    low: 110, high: 120, ref: 'typical' },
  { name: 'Jackhammer',                  low: 110, high: 120, ref: 'typical' },
  { name: 'Ambulance siren at close range', low: 110, high: 120, ref: 'typical' },
  { name: 'Threshold of pain',           low: 120, high: 130, ref: 'typical', note: 'Sound becomes physically painful, and damage can be immediate.' },
  { name: 'Thunderclap overhead',        low: 120, high: 130, ref: 'typical' },
  { name: 'Jet engine at 30 metres',     low: 130, high: 140, ref: 'typical' },
  { name: 'Firework at close range',     low: 140, high: 155, ref: 'typical' },
  { name: 'Gunshot',                     low: 140, high: 175, ref: 'niosh',   note: 'Impulse noise. A single unprotected shot can cause permanent damage.' },
  { name: 'Rocket launch at the pad',    low: 165, high: 180, ref: 'typical' },
];

// ── Exposure limits ────────────────────────────────────────────────────────
// OSHA 29 CFR 1910.95: 90 dBA PEL over 8 hours, 5 dB exchange rate.
// NIOSH REL:           85 dBA over 8 hours, 3 dB exchange rate.
// The two give materially different answers, and that difference is the point.

export function oshaHours(dba: number): number | null {
  if (dba < 90) return null;          // below the PEL — 8h+ permitted
  return 8 / Math.pow(2, (dba - 90) / 5);
}

export function nioshHours(dba: number): number | null {
  if (dba < 85) return null;          // below the REL — 8h+ permitted
  return 8 / Math.pow(2, (dba - 85) / 3);
}

export function formatDuration(hours: number | null): string {
  if (hours === null) return '8 hrs +';
  if (hours >= 1) {
    const h = Math.round(hours * 10) / 10;
    return `${h % 1 === 0 ? h : h.toFixed(1)} hr${h === 1 ? '' : 's'}`;
  }
  const mins = hours * 60;
  if (mins >= 1) return `${Math.round(mins)} min`;
  const secs = mins * 60;
  return secs >= 1 ? `${Math.round(secs)} sec` : '< 1 sec';
}

export type Zone = 'safe' | 'caution' | 'danger' | 'extreme';

export function zoneFor(dba: number): Zone {
  if (dba >= 120) return 'extreme';
  if (dba >= 85) return 'danger';
  if (dba >= 70) return 'caution';
  return 'safe';
}

export const zoneMeta: Record<Zone, { label: string; range: string; desc: string; color: string }> = {
  safe:    { label: 'Safe',    range: 'Under 70 dB', desc: 'No hearing risk at any duration.',                       color: '#50e3c2' },
  caution: { label: 'Caution', range: '70–84 dB',    desc: 'Annoying and fatiguing, but below the damage threshold.', color: '#f5a623' },
  danger:  { label: 'Danger',  range: '85–119 dB',   desc: 'Cumulative hearing damage. Exposure time matters.',       color: '#ff4d4d' },
  extreme: { label: 'Extreme', range: '120 dB +',    desc: 'Painful. Damage can occur immediately.',                  color: '#c50000' },
};
