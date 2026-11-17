export type ScreenId = 'village' | 'experiences' | 'homestays' | 'harvests' | 'plan';

export type ExperienceCategory = 'Agrowisata' | 'Jalur Hutan' | 'Kriya Desa';

export type ArtVariant =
  | 'hero-terraces'
  | 'coffee-harvest'
  | 'waterfall-trail'
  | 'indigo-craft'
  | 'tea-sunrise'
  | 'bamboo-cooking'
  | 'pine-ridge'
  | 'homestay-pendopo'
  | 'homestay-pine'
  | 'homestay-lumbung'
  | 'homestay-kabut';

export interface ItineraryStep {
  time: string;
  title: string;
  detail: string;
  icon: 'sun' | 'coffee' | 'footprints' | 'utensils' | 'leaf' | 'camera';
}

export interface Experience {
  id: string;
  title: string;
  category: ExperienceCategory;
  duration: string;
  difficulty: 'Santai' | 'Menengah' | 'Aktif';
  maxGuests: number;
  priceIdr: number;
  guideName: string;
  elevation: string;
  summary: string;
  art: ArtVariant;
  itinerary: ItineraryStep[];
  packingList: string[];
  included: string[];
}

export interface Homestay {
  id: string;
  name: string;
  hostFamily: string;
  zone: 'Pemandangan Terasering' | 'Tepi Pinus' | 'Inti Desa';
  bedrooms: number;
  maxGuests: number;
  pricePerNightIdr: number;
  art: ArtVariant;
  description: string;
  breakfastNote: string;
  amenities: string[];
  availableRooms: number;
}

export interface HarvestSeason {
  id: string;
  months: string;
  name: string;
  weatherSummary: string;
  tempRange: string;
  primaryCrops: string[];
  highlightNote: string;
}

export interface VillageWorkshop {
  id: string;
  title: string;
  schedule: string;
  host: string;
  duration: string;
  priceIdr: number;
  totalSpots: number;
  spotsLeft: number;
  location: string;
  description: string;
}

export interface SavedReservation {
  id: string;
  createdAt: string;
  checkIn: string;
  nights: number;
  adults: number;
  children: number;
  homestayId: string | null;
  experienceIds: string[];
  workshopIds: string[];
  guestName: string;
  guestEmail: string;
  guestWhatsapp: string;
  notes: string;
  totalIdr: number;
}
