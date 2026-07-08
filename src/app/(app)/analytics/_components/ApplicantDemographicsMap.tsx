'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import worldGeoJson from '@assets/data/world-countries.geo.json';
import { TOP_COUNTRIES } from './analyticsData';

const WIDTH = 367;
const HEIGHT = 158;

const COUNTRY_NAME_ALIASES: Record<string, string[]> = {
  Canada: ['Canada'],
  India: ['India'],
  Nigeria: ['Nigeria'],
  Philippines: ['Philippines'],
  'United States': ['United States of America', 'United States'],
};

type GeoFeature = {
  type: 'Feature';
  properties: { name: string };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
};

function project(lon: number, lat: number) {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y] as const;
}

function ringToPath(ring: number[][]) {
  return ring
    .map(([lon, lat], index) => {
      const [x, y] = project(lon, lat);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ')
    .concat(' Z');
}

function geometryToPaths(geometry: GeoFeature['geometry']) {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates.map((ring) => ringToPath(ring as number[][]));
  }

  return (geometry.coordinates as number[][][][]).flatMap((polygon) =>
    polygon.map((ring) => ringToPath(ring as number[][])),
  );
}


function getHighlightColor(countryLabel: string) {
  const rank = TOP_COUNTRIES.findIndex((row) => row.country === countryLabel);
  if (rank === 0) return '#2F66C8';
  if (rank === 1) return '#4B83D3';
  if (rank === 2) return '#6899DE';
  if (rank === 3) return '#85AFE9';
  return '#A2C5F4';
}

function resolveCountryLabel(geoName: string) {
  for (const [label, aliases] of Object.entries(COUNTRY_NAME_ALIASES)) {
    if (aliases.includes(geoName)) return label;
  }
  return null;
}

export function ApplicantDemographicsMap({ className }: { className?: string }) {
  const { basePaths, highlightedPaths } = useMemo(() => {
    const features = (worldGeoJson as { features: GeoFeature[] }).features;
    const base: { key: string; d: string }[] = [];
    const highlighted: { key: string; d: string; fill: string }[] = [];

    features.forEach((feature) => {
      const name = feature.properties.name;
      const paths = geometryToPaths(feature.geometry);
      const countryLabel = resolveCountryLabel(name);
      const isHighlighted = countryLabel !== null;

      paths.forEach((d, index) => {
        const key = `${name}-${index}`;
        if (isHighlighted && countryLabel) {
          highlighted.push({ key, d, fill: getHighlightColor(countryLabel) });
        } else {
          base.push({ key, d });
        }
      });
    });

    return { basePaths: base, highlightedPaths: highlighted };
  }, []);

  return (
    <div className={cn('relative h-[158px] w-full max-w-[367px] overflow-hidden rounded-[8px] bg-[#F8FAFC]', className)}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full" aria-label="Applicant demographics world map">
        <rect width={WIDTH} height={HEIGHT} fill="#F8FAFC" />
        {basePaths.map(({ key, d }) => (
          <path key={key} d={d} fill="#CBD5E1" stroke="#EEF2F8" strokeWidth="0.35" />
        ))}
        {highlightedPaths.map(({ key, d, fill }) => (
          <path key={key} d={d} fill={fill} stroke="#EEF2F8" strokeWidth="0.35" opacity={0.92} />
        ))}
      </svg>
    </div>
  );
}
