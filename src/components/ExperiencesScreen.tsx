import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Check,
  Coffee,
  Footprints,
  Leaf,
  Minus,
  Plus,
  Search,
  Sun,
  Utensils,
} from 'lucide-react';
import { EXPERIENCES, formatIdr } from '../data/villageData';
import { Experience, ExperienceCategory, ItineraryStep } from '../types';
import { VillageArt } from './VillageArt';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ExperiencesScreenProps {
  selectedExperience: Experience | null;
  onSelectExperience: (exp: Experience | null) => void;
  plannedExperienceIds: string[];
  onToggleExperienceInPlan: (id: string) => void;
  onOpenWhatsApp: (subject: string) => void;
  onGoToPlan: () => void;
}

const CATEGORIES: ('Semua' | ExperienceCategory)[] = [
  'Semua',
  'Agrowisata',
  'Jalur Hutan',
  'Kriya Desa',
];

const DIFFICULTIES: ('Semua' | Experience['difficulty'])[] = ['Semua', 'Santai', 'Menengah', 'Aktif'];

function renderStepIcon(icon: ItineraryStep['icon']) {
  switch (icon) {
    case 'sun':
      return <Sun className="w-4 h-4" />;
    case 'coffee':
      return <Coffee className="w-4 h-4" />;
    case 'footprints':
      return <Footprints className="w-4 h-4" />;
    case 'utensils':
      return <Utensils className="w-4 h-4" />;
    case 'camera':
      return <Camera className="w-4 h-4" />;
    case 'leaf':
    default:
      return <Leaf className="w-4 h-4" />;
  }
}

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({
  selectedExperience,
  onSelectExperience,
  plannedExperienceIds,
  onToggleExperienceInPlan,
  onOpenWhatsApp,
  onGoToPlan,
}) => {
  const [category, setCategory] = useState<'Semua' | ExperienceCategory>('Semua');
  const [difficulty, setDifficulty] = useState<'Semua' | Experience['difficulty']>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedPacking, setCheckedPacking] = useState<Record<string, boolean>>({});
  const [previewGuests, setPreviewGuests] = useState(2);

  const filteredExperiences = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EXPERIENCES.filter((exp) => {
      if (category !== 'Semua' && exp.category !== category) return false;
      if (difficulty !== 'Semua' && exp.difficulty !== difficulty) return false;
      if (
        q &&
        !exp.title.toLowerCase().includes(q) &&
        !exp.summary.toLowerCase().includes(q) &&
        !exp.guideName.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [category, difficulty, searchQuery]);

  if (selectedExperience) {
    const isAdded = plannedExperienceIds.includes(selectedExperience.id);
    const estimatedTotal = selectedExperience.priceIdr * previewGuests;

    const togglePackItem = (item: string) => {
      const key = `${selectedExperience.id}::${item}`;
      setCheckedPacking((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="space-y-8 pt-4">
        <button
          type="button"
          onClick={() => onSelectExperience(null)}
          className="min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold text-[#1E4B38] hover:text-[#023423] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Semua Wisata
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Rencana Perjalanan */}
          <div className="lg:col-span-7 space-y-6">
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden organic-border">
              <VillageArt
                variant={selectedExperience.art}
                className="w-full h-full"
                label={selectedExperience.title}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1A6D0E] tabular-nums">
                {selectedExperience.category} · {selectedExperience.duration} · {selectedExperience.difficulty} · {selectedExperience.elevation}
              </p>
              <h1 className="text-[28px] leading-[36px] md:text-[34px] md:leading-[42px] font-extrabold tracking-[-0.02em] text-[#023423]">
                {selectedExperience.title}
              </h1>
              <p className="text-base text-[#414944] leading-relaxed">
                {selectedExperience.summary}
              </p>
              <p className="text-sm text-[#1C2820] font-medium">
                Dipandu oleh <span className="font-bold text-[#023423]">{selectedExperience.guideName}</span> · Maks. {selectedExperience.maxGuests} tamu per sesi
              </p>
            </div>

            {/* Jadwal Per Jam */}
            <div className="bg-white rounded-2xl organic-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#023423]">Jadwal Kegiatan Lapangan</h2>
              <ol className="divide-y divide-[#1E4B38]/8">
                {selectedExperience.itinerary.map((step) => (
                  <li key={step.time} className="py-4 first:pt-1 last:pb-1 flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/12 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                      {renderStepIcon(step.icon)}
                    </span>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-bold text-[#D97736] tabular-nums">
                          {step.time}
                        </span>
                        <span className="text-base font-bold text-[#023423]">{step.title}</span>
                      </div>
                      <p className="text-sm text-[#414944] leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Daftar Perlengkapan (Kotak Centang 24x24px) */}
            <div className="bg-white rounded-2xl organic-border p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#023423]">Daftar Perlengkapan Bawaan</h2>
              <div className="divide-y divide-[#1E4B38]/8">
                {selectedExperience.packingList.map((item) => {
                  const key = `${selectedExperience.id}::${item}`;
                  const checked = Boolean(checkedPacking[key]);
                  return (
                    <label
                      key={item}
                      className="min-h-[48px] py-3 flex items-center gap-3.5 cursor-pointer select-none"
                    >
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => togglePackItem(item)}
                        className={`w-6 h-6 rounded border-2 border-[#1E4B38] flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                          checked ? 'bg-[#1E4B38] text-white' : 'bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>
                      <span
                        className={`text-sm md:text-base ${
                          checked ? 'line-through text-[#414944]' : 'text-[#1C2820]'
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kolom Pemesanan Paket */}
          <aside className="lg:col-span-5 bg-white rounded-2xl organic-border highland-shadow p-6 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-1 pb-4 border-b border-[#1E4B38]/10">
              <p className="text-sm text-[#414944]">Tarif Wisata Komunitas</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#D97736] tabular-nums">
                  {formatIdr(selectedExperience.priceIdr)}
                </span>
                <span className="text-sm text-[#414944]">per tamu</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#023423]">Sudah termasuk dalam biaya</p>
              <ul className="space-y-2">
                {selectedExperience.included.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-[#414944]">
                    <span className="w-5 h-5 rounded-full bg-[#4E9F3D]/15 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kalkulator Jumlah Tamu */}
            <div className="bg-[#F9F8F3] rounded-xl p-4 flex items-center justify-between gap-4 organic-border">
              <div>
                <p className="text-sm font-semibold text-[#023423]">Perkiraan Peserta</p>
                <p className="text-xs text-[#414944] tabular-nums">
                  Total: {formatIdr(estimatedTotal)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Kurangi jumlah tamu"
                  onClick={() => setPreviewGuests((g) => Math.max(1, g - 1))}
                  className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] hover:bg-[#E9F7EA] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-base font-bold text-[#023423] tabular-nums">
                  {previewGuests}
                </span>
                <button
                  type="button"
                  aria-label="Tambah jumlah tamu"
                  onClick={() =>
                    setPreviewGuests((g) => Math.min(selectedExperience.maxGuests, g + 1))
                  }
                  className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] hover:bg-[#E9F7EA] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onToggleExperienceInPlan(selectedExperience.id)}
                className={`w-full min-h-[48px] px-5 py-3 rounded-lg text-base font-semibold transition-all active:scale-[0.98] cursor-pointer ${
                  isAdded
                    ? 'bg-[#E9F7EA] text-[#023423] border-[1.5px] border-[#1E4B38]'
                    : 'bg-[#1E4B38] hover:bg-[#023423] text-white'
                }`}
              >
                {isAdded ? 'Sudah di Rencana Kunjungan (Klik untuk Hapus)' : 'Masukkan ke Rencana Kunjungan'}
              </button>

              {isAdded && (
                <button
                  type="button"
                  onClick={onGoToPlan}
                  className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#D97736] hover:bg-[#B86127] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Lanjut ke Rencana &amp; Konfirmasi
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  onOpenWhatsApp(
                    `Tanya Tur: ${selectedExperience.title} (${previewGuests} tamu, Pemandu: ${selectedExperience.guideName})`
                  )
                }
                className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Koordinasi Pemandu via WhatsApp
              </button>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#1A6D0E]">Pengalaman Desa Terpandu</p>
        <h1 className="text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-extrabold tracking-[-0.02em] text-[#023423]">
          Agrowisata, air terjun hutan, dan kriya pekarangan desa
        </h1>
        <p className="text-base text-[#414944]">
          Setiap kegiatan berangkat dalam kelompok kecil bersama petani, jagawana, atau perajin setempat. Ketuk kartu untuk melihat jadwal lengkap.
        </p>
      </div>

      {/* Bilah Filter & Pencarian */}
      <div className="bg-white rounded-2xl organic-border p-4 md:p-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-7 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#1E4B38] text-white border-[#1E4B38]'
                      : 'bg-[#F9F8F3] text-[#1E4B38] border-[#1E4B38]/40 hover:border-[#1E4B38]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-[#414944] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kopi, air terjun, indigo, pemandu..."
              aria-label="Cari aktivitas wisata"
              className="w-full min-h-[48px] pl-11 pr-4 py-2.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] placeholder:text-[#1C2820]/50 focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1E4B38]/8">
          <span className="text-xs font-semibold text-[#414944] mr-1">Ritme jalan:</span>
          {DIFFICULTIES.map((lvl) => {
            const active = difficulty === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setDifficulty(lvl)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#E9F7EA] text-[#023423] border border-[#1E4B38]'
                    : 'text-[#414944] hover:text-[#023423] hover:bg-[#F9F8F3]'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kisi Hasil */}
      {filteredExperiences.length === 0 ? (
        <div className="bg-white rounded-2xl organic-border p-10 text-center space-y-4">
          <p className="text-lg font-bold text-[#023423]">Belum ada aktivitas yang cocok dengan filter</p>
          <p className="text-sm text-[#414944]">
            Coba hapus kata kunci pencarian atau pilih semua tingkat ritme jalan.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('Semua');
              setDifficulty('Semua');
              setSearchQuery('');
            }}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1E4B38] text-white text-sm font-semibold cursor-pointer"
          >
            Atur Ulang Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => {
            const isAdded = plannedExperienceIds.includes(exp.id);
            return (
              <article
                key={exp.id}
                className="bg-white rounded-2xl organic-border overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectExperience(exp)}
                    className="block w-full h-48 overflow-hidden cursor-pointer text-left"
                  >
                    <VillageArt variant={exp.art} className="w-full h-full" label={exp.title} />
                  </button>
                  <div className="p-5 space-y-2.5">
                    <p className="text-xs font-semibold text-[#414944] tabular-nums">
                      {exp.category} · {exp.duration} · {exp.difficulty} · Maks. {exp.maxGuests}
                    </p>
                    <h2 className="text-lg font-bold text-[#023423] leading-snug">
                      {exp.title}
                    </h2>
                    <p className="text-sm text-[#414944] leading-relaxed">{exp.summary}</p>
                    <p className="text-xs text-[#1E4B38] font-medium">
                      Pemandu: {exp.guideName}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#1E4B38]/8 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-[#D97736] tabular-nums">
                        {formatIdr(exp.priceIdr)}
                      </span>
                      <span className="text-xs text-[#414944]"> / tamu</span>
                    </div>
                    <span className="text-xs text-[#414944] tabular-nums">{exp.elevation}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectExperience(exp)}
                      className="min-h-[44px] px-3 py-2 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] hover:bg-[#F9F8F3] text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Jadwal
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleExperienceInPlan(exp.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        isAdded
                          ? 'bg-[#E9F7EA] text-[#023423] border border-[#1E4B38]'
                          : 'bg-[#1E4B38] hover:bg-[#023423] text-white'
                      }`}
                    >
                      {isAdded ? 'Di Rencana' : 'Pilih Tur'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
