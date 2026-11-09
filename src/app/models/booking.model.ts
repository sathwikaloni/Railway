import { TrainStation, TravelClassType } from './train.model';

export type BerthPreference = 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window' | 'No Preference';
export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'WAITING_LIST';

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
  journeyDate: string;
  travelClass: TravelClassType;
  passengers: Passenger[];
  baseFare: number;
  reservationCharge: number;
  superfastCharge: number;
  gst: number;
  totalFare: number;
  bookingStatus: BookingStatus;
  bookedAt: string;
  paymentMethod: string;
  refundAmount?: number;
  cancelledAt?: string;
}
