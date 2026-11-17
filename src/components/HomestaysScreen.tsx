import React, { useMemo, useState } from 'react';
import { Check, Coffee, Home, Users, X } from 'lucide-react';
import { HOMESTAYS, formatIdr } from '../data/villageData';
import { Homestay } from '../types';
import { VillageArt } from './VillageArt';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HomestaysScreenProps {
  selectedHomestayId: string | null;
  onChooseHomestay: (id: string) => void;
  inspectedHomestay: Homestay | null;
  onInspectHomestay: (stay: Homestay | null) => void;
  onGoToPlan: () => void;
  onOpenWhatsApp: (subject: string) => void;
}

const ZONES: ('Semua' | Homestay['zone'])[] = [
  'Semua',
  'Pemandangan Terasering',
  'Tepi Pinus',
  'Inti Desa',
];

export const HomestaysScreen: React.FC<HomestaysScreenProps> = ({
  selectedHomestayId,
  onChooseHomestay,
  inspectedHomestay,
  onInspectHomestay,
  onGoToPlan,
  onOpenWhatsApp,
}) => {
  const [zoneFilter, setZoneFilter] = useState<'Semua' | Homestay['zone']>('Semua');
  const [minGuests, setMinGuests] = useState<number>(1);

  const filteredHomestays = useMemo(() => {
    return HOMESTAYS.filter((stay) => {
      if (zoneFilter !== 'Semua' && stay.zone !== zoneFilter) return false;
      if (stay.maxGuests < minGuests) return false;
      return true;
    });
  }, [zoneFilter, minGuests]);

  return (
    <div className="space-y-8 pt-4">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#1A6D0E]">Homestay Kayu Keluarga</p>
        <h1 className="text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-extrabold tracking-[-0.02em] text-[#023423]">
          Selimut hangat, pancuran air mata air, dan pagi di dapur keluarga
        </h1>
        <p className="text-base text-[#414944]">
          Setiap homestay sudah termasuk sarapan pagi pegunungan yang dimasak langsung oleh tuan rumah serta panduan arah menuju gerbang desa.
        </p>
      </div>

      {/* Filter Zona & Kapasitas */}
      <div className="bg-white rounded-2xl organic-border p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {ZONES.map((zone) => {
            const active = zoneFilter === zone;
            return (
              <button
                key={zone}
                type="button"
                onClick={() => setZoneFilter(zone)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#1E4B38] text-white border-[#1E4B38]'
                    : 'bg-[#F9F8F3] text-[#1E4B38] border-[#1E4B38]/40 hover:border-[#1E4B38]'
                }`}
              >
                {zone === 'Semua' ? 'Semua Zona Desa' : zone}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Users className="w-4 h-4 text-[#414944]" />
          <label htmlFor="guest-capacity-filter" className="text-sm font-semibold text-[#414944]">
            Jumlah tamu:
          </label>
          <select
            id="guest-capacity-filter"
            value={minGuests}
            onChange={(e) => setMinGuests(Number(e.target.value))}
            className="min-h-[44px] px-3 py-2 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm font-semibold text-[#023423] focus:outline-none focus:border-[#1E4B38]"
          >
            <option value={1}>Semua ukuran</option>
            <option value={2}>2+ tamu</option>
            <option value={4}>4+ tamu (Keluarga)</option>
            <option value={5}>5+ tamu (Rombongan)</option>
          </select>
        </div>
      </div>

      {/* Daftar Homestay */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHomestays.map((stay) => {
          const isSelected = selectedHomestayId === stay.id;
          return (
            <article
              key={stay.id}
              className={`bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-2 border-[#1E4B38] highland-shadow'
                  : 'organic-border'
              }`}
            >
              <div>
                <div className="h-56 overflow-hidden">
                  <VillageArt variant={stay.art} className="w-full h-full" label={stay.name} />
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs font-semibold text-[#414944] tabular-nums">
                    {stay.zone} · {stay.bedrooms} Kamar · Maks. {stay.maxGuests} tamu · {stay.availableRooms} tersedia
                  </p>
                  <div>
                    <h2 className="text-xl font-bold text-[#023423]">{stay.name}</h2>
                    <p className="text-sm font-medium text-[#1A6D0E]">Tuan rumah: {stay.hostFamily}</p>
                  </div>
                  <p className="text-sm text-[#414944] leading-relaxed">{stay.description}</p>
                  <div className="pt-2 flex items-start gap-2.5 text-sm text-[#1C2820]">
                    <Coffee className="w-4 h-4 text-[#D97736] shrink-0 mt-0.5" />
                    <span>{stay.breakfastNote}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-[#1E4B38]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-lg font-extrabold text-[#D97736] tabular-nums">
                    {formatIdr(stay.pricePerNightIdr)}
                  </span>
                  <span className="text-xs text-[#414944]"> / malam</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onInspectHomestay(stay)}
                    className="min-h-[44px] px-4 py-2 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] hover:bg-[#F9F8F3] text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Fasilitas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChooseHomestay(stay.id);
                      onGoToPlan();
                    }}
                    className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#E9F7EA] text-[#023423] border border-[#1E4B38]'
                        : 'bg-[#1E4B38] hover:bg-[#023423] text-white'
                    }`}
                  >
                    {isSelected ? 'Terpilih di Rencana' : 'Pilih Homestay'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Detail Fasilitas Homestay */}
      {inspectedHomestay && (
        <div
          className="fixed inset-0 z-50 bg-[#1C2820]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="homestay-modal-title"
        >
          <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl highland-shadow overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-52 shrink-0">
              <VillageArt
                variant={inspectedHomestay.art}
                className="w-full h-full"
                label={inspectedHomestay.name}
              />
              <button
                type="button"
                aria-label="Tutup detail homestay"
                onClick={() => onInspectHomestay(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 text-[#023423] flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#1A6D0E] tabular-nums">
                  {inspectedHomestay.zone} · {inspectedHomestay.bedrooms} Kamar · Maks. {inspectedHomestay.maxGuests} tamu
                </p>
                <h2 id="homestay-modal-title" className="text-2xl font-bold text-[#023423]">
                  {inspectedHomestay.name}
                </h2>
                <p className="text-sm text-[#414944]">
                  Tuan rumah: {inspectedHomestay.hostFamily} · {formatIdr(inspectedHomestay.pricePerNightIdr)} / malam
                </p>
              </div>

              <p className="text-sm md:text-base text-[#1C2820] leading-relaxed">
                {inspectedHomestay.description}
              </p>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#023423]">Fasilitas &amp; Kenyamanan Rumah</h3>
                <ul className="divide-y divide-[#1E4B38]/8">
                  {inspectedHomestay.amenities.map((amenity) => (
                    <li key={amenity} className="py-3 flex items-center gap-3 text-sm text-[#1C2820]">
                      <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 text-[#1A6D0E] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                  <li className="py-3 flex items-center gap-3 text-sm text-[#1C2820]">
                    <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 text-[#1A6D0E] flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </span>
                    <span>{inspectedHomestay.breakfastNote}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-5 bg-[#F9F8F3] border-t border-[#1E4B38]/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenWhatsApp(`Tanya Homestay: ${inspectedHomestay.name} (${inspectedHomestay.hostFamily})`);
                }}
                className="min-h-[48px] flex-1 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Tanya Tuan Rumah via WA
              </button>
              <button
                type="button"
                onClick={() => {
                  onChooseHomestay(inspectedHomestay.id);
                  onInspectHomestay(null);
                  onGoToPlan();
                }}
                className="min-h-[48px] flex-1 px-4 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold cursor-pointer"
              >
                Pilih untuk Rencana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
