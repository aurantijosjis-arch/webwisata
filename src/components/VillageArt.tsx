import React, { useState } from 'react';
import { Mountain } from 'lucide-react';
import { ArtVariant } from '../types';

interface VillageArtProps {
  variant: ArtVariant;
  className?: string;
  label?: string;
}

const IMAGE_SOURCES: Record<ArtVariant, string> = {
  'hero-terraces': '/src/assets/images/hero_lereng_asri_1794894823357.jpg',
  'coffee-harvest': '/src/assets/images/tour_coffee_harvest_1794894823426.jpg',
  'waterfall-trail': '/src/assets/images/tour_waterfall_trail_1794894824361.jpg',
  'indigo-craft': '/src/assets/images/tour_indigo_craft_1794894823947.jpg',
  'tea-sunrise': '/src/assets/images/tour_tea_terraces_1794894824988.jpg',
  'bamboo-cooking': '/src/assets/images/tour_bamboo_hearth_1794894843597.jpg',
  'pine-ridge': '/src/assets/images/tour_pine_ridge_1794894844554.jpg',
  'homestay-pendopo': '/src/assets/images/homestay_timber_terrace_1794894824560.jpg',
  'homestay-pine': '/src/assets/images/homestay_pine_cabin_1794894844624.jpg',
  'homestay-lumbung': '/src/assets/images/hero_lereng_asri_1794894823357.jpg',
  'homestay-kabut': '/src/assets/images/homestay_lumbung_barn_1794894845046.jpg',
};

export const VillageArt: React.FC<VillageArtProps> = ({ variant, className = '', label }) => {
  const [hasError, setHasError] = useState(false);
  const src = IMAGE_SOURCES[variant];
  const altText = label ?? `Suasana dataran tinggi Lereng Asri: ${variant}`;

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#E9F7EA] via-[#D8E6DA] to-[#B8DFC2] flex flex-col items-center justify-center p-4 text-center ${className}`}
        role="img"
        aria-label={altText}
      >
        <Mountain className="w-8 h-8 text-[#1E4B38] mb-2" />
        <span className="text-xs font-semibold text-[#023423] max-w-[200px] leading-snug">
          {altText}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#E3F2E5] ${className}`}>
      <img
        src={src}
        alt={altText}
        referrerPolicy="no-referrer"
        loading={variant === 'hero-terraces' ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover block"
      />
    </div>
  );
};
