export type TravelClassType = '1A' | '2A' | '3A' | 'SL' | 'CC' | '2S' | 'EC';

export interface ClassAvailability {
  className: TravelClassType;
  classLabel: string;
  fare: number;
  availableSeats: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  statusDetails: string; // e.g. "AVAILABLE-0042" or "WL 14"
}

export interface TrainStation {
  code: string;
  name: string;
  city: string;
  state: string;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  hindiName?: string;
  teluguName?: string;
  trainType: 'Vande Bharat' | 'Rajdhani' | 'Shatabdi' | 'Superfast' | 'Mail/Express';
  source: TrainStation;
  destination: TrainStation;
  departureTime: string; // e.g. "06:15"
  arrivalTime: string;   // e.g. "12:45"
  duration: string;      // e.g. "6h 30m"
  distanceKm: number;
  runsOn: string[];      // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  classes: ClassAvailability[];
  pantryAvailable: boolean;
}

export type BerthPreference = 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window' | 'No Preference';

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender';
  berthPreference: BerthPreference;
  allocatedCoach?: string;
  allocatedSeat?: number;
  allocatedBerth?: BerthPreference;
  status?: 'CNF' | 'RAC' | 'WL';
}

export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'WAITING_LIST';

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  userEmail: string;
  userMobile?: string;
  trainNumber: string;
  trainName: string;
  trainType: string;
  source: TrainStation;
  destination: TrainStation;
  departureTime: string;
  arrivalTime: string;
  journeyDate: string; // YYYY-MM-DD
  travelClass: TravelClassType;
  passengers: Passenger[];
  baseFare: number;
  reservationCharge: number;
  superfastCharge: number;
  gst: number;
  totalFare: number;
  bookingStatus: BookingStatus;
  bookedAt: string; // ISO date string
  paymentMethod: string;
  refundAmount?: number;
  cancelledAt?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
}

export type SupportedLanguage = 'en' | 'te' | 'hi';

export type QuotaType = 'GN' | 'TQ' | 'LD' | 'SS'; // General, Tatkal, Ladies, Senior Citizen
