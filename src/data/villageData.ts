import { Experience, HarvestSeason, Homestay, VillageWorkshop } from '../types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'arabica-harvest',
    title: 'Panen & Sangrai Kopi Arabika Pagi',
    category: 'Agrowisata',
    duration: '3,5 jam',
    difficulty: 'Santai',
    maxGuests: 8,
    priceIdr: 185000,
    guideName: 'Kang Dedi Pratama',
    elevation: '1.240 mdpl',
    summary:
      'Petik ceri kopi merah matang di lereng vulkanik teduh bersama petani generasi keempat, lalu sangrai langsung di atas tungku kayu bakar.',
    art: 'coffee-harvest',
    itinerary: [
      {
        time: '07.00',
        title: 'Berkumpul di Balé Kopi Desa',
        detail: 'Menikmati wedang jahe gula aren hangat dan menerima keranjang bambu anyaman.',
        icon: 'sun',
      },
      {
        time: '07.30',
        title: 'Petik Ceri Merah di Kebun Terasering',
        detail: 'Belajar teknik petik pilih buah merah matang di bawah naungan pohon alpukat dan lamtoro.',
        icon: 'leaf',
      },
      {
        time: '09.00',
        title: 'Proses Giling Basah & Jemur Matahari',
        detail: 'Meninjau rumah proses koperasi desa berair mata air pegunungan menghadap lembah timur.',
        icon: 'coffee',
      },
      {
        time: '09.45',
        title: 'Sangrai Kuali Tanah & Seduh Bersama',
        detail: 'Sangrai 200g kopi pilihan untuk dibawa pulang dan santap singkong kukus hangat di beranda.',
        icon: 'utensils',
      },
    ],
    packingList: [
      'Sepatu jalan tertutup dengan sol tidak licin',
      'Jaket tipis penahan angin untuk kabut pagi',
      'Botol minum isi ulang (tersedia stasiun air mata air)',
    ],
    included: [
      '200g kopi arabika desa hasil sangrai sendiri',
      'Kopi pagi tradisional & kudapan singkong rebus',
      'Honorarium langsung untuk petani pendamping',
    ],
  },
  {
    id: 'curug-embun-trail',
    title: 'Jelajah Air Terjun Curug Embun',
    category: 'Jalur Hutan',
    duration: '4 jam',
    difficulty: 'Menengah',
    maxGuests: 10,
    priceIdr: 165000,
    guideName: 'Teh Rina Kusuma',
    elevation: '1.380 mdpl',
    summary:
      'Susuri jalur batu irigasi berlumut menembus rumpun bambu dan hutan pinus lindung menuju air terjun pegunungan yang jernih dan sejuk.',
    art: 'waterfall-trail',
    itinerary: [
      {
        time: '06.45',
        title: 'Pengarahan di Gerbang Jalur Atas',
        detail: 'Pembagian tongkat bambu dan pengarahan keselamatan jalur oleh jagawana desa.',
        icon: 'footprints',
      },
      {
        time: '07.30',
        title: 'Melintasi Saluran Subak & Hutan Bambu',
        detail: 'Mengamati burung kicau endemik pegunungan di sepanjang saluran batu mata air.',
        icon: 'leaf',
      },
      {
        time: '08.45',
        title: 'Istirahat di Kolam Curug Embun',
        detail: 'Waktu santai merendam kaki di air dingin alami, berfoto, dan minum teh rempah hangat.',
        icon: 'camera',
      },
      {
        time: '10.00',
        title: 'Kembali Lewat Punggung Pinus',
        detail: 'Turun perlahan kembali menuju pasar desa untuk mencicipi buah segar lereng gunung.',
        icon: 'sun',
      },
    ],
    packingList: [
      'Sepatu trekking atau sandal gunung bertali',
      'Tas anti air kecil atau handuk jika ingin bermain air',
      'Jas hujan lipat pada musim hujan (Nov–Mar)',
    ],
    included: [
      'Pemandu jagawana resmi hutan desa',
      'Teh serai hangat di saung air terjun',
      'Tiket kontribusi pelestarian jalur hutan',
    ],
  },
  {
    id: 'indigo-botanical-dye',
    title: 'Lokakarya Pewarna Indigo & Cetak Daun',
    category: 'Kriya Desa',
    duration: '3 jam',
    difficulty: 'Santai',
    maxGuests: 6,
    priceIdr: 210000,
    guideName: 'Ibu Ningsih Handayani',
    elevation: '1.150 mdpl',
    summary:
      'Petik daun pakis dan bunga kenikir dari halaman rumah, lalu celupkan syal katun alami ke dalam gentong fermentasi indigo di belakang pendopo Ibu Ningsih.',
    art: 'indigo-craft',
    itinerary: [
      {
        time: '09.30',
        title: 'Jalan Pagi di Kebun Pewarna Alami',
        detail: 'Memetik daun tarum (indigofera), eukaliptus, dan kelopak marigold segar.',
        icon: 'leaf',
      },
      {
        time: '10.15',
        title: 'Menata Pola Daun pada Kain Katun',
        detail: 'Menyusun motif botani di atas kain katun tenun dengan fiksator tawas alami.',
        icon: 'sun',
      },
      {
        time: '11.15',
        title: 'Pencelupan Gentong Indigo Fermentasi',
        detail: 'Tiga kali celup dan oksidasi udara untuk menghasilkan biru hutan hingga biru malam.',
        icon: 'coffee',
      },
      {
        time: '12.15',
        title: 'Buka Ikatan Kain & Makan Siang Hangat',
        detail: 'Melihat hasil motif daun bersama sayur bening dan lauk rumahan desa.',
        icon: 'utensils',
      },
    ],
    packingList: [
      'Pakaian santai yang nyaman jika terkena percikan pewarna',
      'Celemek dan sarung tangan sudah disediakan di lokasi',
    ],
    included: [
      'Syal katun tenun organik (180 × 65 cm) hasil karya sendiri',
      'Seluruh bahan pewarna botani dan fiksator alami',
      'Makan siang rumahan khas keluarga desa',
    ],
  },
  {
    id: 'bamboo-hearth-lunch',
    title: 'Petik Kebun Organik & Masak Bambu Tungku',
    category: 'Agrowisata',
    duration: '3 jam',
    difficulty: 'Santai',
    maxGuests: 8,
    priceIdr: 195000,
    guideName: 'Ibu Sari & Pak Hendra',
    elevation: '1.140 mdpl',
    summary:
      'Panen sayuran hijau dataran tinggi, labu siam muda, dan serai wangi dari bedengan terasering sebelum memasaknya di dalam ruas bambu di atas bara kayu.',
    art: 'bamboo-cooking',
    itinerary: [
      {
        time: '09.00',
        title: 'Panen Sayur Pagi di Kebun Terasering',
        detail: 'Memetik sayuran organik, cabai merah, dan daun pisang langsung dari lahan keluarga.',
        icon: 'leaf',
      },
      {
        time: '10.00',
        title: 'Mengulek Bumbu Segar di Cobek Batu',
        detail: 'Menghaluskan bumbu kemiri, lengkuas, dan kunyit segar hasil kebun pekarangan.',
        icon: 'utensils',
      },
      {
        time: '10.45',
        title: 'Memasak dalam Ruas Bambu Hijau',
        detail: 'Membakar ikan sungai berbumbu atau tahu rempah di dalam bambu muda di atas bara tungku.',
        icon: 'sun',
      },
      {
        time: '11.45',
        title: 'Santap Siang Bersama di Beranda',
        detail: 'Menikmati hidangan hangat menghadap petak sawah bawah ditemani teh tubruk gunung.',
        icon: 'coffee',
      },
    ],
    packingList: [
      'Topi lebar atau topi santai untuk berjalan di kebun',
      'Cantumkan catatan pantangan makanan atau menu vegetarian saat memesan',
    ],
    included: [
      'Seluruh bahan organik kebun (tersedia opsi vegetarian)',
      'Kartu resep keluarga tercetak untuk dibawa pulang',
      'Sajian makan siang 4 menu lengkap',
    ],
  },
  {
    id: 'sunrise-pine-ridge',
    title: 'Fajar Punggung Pinus & Lautan Awan',
    category: 'Jalur Hutan',
    duration: '2,5 jam',
    difficulty: 'Aktif',
    maxGuests: 8,
    priceIdr: 145000,
    guideName: 'Mas Bima Santoso',
    elevation: '1.560 mdpl',
    summary:
      'Berangkat sebelum subuh menyusuri jalur punggung barat di bawah kanopi pinus untuk menyaksikan matahari terbit di atas lautan kabut lembah.',
    art: 'pine-ridge',
    itinerary: [
      {
        time: '04.45',
        title: 'Berangkat dari Gerbang Utara',
        detail: 'Pendakian ringan di atas hamparan jarum pinus dengan lampu kepala yang dipinjamkan.',
        icon: 'footprints',
      },
      {
        time: '05.35',
        title: 'Titik Pandang Fajar Batu Pandang',
        detail: 'Duduk di bangku kayu menyaksikan cahaya pagi menembus puncak gunung dan kabut lembah.',
        icon: 'sun',
      },
      {
        time: '06.15',
        title: 'Seduhan Jahe Panas & Ubi Bakar',
        detail: 'Menghangatkan badan dengan ubi Cilembu bakar dan wedang jahe buatan pemandu.',
        icon: 'coffee',
      },
      {
        time: '06.50',
        title: 'Turun Siang Lewat Kebun Teh Rakyat',
        detail: 'Kembali melewati petak kebun teh warga dengan udara pagi yang segar.',
        icon: 'camera',
      },
    ],
    packingList: [
      'Jaket hangat atau fleece (suhu punggung bukit sekitar 14°C saat fajar)',
      'Sepatu tertutup yang kuat dan nyaman',
      'Lampu kepala disediakan bila Anda tidak membawa',
    ],
    included: [
      'Pemandu lokal jalur puncak & peminjaman senter kepala',
      'Wedang jahe panas dan ubi bakar',
      'Donasi pemeliharaan jalur puncak desa',
    ],
  },
  {
    id: 'artisan-tea-sunrise',
    title: 'Petik Teh Rakyat & Sangrai Wajan Tradisional',
    category: 'Agrowisata',
    duration: '3 jam',
    difficulty: 'Santai',
    maxGuests: 10,
    priceIdr: 175000,
    guideName: 'Pak Ahmad Fauzi',
    elevation: '1.290 mdpl',
    summary:
      'Menyusuri barisan teh berembun bersama sesepuh desa, belajar teknik petik pucuk dua daun, dan menggulung daun teh oolong di atas wajan hangat.',
    art: 'tea-sunrise',
    itinerary: [
      {
        time: '07.15',
        title: 'Masuk Kebun & Pakai Keranjang Petik',
        detail: 'Bertemu Pak Ahmad di batas kebun teh atas saat kabut pagi mulai terangkat.',
        icon: 'sun',
      },
      {
        time: '07.45',
        title: 'Memetik Pucuk Muda Dua Daun',
        detail: 'Memetik pucuk teh bebas pestisida dari tanaman warisan warga lereng gunung.',
        icon: 'leaf',
      },
      {
        time: '08.45',
        title: 'Pelayuan Wajan & Penggulungan Tangan',
        detail: 'Menggulung daun teh hangat di atas tampah bambu hingga aroma bunganya keluar.',
        icon: 'coffee',
      },
      {
        time: '09.45',
        title: 'Uji Cicip Tiga Varian Teh di Pendopo Kayu',
        detail: 'Membandingkan seduhan teh putih, teh hijau, dan oolong sangrai hasil panen desa.',
        icon: 'utensils',
      },
    ],
    packingList: [
      'Disarankan memakai baju lengan panjang untuk embun pagi',
      'Sepatu kets atau sepatu berjalan santai',
    ],
    included: [
      '100g kaleng teh pegunungan hasil olahan sendiri',
      'Sesi uji cicip 3 varian seduhan teh desa',
      'Dukungan langsung bagi koperasi petani teh',
    ],
  },
];

export const HOMESTAYS: Homestay[] = [
  {
    id: 'pondok-pak-surya',
    name: 'Pondok Kayu Pak Surya',
    hostFamily: 'Keluarga Pak Surya & Ibu Ratna',
    zone: 'Pemandangan Terasering',
    bedrooms: 2,
    maxGuests: 4,
    pricePerNightIdr: 420000,
    art: 'homestay-pendopo',
    description:
      'Beranda kayu jati dan bambu yang menghadap langsung ke sawah terasering tempat kabut turun setiap senja.',
    breakfastNote: 'Termasuk sarapan nasi uduk tungku kayu, telur kampung & kopi arabika',
    amenities: [
      'Kamar mandi dalam dengan pancuran air hangat alami',
      'Selimut wol tenun tebal khas pegunungan',
      'Beranda teduh dengan kursi santai menghadap sawah',
      'Lampu cadangan tenaga surya & Wi-Fi stabil',
    ],
    availableRooms: 2,
  },
  {
    id: 'rumah-bambu-ibu-sari',
    name: 'Rumah Bambu Ibu Sari',
    hostFamily: 'Keluarga Ibu Sari',
    zone: 'Inti Desa',
    bedrooms: 3,
    maxGuests: 6,
    pricePerNightIdr: 540000,
    art: 'homestay-lumbung',
    description:
      'Rumah keluarga luas di samping kebun tanaman obat, hanya beberapa langkah dari pasar pagi warga desa.',
    breakfastNote: 'Termasuk bubur hangat, bakwan jagung manis & teh herbal kebun',
    amenities: [
      'Dua kamar tidur terhubung, ideal untuk keluarga atau lansia',
      'Akses kamar lantai dasar tanpa tangga tinggi',
      'Dapur tungku terbuka ramah untuk tamu kapan saja',
      'Taman pekarangan pribadi untuk duduk sore',
    ],
    availableRooms: 1,
  },
  {
    id: 'saung-kabut-timur',
    name: 'Saung Kabut Timur',
    hostFamily: 'Mas Arif & Mbak Dewi',
    zone: 'Tepi Pinus',
    bedrooms: 1,
    maxGuests: 2,
    pricePerNightIdr: 360000,
    art: 'homestay-pine',
    description:
      'Kabin kayu tenang di tepi hutan pinus timur dengan akses langsung ke jalur jalan pagi menuju punggung bukit.',
    breakfastNote: 'Termasuk roti panggang kampung, madu hutan & kopi seduh manual',
    amenities: [
      'Tempat tidur kayu queen menghadap jendela hutan pinus',
      'Balkon pribadi lengkap dengan ketel teh panas',
      'Air mata air pegunungan berpemanas tenaga surya',
      'Meja kerja tenang menghadap pepohonan pinus',
    ],
    availableRooms: 3,
  },
  {
    id: 'lumbung-lestari',
    name: 'Lumbung Padi Lestari',
    hostFamily: 'Pak Hendro & Ibu Maya',
    zone: 'Pemandangan Terasering',
    bedrooms: 2,
    maxGuests: 5,
    pricePerNightIdr: 480000,
    art: 'homestay-kabut',
    description:
      'Lumbung padi kayu tradisional yang dipugar di atas umpak batu dengan panorama terbuka ke seluruh lembah.',
    breakfastNote: 'Termasuk ketan kukus hangat, gula aren & wedang jahe pagi',
    amenities: [
      'Loteng tidur atas + ruang santai kayu di lantai bawah',
      'Bak rendam air hangat dari sumber mata air lereng',
      'Pilihan makan malam rumahan bersama tuan rumah',
      'Dipinjamkan teropong burung dan buku panduan alam',
    ],
    availableRooms: 2,
  },
];

export const HARVEST_SEASONS: HarvestSeason[] = [
  {
    id: 'oct-dec',
    months: 'Okt – Des',
    name: 'Panen Arabika Akhir & Jahe Merah',
    weatherSummary: 'Pagi sejuk cerah dengan kabut lembah di sore hari',
    tempRange: '16°C – 24°C',
    primaryCrops: ['Ceri Kopi Arabika', 'Jahe Merah', 'Labu Siam', 'Madu Hutan'],
    highlightNote:
      'Waktu terbaik menyaksikan lautan awan pagi dan mengikuti pengolahan kopi langsung di koperasi desa.',
  },
  {
    id: 'jan-mar',
    months: 'Jan – Mar',
    name: 'Musim Tanam Terasering Hijau',
    weatherSummary: 'Hujan gunung segar dan hamparan padi hijau terang',
    tempRange: '17°C – 23°C',
    primaryCrops: ['Padi Beras Merah', 'Talas Gunung', 'Serai Wangi', 'Markisa'],
    highlightNote:
      'Air terjun Curug Embun mengalir deras dan warga menggelar pagi gotong royong tanam padi bersama.',
  },
  {
    id: 'apr-jun',
    months: 'Apr – Jun',
    name: 'Punggung Bukit Cerah & Teh Pucuk',
    weatherSummary: 'Cahaya pagi keemasan dan pemandangan puncak gunung jernih',
    tempRange: '15°C – 25°C',
    primaryCrops: ['Teh Oolong Pucuk', 'Alpukat Mentega', 'Cabai Merah', 'Ubi Madu'],
    highlightNote:
      'Jarak pandang paling jernih untuk pendakian fajar Batu Pandang dan lokakarya sangrai teh seharian.',
  },
  {
    id: 'jul-sep',
    months: 'Jul – Sep',
    name: 'Embun Dingin & Syukuran Panen',
    weatherSummary: 'Malam paling sejuk sepanjang tahun dengan jalur setapak kering',
    tempRange: '13°C – 24°C',
    primaryCrops: ['Panen Raya Padi', 'Bunga Kopi', 'Cengkih', 'Kesemek'],
    highlightNote:
      'Perayaan panen desa Seren Taun dengan alunan musik angklung bambu dan makan bersama warga.',
  },
];

export const WORKSHOPS: VillageWorkshop[] = [
  {
    id: 'ws-bamboo-weave',
    title: 'Anyaman Nampan Teh dari Bambu',
    schedule: 'Sabtu · 14.00 – 16.30',
    host: 'Pak Karna (Perajin Bambu)',
    duration: '2,5 jam',
    priceIdr: 120000,
    totalSpots: 10,
    spotsLeft: 4,
    location: 'Pendopo Tengah',
    description:
      'Belajar membelah bilah bambu gunung yang sudah diawetkan dan menganyam nampan bundar untuk dibawa pulang.',
  },
  {
    id: 'ws-angklung-night',
    title: 'Malam Musik Bambu & Cerita Tungku',
    schedule: 'Sabtu · 19.30 – 21.00',
    host: 'Karang Taruna Budaya Desa',
    duration: '1,5 jam',
    priceIdr: 65000,
    totalSpots: 20,
    spotsLeft: 7,
    location: 'Halaman Balé Desa',
    description:
      'Duduk mengelilingi anglo arang hangat sambil memainkan angklung dan mendengarkan kisah rakyat pegunungan.',
  },
  {
    id: 'ws-ferment-jamu',
    title: 'Racik Jamu Jahe & Kunyit Pegunungan',
    schedule: 'Minggu · 09.00 – 11.00',
    host: 'Ibu Yanti (Peramu Herbal)',
    duration: '2 jam',
    priceIdr: 95000,
    totalSpots: 12,
    spotsLeft: 5,
    location: 'Taman Apotek Hidup',
    description:
      'Memarut rimpang segar pegunungan, asam jawa, dan nira aren menjadi minuman penghangat badan pagi hari.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Nadia Kusumah',
    context: 'Keluarga 5 orang · 3 Malam di Rumah Bambu Ibu Sari',
    quote:
      'Orang tua saya yang berusia 68 tahun mendapat kamar lantai dasar menghadap kebun herbal, dan Ibu Sari sudah menyiapkan sarapan hangat sebelum kami jalan pagi.',
  },
  {
    name: 'Daniel & Maya Hartono',
    context: 'Liburan Akhir Pekan · Pondok Kayu Pak Surya',
    quote:
      'Semua rencana jelas sejak sebelum berangkat dari Jakarta—pemandu WhatsApp kami menyambut langsung di gerbang desa dan seluruh biaya masuk ke keluarga tuan rumah.',
  },
  {
    name: 'Rizky Ramadhan',
    context: 'Pejalan Solo · Saung Kabut Timur',
    quote:
      'Bangun di udara pinus 15°C dan naik ke punggung bukit pukul 05.00 terasa sangat tenang. Tidak ada keramaian wisata massal, murni keramahan desa.',
  },
];

export function formatIdr(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}
