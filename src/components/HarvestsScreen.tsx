import React, { useState } from 'react';
import { CalendarDays, Check, Leaf, MapPin, Thermometer } from 'lucide-react';
import { HARVEST_SEASONS, WORKSHOPS, formatIdr } from '../data/villageData';
import { VillageArt } from './VillageArt';

interface HarvestsScreenProps {
  plannedWorkshopIds: string[];
  onToggleWorkshopInPlan: (id: string) => void;
  onGoToPlan: () => void;
}

export const HarvestsScreen: React.FC<HarvestsScreenProps> = ({
  plannedWorkshopIds,
  onToggleWorkshopInPlan,
  onGoToPlan,
}) => {
  const [activeSeasonId, setActiveSeasonId] = useState<string>(HARVEST_SEASONS[0].id);
  const currentSeason =
    HARVEST_SEASONS.find((s) => s.id === activeSeasonId) ?? HARVEST_SEASONS[0];

  return (
    <div className="space-y-10 pt-4">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#1A6D0E]">Ritme Agraria &amp; Kalender Desa</p>
        <h1 className="text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-extrabold tracking-[-0.02em] text-[#023423]">
          Hasil bumi yang tumbuh dan dipanen sepanjang tahun
        </h1>
        <p className="text-base text-[#414944]">
          Sesuaikan kunjungan Anda dengan musim panen ceri arabika, masa tanam padi hijau, atau lokakarya kriya akhir pekan warga desa.
        </p>
      </div>

      {/* Tab Musim Interaktif */}
      <section className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Musim panen dataran tinggi">
          {HARVEST_SEASONS.map((season) => {
            const active = season.id === activeSeasonId;
            return (
              <button
                key={season.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveSeasonId(season.id)}
                className={`min-h-[60px] p-4 rounded-xl text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1E4B38] text-white highland-shadow'
                    : 'bg-white text-[#023423] organic-border hover:bg-[#E9F7EA]'
                }`}
              >
                <p
                  className={`text-xs font-semibold tabular-nums ${
                    active ? 'text-[#A1D1B8]' : 'text-[#D97736]'
                  }`}
                >
                  {season.months}
                </p>
                <p className="text-sm font-bold mt-0.5 leading-snug">{season.name}</p>
              </button>
            );
          })}
        </div>

        {/* Panel Detail Musim */}
        <div className="bg-white rounded-2xl organic-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 h-56 lg:h-auto min-h-[240px]">
            <VillageArt
              variant={
                activeSeasonId === 'oct-dec'
                  ? 'coffee-harvest'
                  : activeSeasonId === 'jan-mar'
                  ? 'waterfall-trail'
                  : activeSeasonId === 'apr-jun'
                  ? 'tea-sunrise'
                  : 'pine-ridge'
              }
              className="w-full h-full"
              label={currentSeason.name}
            />
          </div>

          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#1A6D0E] tabular-nums">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {currentSeason.months}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4" />
                  {currentSeason.tempRange}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#023423]">{currentSeason.name}</h2>
              <p className="text-sm font-medium text-[#414944]">{currentSeason.weatherSummary}</p>
              <p className="text-base text-[#1C2820] leading-relaxed">
                {currentSeason.highlightNote}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1E4B38]/10 space-y-2">
              <p className="text-xs font-semibold text-[#414944]">Komoditas &amp; panen unggulan musim ini</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-[#023423]">
                {currentSeason.primaryCrops.map((crop, idx) => (
                  <React.Fragment key={crop}>
                    <span>{crop}</span>
                    {idx < currentSeason.primaryCrops.length - 1 && (
                      <span aria-hidden="true" className="text-[#414944]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lokakarya Akhir Pekan */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#1A6D0E]">Kegiatan Akhir Pekan Warga</p>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#023423]">
              Lokakarya komunitas terbuka Sabtu &amp; Minggu ini
            </h2>
          </div>
          {plannedWorkshopIds.length > 0 && (
            <button
              type="button"
              onClick={onGoToPlan}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#D97736] text-white text-sm font-semibold whitespace-nowrap cursor-pointer self-start sm:self-auto tabular-nums"
            >
              Tinjau {plannedWorkshopIds.length} Lokakarya Terpilih
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl organic-border divide-y divide-[#1E4B38]/8">
          {WORKSHOPS.map((ws) => {
            const isReserved = plannedWorkshopIds.includes(ws.id);
            const displaySpots = isReserved ? Math.max(0, ws.spotsLeft - 1) : ws.spotsLeft;

            return (
              <div
                key={ws.id}
                className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#4E9F3D]/12 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-5 h-5" />
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-[#D97736] tabular-nums">
                      {ws.schedule} · {ws.duration} · Tersisa {displaySpots} dari {ws.totalSpots} kursi
                    </p>
                    <h3 className="text-lg font-bold text-[#023423]">{ws.title}</h3>
                    <p className="text-sm text-[#414944] max-w-2xl">{ws.description}</p>
                    <p className="text-xs text-[#414944] inline-flex items-center gap-1.5 pt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {ws.location} · Dipandu oleh {ws.host}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pl-14 lg:pl-0">
                  <div className="text-left lg:text-right">
                    <p className="text-base font-extrabold text-[#D97736] tabular-nums">
                      {formatIdr(ws.priceIdr)}
                    </p>
                    <p className="text-xs text-[#414944]">per peserta</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleWorkshopInPlan(ws.id)}
                    className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                      isReserved
                        ? 'bg-[#E9F7EA] text-[#023423] border border-[#1E4B38]'
                        : 'bg-[#1E4B38] hover:bg-[#023423] text-white'
                    }`}
                  >
                    {isReserved && <Check className="w-4 h-4" />}
                    {isReserved ? 'Kursi Dipesan' : 'Pesan Kursi'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
