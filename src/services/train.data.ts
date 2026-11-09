import { Train } from '../types';
import { POPULAR_STATIONS } from './stations.data';

const getStation = (code: string) => {
  const station = POPULAR_STATIONS.find(s => s.code === code);
  if (!station) {
    throw new Error(`Station not found: ${code}`);
  }
  return station;
};

export const INITIAL_TRAINS: Train[] = [
  // 1. Hyderabad to Vijayawada - Vande Bharat
  {
    id: 'tr-20701',
    number: '20701',
    name: 'Secunderabad - Tirupati Vande Bharat Express',
    hindiName: 'सिकंदराबाद - तिरुपति वंदे भारत एक्सप्रेस',
    teluguName: 'సికింద్రాబాద్ - తిరుపతి వందే భారత్ ఎక్స్‌ప్రెస్',
    trainType: 'Vande Bharat',
    source: getStation('SC'),
    destination: getStation('BZA'),
    departureTime: '06:00',
    arrivalTime: '09:20',
    duration: '3h 20m',
    distanceKm: 313,
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'CC', classLabel: 'AC Chair Car', fare: 885, availableSeats: 56, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0056' },
      { className: 'EC', classLabel: 'Exec. Chair Car', fare: 1690, availableSeats: 12, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0012' }
    ]
  },
  // 2. Hyderabad to Vijayawada - Godavari Express
  {
    id: 'tr-12728',
    number: '12728',
    name: 'Godavari Superfast Express',
    hindiName: 'गोदावरी सुपरफास्ट एक्सप्रेस',
    teluguName: 'గోదావరి సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('HYB'),
    destination: getStation('BZA'),
    departureTime: '17:05',
    arrivalTime: '22:45',
    duration: '5h 40m',
    distanceKm: 349,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'SL', classLabel: 'Sleeper Class', fare: 245, availableSeats: 82, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0082' },
      { className: '3A', classLabel: 'AC 3 Tier', fare: 650, availableSeats: 34, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0034' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 920, availableSeats: 14, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0014' },
      { className: '1A', classLabel: 'AC First Class', fare: 1540, availableSeats: 4, status: 'RAC', statusDetails: 'RAC 04' }
    ]
  },
  // 3. Vijayawada to Chennai - Pinakini Express
  {
    id: 'tr-12711',
    number: '12711',
    name: 'Pinakini SF Express',
    hindiName: 'पिनाकिनी सुपरफास्ट एक्सप्रेस',
    teluguName: 'పినాకిని సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('BZA'),
    destination: getStation('MAS'),
    departureTime: '06:10',
    arrivalTime: '13:05',
    duration: '6h 55m',
    distanceKm: 431,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: '2S', classLabel: 'Second Sitting', fare: 165, availableSeats: 110, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0110' },
      { className: 'CC', classLabel: 'AC Chair Car', fare: 590, availableSeats: 42, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0042' }
    ]
  },
  // 4. Vijayawada to Chennai - Coromandel Express
  {
    id: 'tr-12841',
    number: '12841',
    name: 'Coromandel Express',
    hindiName: 'कोरोमंडल एक्सप्रेस',
    teluguName: 'కోరమాండల్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('BZA'),
    destination: getStation('MAS'),
    departureTime: '11:15',
    arrivalTime: '17:00',
    duration: '5h 45m',
    distanceKm: 431,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'SL', classLabel: 'Sleeper Class', fare: 285, availableSeats: 18, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0018' },
      { className: '3A', classLabel: 'AC 3 Tier', fare: 760, availableSeats: 0, status: 'WL', statusDetails: 'WL 12' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 1080, availableSeats: 8, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0008' },
      { className: '1A', classLabel: 'AC First Class', fare: 1780, availableSeats: 2, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0002' }
    ]
  },
  // 5. Hyderabad to Bengaluru - Kacheguda Bangalore Express
  {
    id: 'tr-12785',
    number: '12785',
    name: 'Kacheguda - Mysuru SF Express',
    hindiName: 'काचीगुडा - मैसूरु सुपरफास्ट',
    teluguName: 'కాచిగూడ - మైసూరు సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('SC'),
    destination: getStation('SBC'),
    departureTime: '19:05',
    arrivalTime: '06:25',
    duration: '11h 20m',
    distanceKm: 622,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: false,
    classes: [
      { className: 'SL', classLabel: 'Sleeper Class', fare: 375, availableSeats: 48, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0048' },
      { className: '3A', classLabel: 'AC 3 Tier', fare: 990, availableSeats: 22, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0022' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 1410, availableSeats: 6, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0006' },
      { className: '1A', classLabel: 'AC First Class', fare: 2360, availableSeats: 0, status: 'WL', statusDetails: 'WL 04' }
    ]
  },
  // 6. Hyderabad to Bengaluru - Vande Bharat Express
  {
    id: 'tr-20703',
    number: '20703',
    name: 'Kacheguda - Yesvantpur Vande Bharat',
    hindiName: 'काचीगुडा - यशवंतपुर वंदे भारत',
    teluguName: 'కాచిగూడ - యశ్వంతపూర్ వందే భారత్ ఎక్స్‌ప్రెస్',
    trainType: 'Vande Bharat',
    source: getStation('SC'),
    destination: getStation('SBC'),
    departureTime: '05:30',
    arrivalTime: '14:00',
    duration: '8h 30m',
    distanceKm: 618,
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'CC', classLabel: 'AC Chair Car', fare: 1540, availableSeats: 88, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0088' },
      { className: 'EC', classLabel: 'Exec. Chair Car', fare: 2865, availableSeats: 16, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0016' }
    ]
  },
  // 7. Delhi to Mumbai - Mumbai Rajdhani
  {
    id: 'tr-12952',
    number: '12952',
    name: 'New Delhi - Mumbai Central Rajdhani Express',
    hindiName: 'नई दिल्ली - मुंबई सेंट्रल राजधानी एक्सप्रेस',
    teluguName: 'న్యూ ఢిల్లీ - ముంబై సెంట్రల్ రాజధాని ఎక్స్‌ప్రెస్',
    trainType: 'Rajdhani',
    source: getStation('NDLS'),
    destination: getStation('MMCT'),
    departureTime: '16:55',
    arrivalTime: '08:35',
    duration: '15h 40m',
    distanceKm: 1386,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: '3A', classLabel: 'AC 3 Tier', fare: 2195, availableSeats: 64, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0064' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 3180, availableSeats: 26, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0026' },
      { className: '1A', classLabel: 'AC First Class', fare: 4890, availableSeats: 8, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0008' }
    ]
  },
  // 8. Delhi to Mumbai - August Kranti Tejas Rajdhani
  {
    id: 'tr-12954',
    number: '12954',
    name: 'August Kranti Tejas Rajdhani Express',
    hindiName: 'अगस्त क्रांति तेजस राजधानी एक्सप्रेस',
    teluguName: 'ఆగస్ట్ క్రాంతి తేజస్ రాజధాని ఎక్స్‌ప్రెస్',
    trainType: 'Rajdhani',
    source: getStation('NDLS'),
    destination: getStation('MMCT'),
    departureTime: '17:15',
    arrivalTime: '10:05',
    duration: '16h 50m',
    distanceKm: 1377,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: '3A', classLabel: 'AC 3 Tier', fare: 2140, availableSeats: 40, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0040' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 3110, availableSeats: 18, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0018' },
      { className: '1A', classLabel: 'AC First Class', fare: 4790, availableSeats: 5, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0005' }
    ]
  },
  // 9. Visakhapatnam to Hyderabad - Vande Bharat Express
  {
    id: 'tr-20833',
    number: '20833',
    name: 'Visakhapatnam - Secunderabad Vande Bharat',
    hindiName: 'विशाखापट्टनम - सिकंदराबाद वंदे भारत',
    teluguName: 'విశాఖపట్నం - సికింద్రాబాద్ వందే భారత్ ఎక్స్‌ప్రెస్',
    trainType: 'Vande Bharat',
    source: getStation('VSKP'),
    destination: getStation('SC'),
    departureTime: '05:45',
    arrivalTime: '14:15',
    duration: '8h 30m',
    distanceKm: 699,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    pantryAvailable: true,
    classes: [
      { className: 'CC', classLabel: 'AC Chair Car', fare: 1665, availableSeats: 72, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0072' },
      { className: 'EC', classLabel: 'Exec. Chair Car', fare: 3120, availableSeats: 14, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0014' }
    ]
  },
  // 10. Visakhapatnam to Hyderabad - Godavari Express
  {
    id: 'tr-12727',
    number: '12727',
    name: 'Godavari Superfast Express',
    hindiName: 'गोदावरी सुपरफास्ट एक्सप्रेस',
    teluguName: 'గోదావరి సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('VSKP'),
    destination: getStation('HYB'),
    departureTime: '17:20',
    arrivalTime: '06:15',
    duration: '12h 55m',
    distanceKm: 710,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'SL', classLabel: 'Sleeper Class', fare: 410, availableSeats: 96, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0096' },
      { className: '3A', classLabel: 'AC 3 Tier', fare: 1090, availableSeats: 38, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0038' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 1560, availableSeats: 16, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0016' },
      { className: '1A', classLabel: 'AC First Class', fare: 2620, availableSeats: 6, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0006' }
    ]
  },
  // 11. Vijayawada to Visakhapatnam - Ratnachal Express
  {
    id: 'tr-12718',
    number: '12718',
    name: 'Ratnachal Superfast Express',
    hindiName: 'रत्नाचल सुपरफास्ट एक्सप्रेस',
    teluguName: 'రత్నాచల్ సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('BZA'),
    destination: getStation('VSKP'),
    departureTime: '06:15',
    arrivalTime: '12:15',
    duration: '6h 00m',
    distanceKm: 349,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: false,
    classes: [
      { className: '2S', classLabel: 'Second Sitting', fare: 145, availableSeats: 130, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0130' },
      { className: 'CC', classLabel: 'AC Chair Car', fare: 520, availableSeats: 48, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0048' }
    ]
  },
  // 12. Chennai to Bengaluru - Shatabdi Express
  {
    id: 'tr-12007',
    number: '12007',
    name: 'MGR Chennai - Mysuru Shatabdi Express',
    hindiName: 'चेन्नई - मैसूरु शताब्दी एक्सप्रेस',
    teluguName: 'చెన్నై - మైసూరు శతాబ్ది ఎక్స్‌ప్రెస్',
    trainType: 'Shatabdi',
    source: getStation('MAS'),
    destination: getStation('SBC'),
    departureTime: '06:00',
    arrivalTime: '10:55',
    duration: '4h 55m',
    distanceKm: 358,
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: 'CC', classLabel: 'AC Chair Car', fare: 995, availableSeats: 92, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0092' },
      { className: 'EC', classLabel: 'Exec. Chair Car', fare: 1960, availableSeats: 20, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0020' }
    ]
  },
  // 13. Chennai to Bengaluru - Lalbagh Superfast
  {
    id: 'tr-12607',
    number: '12607',
    name: 'Lalbagh SF Express',
    hindiName: 'लालबाग सुपरफास्ट एक्सप्रेस',
    teluguName: 'లాల్‌బాగ్ సూపర్ ఫాస్ట్ ఎక్స్‌ప్రెస్',
    trainType: 'Superfast',
    source: getStation('MAS'),
    destination: getStation('SBC'),
    departureTime: '15:30',
    arrivalTime: '21:35',
    duration: '6h 05m',
    distanceKm: 359,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pantryAvailable: false,
    classes: [
      { className: '2S', classLabel: 'Second Sitting', fare: 150, availableSeats: 85, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0085' },
      { className: 'CC', classLabel: 'AC Chair Car', fare: 535, availableSeats: 32, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0032' }
    ]
  },
  // 14. Delhi to Howrah - Howrah Rajdhani Express
  {
    id: 'tr-12302',
    number: '12302',
    name: 'New Delhi - Howrah Rajdhani Express',
    hindiName: 'नई दिल्ली - हावड़ा राजधानी एक्सप्रेस',
    teluguName: 'న్యూ ఢిల్లీ - హౌరా రాజధాని ఎక్స్‌ప్రెస్',
    trainType: 'Rajdhani',
    source: getStation('NDLS'),
    destination: getStation('HWH'),
    departureTime: '16:50',
    arrivalTime: '09:55',
    duration: '17h 05m',
    distanceKm: 1451,
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
    pantryAvailable: true,
    classes: [
      { className: '3A', classLabel: 'AC 3 Tier', fare: 2280, availableSeats: 45, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0045' },
      { className: '2A', classLabel: 'AC 2 Tier', fare: 3290, availableSeats: 15, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0015' },
      { className: '1A', classLabel: 'AC First Class', fare: 5120, availableSeats: 4, status: 'AVAILABLE', statusDetails: 'AVAILABLE-0004' }
    ]
  }
];
