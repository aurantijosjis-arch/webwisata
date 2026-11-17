import React from 'react';
import { ArrowRight, Compass, Home, Leaf, Sun } from 'lucide-react';
import { EXPERIENCES, HOMESTAYS, TESTIMONIALS, formatIdr } from '../data/villageData';
import { Experience, Homestay, ScreenId } from '../types';
import { VillageArt } from './VillageArt';
import { WhatsAppIcon } from './WhatsAppIcon';

interface VillageOverviewProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectExperience: (exp: Experience) => void;
  onSelectHomestay: (stay: Homestay) => void;
  onOpenWhatsAppQuick: (subject: string) => void;
}

export const VillageOverview: React.FC<VillageOverviewProps> = ({
  onNavigate,
  onSelectExperience,
  onSelectHomestay,
  onOpenWhatsAppQuick,
}) => {
  const featuredExperiences = EXPERIENCES.slice(0, 3);
  const featuredHomestays = HOMESTAYS.slice(0, 2);

  return (
    <div className="space-y-10 md:space-y-16">
      {/* Bagian Hero 2-Kolom */}
      <section className="pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <p className="text-sm font-semibold text-[#1A6D0E] tracking-tight">
                Desa Wisata Alam Pegunungan · 1.150 mdpl · Jawa Barat
              </p>

              <h1 className="text-[30px] leading-[38px] md:text-[40px] md:leading-[48px] font-extrabold tracking-[-0.02em] text-[#023423]">
                Terasering berkabut, dapur tungku kayu, dan jalur alam yang dirawat warga desa.
              </h1>

              <p className="text-base md:text-lg leading-relaxed text-[#414944] max-w-xl">
                Melangkah ke lereng vulkanik subur dua jam dari Bandung. Menginap di homestay kayu milik keluarga desa, memetik kopi arabika pagi bersama petani, dan menyusuri jalan setapak hutan pinus tanpa tergesa.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('experiences')}
                  className="min-h-[48px] px-6 py-3 rounded-lg bg-[#1E4B38] hover:bg-[#023423] active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Jelajahi Wisata
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenWhatsAppQuick('Tanya Kunjungan — Lereng Asri')}
                  className="min-h-[48px] px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] active:scale-[0.98] text-white text-base font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat Koordinator Desa
                </button>
              </div>

              <p className="text-sm text-[#414944]">
                Buka setiap hari 06.00–20.00 WIB · Pendapatan langsung ke warga · Pemandu ramah keluarga
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-[280px] sm:h-[340px] lg:h-full min-h-[340px] rounded-2xl overflow-hidden organic-border highland-shadow">
              <VillageArt
                variant="hero-terraces"
                className="w-full h-full"
                label="Sawah terasering berkabut dan pendopo bambu di Desa Lereng Asri"
              />
            </div>
          </div>
        </div>

        {/* Strip Ringkasan Desa 4-Kolom */}
        <div className="mt-8 md:mt-10 bg-white rounded-2xl organic-border grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#1E4B38]/10">
          <div className="p-5 md:p-6">
            <p className="text-2xl md:text-3xl font-extrabold text-[#023423] tabular-nums">1.150 mdpl</p>
            <p className="mt-1 text-sm text-[#414944]">Udara sejuk pegunungan (16°C–24°C)</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-2xl md:text-3xl font-extrabold text-[#023423] tabular-nums">14 Keluarga</p>
            <p className="mt-1 text-sm text-[#414944]">Homestay kayu kelolaan komunitas</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-2xl md:text-3xl font-extrabold text-[#023423] tabular-nums">6 Jalur</p>
            <p className="mt-1 text-sm text-[#414944]">Jalan santai hingga punggung pinus</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-2xl md:text-3xl font-extrabold text-[#D97736] tabular-nums">100%</p>
            <p className="mt-1 text-sm text-[#414944]">Biaya kunjungan berputar di desa</p>
          </div>
        </div>
      </section>

      {/* Sorotan Musim Berjalan */}
      <section className="bg-[#E9F7EA] rounded-2xl p-6 md:p-8 organic-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1A6D0E]">
              <Sun className="w-4 h-4" />
              <span>Musim November Dataran Tinggi · Panen Kopi Arabika &amp; Jahe Merah</span>
            </div>
            <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.02em] text-[#023423]">
              Petik ceri kopi di lereng teduh dan sangrai sendiri sebelum tengah hari.
            </h2>
            <p className="text-base text-[#414944] max-w-2xl">
              Kabut pagi perlahan terbuka sekitar pukul 08.30, menghadirkan lereng cerah yang nyaman untuk jalan kebun keluarga dan lokakarya pewarnaan indigo.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <button
              type="button"
              onClick={() => onNavigate('harvests')}
              className="min-h-[48px] px-5 py-3 rounded-lg bg-[#D97736] hover:bg-[#B86127] active:scale-[0.98] text-white text-sm font-semibold transition-all whitespace-nowrap cursor-pointer"
            >
              Lihat Kalender Panen
            </button>
            <span className="text-sm text-[#414944] tabular-nums">
              3 lokakarya kriya akhir pekan dibuka
            </span>
          </div>
        </div>
      </section>

      {/* Aktivitas Wisata Pilihan */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#1A6D0E]">Aktivitas Desa Terpandu</p>
            <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.02em] text-[#023423]">
              Berjalan bersama petani dan jagawana lokal
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('experiences')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E4B38] hover:text-[#023423] underline underline-offset-4 whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            Semua 6 pengalaman wisata
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredExperiences.map((exp) => (
            <article
              key={exp.id}
              className="bg-white rounded-2xl organic-border overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div>
                <div className="h-48 w-full overflow-hidden">
                  <VillageArt variant={exp.art} className="w-full h-full" label={exp.title} />
                </div>
                <div className="p-5 space-y-2.5">
                  <p className="text-xs font-semibold text-[#414944] tabular-nums">
                    {exp.category} · {exp.duration} · {exp.difficulty}
                  </p>
                  <h3 className="text-lg font-bold text-[#023423] leading-snug">{exp.title}</h3>
                  <p className="text-sm text-[#414944] leading-relaxed">{exp.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#1E4B38]/8 flex items-center justify-between gap-3">
                <div>
                  <span className="text-base font-bold text-[#D97736] tabular-nums">
                    {formatIdr(exp.priceIdr)}
                  </span>
                  <span className="text-xs text-[#414944]"> / tamu</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectExperience(exp)}
                  className="min-h-[44px] px-4 py-2 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] hover:bg-[#1E4B38] hover:text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Lihat Jadwal
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Homestay Keluarga & Nilai Keramahan Desa */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#1A6D0E]">Penginapan Rumah Kayu Warga</p>
            <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.02em] text-[#023423]">
              Tidur di tepi terasering, bangun bersama sarapan tungku kayu
            </h2>
            <p className="text-base text-[#414944] leading-relaxed">
              Setiap homestay dimiliki langsung oleh keluarga warga Lereng Asri, lengkap dengan selimut wol tebal, air hangat mata air pegunungan, dan sarapan rumahan segar.
            </p>
          </div>

          <ul className="divide-y divide-[#1E4B38]/10 bg-white rounded-2xl organic-border px-5">
            <li className="py-4 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/15 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                <Home className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#023423]">Ramah untuk lansia &amp; anak kecil</p>
                <p className="text-sm text-[#414944]">Tersedia kamar lantai dasar dan jalur jalan kaki landai.</p>
              </div>
            </li>
            <li className="py-4 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/15 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#023423]">Bebas plastik sekali pakai</p>
                <p className="text-sm text-[#414944]">Teko air minum mata air pegunungan diisi ulang di tiap beranda.</p>
              </div>
            </li>
            <li className="py-4 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-[#4E9F3D]/15 text-[#1A6D0E] flex items-center justify-center shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#023423]">Sambutan langsung di gerbang desa</p>
                <p className="text-sm text-[#414944]">Koordinasikan jam kedatangan langsung lewat WhatsApp tuan rumah.</p>
              </div>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => onNavigate('homestays')}
            className="min-h-[48px] px-6 py-3 rounded-lg border-[1.5px] border-[#1E4B38] bg-[#F9F8F3] hover:bg-[#1E4B38] hover:text-white text-[#1E4B38] text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            Lihat Semua 4 Homestay
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredHomestays.map((stay) => (
            <article
              key={stay.id}
              className="bg-white rounded-2xl organic-border overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden">
                  <VillageArt variant={stay.art} className="w-full h-full" label={stay.name} />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-xs font-semibold text-[#414944] tabular-nums">
                    {stay.zone} · {stay.bedrooms} Kamar · Maks. {stay.maxGuests} tamu
                  </p>
                  <h3 className="text-lg font-bold text-[#023423]">{stay.name}</h3>
                  <p className="text-sm text-[#414944]">Tuan rumah: {stay.hostFamily}</p>
                  <p className="text-sm text-[#414944] leading-relaxed">{stay.description}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#1E4B38]/8 flex items-center justify-between gap-3">
                <div>
                  <span className="text-base font-bold text-[#D97736] tabular-nums">
                    {formatIdr(stay.pricePerNightIdr)}
                  </span>
                  <span className="text-xs text-[#414944]"> / malam</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectHomestay(stay)}
                  className="min-h-[44px] px-4 py-2 rounded-lg bg-[#1E4B38] hover:bg-[#023423] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Lihat Detail
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cerita Pengunjung */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#1A6D0E]">Catatan Tamu Terkini</p>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#023423]">
            Pengalaman lintas generasi sepanjang musim
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.name}
              className="bg-white rounded-2xl organic-border p-6 flex flex-col justify-between gap-4"
            >
              <p className="text-sm md:text-base text-[#1C2820] leading-relaxed">
                “{item.quote}”
              </p>
              <footer className="pt-3 border-t border-[#1E4B38]/8">
                <p className="text-sm font-bold text-[#023423]">{item.name}</p>
                <p className="text-xs text-[#414944]">{item.context}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};
