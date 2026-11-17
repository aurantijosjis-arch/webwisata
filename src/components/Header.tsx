import React from 'react';
import { CalendarDays, Compass, Home, MapPin, Mountain } from 'lucide-react';
import { ScreenId } from '../types';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  tripItemCount: number;
}

const NAV_ITEMS: { id: ScreenId; label: string; mobileLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'village', label: 'Desa', mobileLabel: 'Desa', icon: Mountain },
  { id: 'experiences', label: 'Wisata', mobileLabel: 'Wisata', icon: Compass },
  { id: 'homestays', label: 'Homestay', mobileLabel: 'Inap', icon: Home },
  { id: 'harvests', label: 'Panen', mobileLabel: 'Panen', icon: CalendarDays },
  { id: 'plan', label: 'Rencanakan', mobileLabel: 'Rencana', icon: MapPin },
];

export const Header: React.FC<HeaderProps> = ({ activeScreen, onNavigate, tripItemCount }) => {
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F9F8F3]/95 backdrop-blur-md border-b border-[#1E4B38]/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 h-16 flex items-center justify-between gap-8">
          {/* Zona 1: Wordmark tunggal */}
          <button
            type="button"
            onClick={() => onNavigate('village')}
            className="text-xl font-extrabold tracking-tight text-[#023423] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4B38] rounded"
          >
            Lereng Asri
          </button>

          {/* Zona 2: Tautan navigasi satu baris */}
          <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-semibold whitespace-nowrap shrink-0 py-2 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4B38] ${
                    isActive
                      ? 'text-[#023423] border-[#1E4B38]'
                      : 'text-[#414944] border-transparent hover:text-[#023423] hover:border-[#1E4B38]/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zona 3: Satu tombol aksi utama */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('plan')}
              className="min-h-[44px] md:min-h-[40px] px-4 md:px-5 py-2 rounded-lg bg-[#1E4B38] hover:bg-[#023423] active:scale-[0.98] text-white text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4B38] tabular-nums"
            >
              {tripItemCount > 0 ? `Rencana (${tripItemCount})` : 'Pesan Inap'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigasi Bawah Mobile */}
      <nav
        aria-label="Navigasi layar seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F9F8F3]/95 backdrop-blur-md border-t border-[#1E4B38]/10"
      >
        <div className="grid grid-cols-5 h-16 px-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-lg transition-colors cursor-pointer ${
                  isActive ? 'text-[#023423]' : 'text-[#414944]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.75]'}`} />
                <span className={`text-[11px] leading-none whitespace-nowrap ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
