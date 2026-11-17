import React, { useMemo, useState } from 'react';
import { Calendar, Check, Minus, Plus, Trash2 } from 'lucide-react';
import { EXPERIENCES, HOMESTAYS, WORKSHOPS, formatIdr } from '../data/villageData';
import { SavedReservation } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PlanVisitScreenProps {
  checkIn: string;
  onChangeCheckIn: (val: string) => void;
  nights: number;
  onChangeNights: (val: number) => void;
  adults: number;
  onChangeAdults: (val: number) => void;
  childrenCount: number;
  onChangeChildrenCount: (val: number) => void;
  selectedHomestayId: string | null;
  onSelectHomestayId: (id: string | null) => void;
  plannedExperienceIds: string[];
  onToggleExperience: (id: string) => void;
  plannedWorkshopIds: string[];
  onToggleWorkshop: (id: string) => void;
  savedReservations: SavedReservation[];
  onSaveReservation: (reservation: SavedReservation) => void;
  onDeleteReservation: (id: string) => void;
  onOpenWhatsAppWithMessage: (subject: string, message: string) => void;
}

const CONSERVATION_FEE_IDR = 25000;

export const PlanVisitScreen: React.FC<PlanVisitScreenProps> = ({
  checkIn,
  onChangeCheckIn,
  nights,
  onChangeNights,
  adults,
  onChangeAdults,
  childrenCount,
  onChangeChildrenCount,
  selectedHomestayId,
  onSelectHomestayId,
  plannedExperienceIds,
  onToggleExperience,
  plannedWorkshopIds,
  onToggleWorkshop,
  savedReservations,
  onSaveReservation,
  onDeleteReservation,
  onOpenWhatsAppWithMessage,
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestWhatsapp, setGuestWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [recentConfirmedId, setRecentConfirmedId] = useState<string | null>(null);

  const selectedHomestay = useMemo(
    () => HOMESTAYS.find((h) => h.id === selectedHomestayId) ?? null,
    [selectedHomestayId]
  );

  const selectedExperiences = useMemo(
    () => EXPERIENCES.filter((e) => plannedExperienceIds.includes(e.id)),
    [plannedExperienceIds]
  );

  const selectedWorkshops = useMemo(
    () => WORKSHOPS.filter((w) => plannedWorkshopIds.includes(w.id)),
    [plannedWorkshopIds]
  );

  const homestayTotal = selectedHomestay ? selectedHomestay.pricePerNightIdr * nights : 0;
  const effectiveTourParticipants = adults + childrenCount * 0.5;
  const experiencesTotal = selectedExperiences.reduce(
    (sum, exp) => sum + Math.round(exp.priceIdr * effectiveTourParticipants),
    0
  );
  const workshopsTotal = selectedWorkshops.reduce(
    (sum, ws) => sum + ws.priceIdr * (adults + childrenCount),
    0
  );
  const hasAnyItem =
    selectedHomestay !== null ||
    selectedExperiences.length > 0 ||
    selectedWorkshops.length > 0;
  const conservationFee = hasAnyItem ? CONSERVATION_FEE_IDR : 0;
  const grandTotal = homestayTotal + experiencesTotal + workshopsTotal + conservationFee;

  const buildWhatsAppSummary = (refCode?: string) => {
    const lines = [
      `Halo Lereng Asri!${refCode ? ` (Kode Ref: ${refCode})` : ''}`,
      `Nama Tamu: ${guestName || 'Calon Pengunjung'}`,
      `Tanggal Tiba: ${checkIn} (${nights} malam)`,
      `Rombongan: ${adults} dewasa${childrenCount > 0 ? `, ${childrenCount} anak` : ''}`,
      selectedHomestay
        ? `Homestay: ${selectedHomestay.name} (${selectedHomestay.hostFamily})`
        : 'Homestay: Kunjungan Harian (Tanpa Menginap)',
      selectedExperiences.length > 0
        ? `Wisata Terpilih: ${selectedExperiences.map((e) => e.title).join(', ')}`
        : 'Wisata Terpilih: Belum dipilih',
      selectedWorkshops.length > 0
        ? `Lokakarya: ${selectedWorkshops.map((w) => w.title).join(', ')}`
        : null,
      `Perkiraan Total: ${formatIdr(grandTotal)}`,
      notes.trim() ? `Catatan: ${notes.trim()}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!hasAnyItem) {
      errors.selection = 'Pilih minimal satu homestay, paket wisata, atau lokakarya sebelum mengonfirmasi.';
    }
    if (guestName.trim().length < 2) {
      errors.guestName = 'Mohon isi nama lengkap Anda.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim())) {
      errors.guestEmail = 'Mohon masukkan alamat email yang valid.';
    }
    if (guestWhatsapp.replace(/\D/g, '').length < 8) {
      errors.guestWhatsapp = 'Mohon masukkan nomor WhatsApp atau telepon yang valid.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const newId = `LA-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
      .toString()
      .slice(-4)}`;

    const reservation: SavedReservation = {
      id: newId,
      createdAt: new Date().toISOString(),
      checkIn,
      nights,
      adults,
      children: childrenCount,
      homestayId: selectedHomestayId,
      experienceIds: [...plannedExperienceIds],
      workshopIds: [...plannedWorkshopIds],
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestWhatsapp: guestWhatsapp.trim(),
      notes: notes.trim(),
      totalIdr: grandTotal,
    };

    onSaveReservation(reservation);
    setRecentConfirmedId(newId);
    setFormErrors({});
  };

  return (
    <div className="space-y-10 pt-4">
      <div className="space-y-2 max-w-2xl">
        <p className="text-sm font-semibold text-[#1A6D0E]">Penyusun Rencana &amp; Pemesanan Desa</p>
        <h1 className="text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] font-extrabold tracking-[-0.02em] text-[#023423]">
          Rencanakan kunjungan Anda di Lereng Asri
        </h1>
        <p className="text-base text-[#414944]">
          Tentukan tanggal menginap, homestay keluarga, dan aktivitas di bawah ini. Tidak ada pembayaran daring di muka—konfirmasi dilakukan langsung bersama koordinator desa.
        </p>
      </div>

      {recentConfirmedId && (
        <div
          role="status"
          className="bg-[#E9F7EA] border-[1.5px] border-[#1E4B38] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#1A6D0E]">
              Permintaan Reservasi Tersimpan · Kode {recentConfirmedId}
            </p>
            <p className="text-base font-bold text-[#023423]">
              Terima kasih, {guestName}. Keluarga tuan rumah siap menyambut kedatangan Anda.
            </p>
            <p className="text-sm text-[#414944]">
              Anda dapat langsung mengirim kode referensi ini lewat WhatsApp atau melihat daftarnya di bagian bawah.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenWhatsAppWithMessage(
                `Kode Reservasi ${recentConfirmedId}`,
                buildWhatsAppSummary(recentConfirmedId)
              )
            }
            className="min-h-[48px] px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Kirim Kode via WhatsApp
          </button>
        </div>
      )}

      <form onSubmit={handleConfirmSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Penyusun Rencana */}
        <div className="lg:col-span-7 space-y-6">
          {/* Langkah 1: Tanggal & Jumlah Peserta */}
          <section className="bg-white rounded-2xl organic-border p-6 space-y-5">
            <h2 className="text-xl font-bold text-[#023423]">1. Tanggal &amp; Jumlah Rombongan</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkin-date" className="block text-sm font-semibold text-[#023423] mb-1.5">
                  Tanggal Kedatangan
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#414944] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="checkin-date"
                    type="date"
                    value={checkIn}
                    onChange={(e) => onChangeCheckIn(e.target.value)}
                    className="w-full min-h-[48px] pl-10 pr-3 py-2.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm font-medium text-[#1C2820] tabular-nums focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-semibold text-[#023423] mb-1.5">
                  Lama Menginap
                </span>
                <div className="min-h-[48px] px-3 rounded-lg bg-[#F9F8F3] border border-[#1E4B38]/15 flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Kurangi jumlah malam"
                    onClick={() => onChangeNights(Math.max(1, nights - 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-[#023423] tabular-nums">
                    {nights} Malam
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah jumlah malam"
                    onClick={() => onChangeNights(Math.min(14, nights + 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F9F8F3] flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#023423]">Dewasa</p>
                  <p className="text-xs text-[#414944]">Usia 13+ tahun</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Kurangi tamu dewasa"
                    onClick={() => onChangeAdults(Math.max(1, adults - 1))}
                    className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-7 text-center text-base font-bold text-[#023423] tabular-nums">
                    {adults}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah tamu dewasa"
                    onClick={() => onChangeAdults(Math.min(12, adults + 1))}
                    className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9F8F3] flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#023423]">Anak-anak</p>
                  <p className="text-xs text-[#414944]">Tarif setengah pada tur jalan</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Kurangi jumlah anak"
                    onClick={() => onChangeChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-7 text-center text-base font-bold text-[#023423] tabular-nums">
                    {childrenCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah jumlah anak"
                    onClick={() => onChangeChildrenCount(Math.min(10, childrenCount + 1))}
                    className="w-11 h-11 rounded-lg bg-white border border-[#1E4B38]/20 flex items-center justify-center text-[#023423] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Langkah 2: Pilih Homestay */}
          <section className="bg-white rounded-2xl organic-border p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#023423]">2. Pilihan Homestay Keluarga</h2>
            <div className="divide-y divide-[#1E4B38]/8" role="radiogroup" aria-label="Pilih homestay">
              <label className="min-h-[56px] py-3.5 flex items-center justify-between gap-4 cursor-pointer">
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selectedHomestayId === null}
                    onClick={() => onSelectHomestayId(null)}
                    className={`w-6 h-6 rounded-full border-2 border-[#1E4B38] flex items-center justify-center shrink-0 cursor-pointer ${
                      selectedHomestayId === null ? 'bg-[#1E4B38]' : 'bg-white'
                    }`}
                  >
                    {selectedHomestayId === null && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </button>
                  <div>
                    <p className="text-sm font-bold text-[#023423]">Kunjungan Harian (Tanpa Menginap)</p>
                    <p className="text-xs text-[#414944]">Mengikuti wisata pagi atau lokakarya tanpa penginapan</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#414944] tabular-nums">Rp 0</span>
              </label>

              {HOMESTAYS.map((stay) => {
                const selected = selectedHomestayId === stay.id;
                return (
                  <label
                    key={stay.id}
                    className="min-h-[60px] py-3.5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onSelectHomestayId(stay.id)}
                        className={`w-6 h-6 rounded-full border-2 border-[#1E4B38] flex items-center justify-center shrink-0 cursor-pointer ${
                          selected ? 'bg-[#1E4B38]' : 'bg-white'
                        }`}
                      >
                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </button>
                      <div>
                        <p className="text-sm font-bold text-[#023423]">{stay.name}</p>
                        <p className="text-xs text-[#414944] tabular-nums">
                          {stay.hostFamily} · {stay.zone} · Maks. {stay.maxGuests} tamu
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#D97736] tabular-nums">
                        {formatIdr(stay.pricePerNightIdr)}
                      </p>
                      <p className="text-xs text-[#414944]">/ malam</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Langkah 3: Pilih Wisata & Lokakarya */}
          <section className="bg-white rounded-2xl organic-border p-6 space-y-5">
            <h2 className="text-xl font-bold text-[#023423]">3. Wisata Terpandu &amp; Lokakarya</h2>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#1A6D0E]">Jalan Jelajah &amp; Agrowisata Desa</p>
              <div className="divide-y divide-[#1E4B38]/8">
                {EXPERIENCES.map((exp) => {
                  const checked = plannedExperienceIds.includes(exp.id);
                  return (
                    <label
                      key={exp.id}
                      className="min-h-[56px] py-3 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => onToggleExperience(exp.id)}
                          className={`w-6 h-6 rounded border-2 border-[#1E4B38] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            checked ? 'bg-[#1E4B38] text-white' : 'bg-white text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>
                        <div>
                          <p className="text-sm font-bold text-[#023423]">{exp.title}</p>
                          <p className="text-xs text-[#414944] tabular-nums">
                            {exp.duration} · {exp.difficulty} · Pemandu: {exp.guideName}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#D97736] tabular-nums shrink-0">
                        {formatIdr(exp.priceIdr)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#1E4B38]/10">
              <p className="text-xs font-semibold text-[#1A6D0E]">Lokakarya Kriya Akhir Pekan</p>
              <div className="divide-y divide-[#1E4B38]/8">
                {WORKSHOPS.map((ws) => {
                  const checked = plannedWorkshopIds.includes(ws.id);
                  return (
                    <label
                      key={ws.id}
                      className="min-h-[56px] py-3 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => onToggleWorkshop(ws.id)}
                          className={`w-6 h-6 rounded border-2 border-[#1E4B38] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            checked ? 'bg-[#1E4B38] text-white' : 'bg-white text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>
                        <div>
                          <p className="text-sm font-bold text-[#023423]">{ws.title}</p>
                          <p className="text-xs text-[#414944] tabular-nums">
                            {ws.schedule} · {ws.location}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#D97736] tabular-nums shrink-0">
                        {formatIdr(ws.priceIdr)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Langkah 4: Data Pemesan */}
          <section className="bg-white rounded-2xl organic-border p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#023423]">4. Data Pengunjung</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guest-name" className="block text-sm font-semibold text-[#023423] mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  id="guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="cth. Nadia Kusumah"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] placeholder:text-[#1C2820]/50 focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
                />
                {formErrors.guestName && (
                  <p className="mt-1 text-xs font-semibold text-[#BA1A1A]">{formErrors.guestName}</p>
                )}
              </div>

              <div>
                <label htmlFor="guest-whatsapp" className="block text-sm font-semibold text-[#023423] mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  id="guest-whatsapp"
                  type="tel"
                  value={guestWhatsapp}
                  onChange={(e) => setGuestWhatsapp(e.target.value)}
                  placeholder="+62 812 3456 7890"
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] placeholder:text-[#1C2820]/50 focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
                />
                {formErrors.guestWhatsapp && (
                  <p className="mt-1 text-xs font-semibold text-[#BA1A1A]">{formErrors.guestWhatsapp}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="guest-email" className="block text-sm font-semibold text-[#023423] mb-1.5">
                Alamat Email
              </label>
              <input
                id="guest-email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="nama@contoh.com"
                className="w-full min-h-[48px] px-4 py-2.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] placeholder:text-[#1C2820]/50 focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
              />
              {formErrors.guestEmail && (
                <p className="mt-1 text-xs font-semibold text-[#BA1A1A]">{formErrors.guestEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="guest-notes" className="block text-sm font-semibold text-[#023423] mb-1.5">
                Catatan Makanan, Aksesibilitas, atau Jam Tiba (Opsional)
              </label>
              <textarea
                id="guest-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="cth. Menu vegetarian untuk 1 orang, mohon kamar lantai dasar untuk orang tua"
                className="w-full p-3.5 rounded-lg bg-white border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] placeholder:text-[#1C2820]/50 focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
              />
            </div>
          </section>
        </div>

        {/* Kolom Ringkasan Biaya */}
        <aside className="lg:col-span-5 bg-white rounded-2xl organic-border highland-shadow p-6 space-y-5 lg:sticky lg:top-24">
          <div className="space-y-1 pb-4 border-b border-[#1E4B38]/10">
            <h2 className="text-xl font-bold text-[#023423]">Ringkasan Rencana Kunjungan</h2>
            <p className="text-xs text-[#414944] tabular-nums">
              {checkIn} · {nights} malam · {adults} dewasa
              {childrenCount > 0 ? `, ${childrenCount} anak` : ''}
            </p>
          </div>

          {!hasAnyItem ? (
            <p className="text-sm text-[#414944] py-4">
              Pilih homestay, wisata terpandu, atau lokakarya di sebelah kiri untuk melihat rincian kontribusi desa.
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              {selectedHomestay && (
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#023423]">{selectedHomestay.name}</p>
                    <p className="text-xs text-[#414944] tabular-nums">
                      {formatIdr(selectedHomestay.pricePerNightIdr)} × {nights} malam
                    </p>
                  </div>
                  <span className="font-bold text-[#1C2820] tabular-nums">
                    {formatIdr(homestayTotal)}
                  </span>
                </div>
              )}

              {selectedExperiences.map((exp) => (
                <div key={exp.id} className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#023423]">{exp.title}</p>
                    <p className="text-xs text-[#414944] tabular-nums">
                      {adults} dewasa
                      {childrenCount > 0 ? ` + ${childrenCount} anak (50%)` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-[#1C2820] tabular-nums">
                    {formatIdr(Math.round(exp.priceIdr * effectiveTourParticipants))}
                  </span>
                </div>
              ))}

              {selectedWorkshops.map((ws) => (
                <div key={ws.id} className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#023423]">{ws.title}</p>
                    <p className="text-xs text-[#414944] tabular-nums">
                      {adults + childrenCount} kursi
                    </p>
                  </div>
                  <span className="font-bold text-[#1C2820] tabular-nums">
                    {formatIdr(ws.priceIdr * (adults + childrenCount))}
                  </span>
                </div>
              ))}

              <div className="flex justify-between gap-3 pt-2 border-t border-[#1E4B38]/8">
                <span className="text-[#414944]">Iuran Perawatan Jalur &amp; Mata Air</span>
                <span className="font-semibold text-[#1C2820] tabular-nums">
                  {formatIdr(conservationFee)}
                </span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#1E4B38]/12 flex items-baseline justify-between">
            <span className="text-base font-bold text-[#023423]">Perkiraan Total Desa</span>
            <span className="text-2xl font-extrabold text-[#D97736] tabular-nums">
              {formatIdr(grandTotal)}
            </span>
          </div>

          <div className="bg-[#EFFDF0] rounded-xl p-3.5 text-xs text-[#1E4B38] space-y-1">
            <p className="font-bold">Transparansi Dana Komunitas</p>
            <p>
              85% diterima langsung oleh keluarga tuan rumah dan pemandu; 15% untuk perawatan jalur hutan dan mata air desa. Pembayaran dilakukan saat tiba (tunai atau QRIS).
            </p>
          </div>

          {formErrors.selection && (
            <p className="text-xs font-semibold text-[#BA1A1A]">{formErrors.selection}</p>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] active:scale-[0.98] text-white text-base font-semibold transition-all cursor-pointer"
            >
              Simpan Permintaan Reservasi
            </button>

            <button
              type="button"
              onClick={() =>
                onOpenWhatsAppWithMessage(
                  'Rencana Kunjungan Lereng Asri',
                  buildWhatsAppSummary()
                )
              }
              className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Kirim Rencana via WhatsApp
            </button>
          </div>
        </aside>
      </form>

      {/* Riwayat Reservasi Tersimpan */}
      {savedReservations.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-[#023423]">Daftar Permintaan Reservasi Tersimpan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {savedReservations.map((res) => {
              const stay = HOMESTAYS.find((h) => h.id === res.homestayId);
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl organic-border p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#1A6D0E] tabular-nums">
                        Kode {res.id}
                      </span>
                      <span className="text-xs text-[#414944] tabular-nums">
                        Tiba: {res.checkIn} ({res.nights} malam)
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#023423]">
                      {stay ? stay.name : 'Kunjungan Harian'} · {res.guestName}
                    </h3>
                    <p className="text-xs text-[#414944] tabular-nums">
                      {res.adults} dewasa
                      {res.children > 0 ? `, ${res.children} anak` : ''} ·{' '}
                      {res.experienceIds.length} wisata ·{' '}
                      {res.workshopIds.length} lokakarya
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1E4B38]/8 flex items-center justify-between gap-3">
                    <span className="text-base font-extrabold text-[#D97736] tabular-nums">
                      {formatIdr(res.totalIdr)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenWhatsAppWithMessage(
                            `Kode Reservasi ${res.id}`,
                            `Halo Lereng Asri, saya ingin menindaklanjuti reservasi ${res.id} atas nama ${res.guestName} untuk kedatangan ${res.checkIn} (${res.nights} malam).`
                          )
                        }
                        className="min-h-[40px] px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        aria-label={`Hapus reservasi ${res.id}`}
                        onClick={() => onDeleteReservation(res.id)}
                        className="min-h-[40px] px-2.5 py-1.5 rounded-lg border border-[#1E4B38]/20 text-[#414944] hover:text-[#BA1A1A] hover:border-[#BA1A1A]/40 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
