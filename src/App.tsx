import { useEffect, useState } from 'react';
import { ExperiencesScreen } from './components/ExperiencesScreen';
import { HarvestsScreen } from './components/HarvestsScreen';
import { Header } from './components/Header';
import { HomestaysScreen } from './components/HomestaysScreen';
import { PlanVisitScreen } from './components/PlanVisitScreen';
import { VillageOverview } from './components/VillageOverview';
import { WhatsAppModal } from './components/WhatsAppModal';
import { EXPERIENCES } from './data/villageData';
import { Experience, Homestay, SavedReservation, ScreenId } from './types';

const STORAGE_KEY = 'lereng_asri_reservations_v1';

function getDefaultCheckInDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('village');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [inspectedHomestay, setInspectedHomestay] = useState<Homestay | null>(null);

  // Shared Trip Builder state
  const [checkIn, setCheckIn] = useState<string>(getDefaultCheckInDate);
  const [nights, setNights] = useState<number>(2);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [selectedHomestayId, setSelectedHomestayId] = useState<string | null>('pondok-pak-surya');
  const [plannedExperienceIds, setPlannedExperienceIds] = useState<string[]>([EXPERIENCES[0].id]);
  const [plannedWorkshopIds, setPlannedWorkshopIds] = useState<string[]>([]);

  const [savedReservations, setSavedReservations] = useState<SavedReservation[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedReservation[]) : [];
    } catch {
      return [];
    }
  });

  // WhatsApp Coordination Modal state
  const [waModal, setWaModal] = useState<{ open: boolean; subject: string; message: string }>({
    open: false,
    subject: '',
    message: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReservations));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedReservations]);

  const navigateTo = (screen: ScreenId) => {
    setActiveScreen(screen);
    if (screen !== 'experiences') {
      setSelectedExperience(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExperienceInPlan = (id: string) => {
    setPlannedExperienceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleWorkshopInPlan = (id: string) => {
    setPlannedWorkshopIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectExperienceFromHome = (exp: Experience) => {
    setSelectedExperience(exp);
    setActiveScreen('experiences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHomestayFromHome = (stay: Homestay) => {
    setInspectedHomestay(stay);
    setActiveScreen('homestays');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsAppQuick = (subject: string, customMessage?: string) => {
    setWaModal({
      open: true,
      subject,
      message:
        customMessage ??
        `Halo Lereng Asri! Saya ingin menanyakan rencana kunjungan (${subject}) sekitar tanggal ${checkIn} untuk ${adults} orang dewasa.`,
    });
  };

  const tripItemCount =
    (selectedHomestayId ? 1 : 0) + plannedExperienceIds.length + plannedWorkshopIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F3] text-[#1C2820]">
      <Header
        activeScreen={activeScreen}
        onNavigate={navigateTo}
        tripItemCount={tripItemCount}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 pb-24 md:pb-16">
        {activeScreen === 'village' && (
          <VillageOverview
            onNavigate={navigateTo}
            onSelectExperience={handleSelectExperienceFromHome}
            onSelectHomestay={handleSelectHomestayFromHome}
            onOpenWhatsAppQuick={(subject) => openWhatsAppQuick(subject)}
          />
        )}

        {activeScreen === 'experiences' && (
          <ExperiencesScreen
            selectedExperience={selectedExperience}
            onSelectExperience={(exp) => {
              setSelectedExperience(exp);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            plannedExperienceIds={plannedExperienceIds}
            onToggleExperienceInPlan={toggleExperienceInPlan}
            onOpenWhatsApp={(subject) => openWhatsAppQuick(subject)}
            onGoToPlan={() => navigateTo('plan')}
          />
        )}

        {activeScreen === 'homestays' && (
          <HomestaysScreen
            selectedHomestayId={selectedHomestayId}
            onChooseHomestay={(id) => setSelectedHomestayId(id)}
            inspectedHomestay={inspectedHomestay}
            onInspectHomestay={(stay) => setInspectedHomestay(stay)}
            onGoToPlan={() => navigateTo('plan')}
            onOpenWhatsApp={(subject) => openWhatsAppQuick(subject)}
          />
        )}

        {activeScreen === 'harvests' && (
          <HarvestsScreen
            plannedWorkshopIds={plannedWorkshopIds}
            onToggleWorkshopInPlan={toggleWorkshopInPlan}
            onGoToPlan={() => navigateTo('plan')}
          />
        )}

        {activeScreen === 'plan' && (
          <PlanVisitScreen
            checkIn={checkIn}
            onChangeCheckIn={setCheckIn}
            nights={nights}
            onChangeNights={setNights}
            adults={adults}
            onChangeAdults={setAdults}
            childrenCount={childrenCount}
            onChangeChildrenCount={setChildrenCount}
            selectedHomestayId={selectedHomestayId}
            onSelectHomestayId={setSelectedHomestayId}
            plannedExperienceIds={plannedExperienceIds}
            onToggleExperience={toggleExperienceInPlan}
            plannedWorkshopIds={plannedWorkshopIds}
            onToggleWorkshop={toggleWorkshopInPlan}
            savedReservations={savedReservations}
            onSaveReservation={(res) => setSavedReservations((prev) => [res, ...prev])}
            onDeleteReservation={(id) =>
              setSavedReservations((prev) => prev.filter((item) => item.id !== id))
            }
            onOpenWhatsAppWithMessage={(subject, message) => openWhatsAppQuick(subject, message)}
          />
        )}
      </main>

      <footer className="border-t border-[#1E4B38]/10 bg-[#EFFDF0]/70 pb-20 md:pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-base font-extrabold text-[#023423]">Koperasi Desa Wisata Lereng Asri</p>
            <p className="text-sm text-[#414944]">
              Jl. Teras Padi No. 12, Kecamatan Dataran Tinggi · Buka setiap hari 06.00–20.00 WIB
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-[#1E4B38]">
            <button type="button" onClick={() => navigateTo('village')} className="hover:underline cursor-pointer">
              Desa
            </button>
            <button type="button" onClick={() => navigateTo('experiences')} className="hover:underline cursor-pointer">
              Wisata
            </button>
            <button type="button" onClick={() => navigateTo('homestays')} className="hover:underline cursor-pointer">
              Homestay
            </button>
            <button type="button" onClick={() => navigateTo('harvests')} className="hover:underline cursor-pointer">
              Panen
            </button>
            <button type="button" onClick={() => navigateTo('plan')} className="hover:underline cursor-pointer">
              Rencanakan
            </button>
          </div>
        </div>
      </footer>

      <WhatsAppModal
        isOpen={waModal.open}
        subject={waModal.subject}
        initialMessage={waModal.message}
        onClose={() => setWaModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
