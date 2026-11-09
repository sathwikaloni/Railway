export type TravelClassType = '1A' | '2A' | '3A' | 'SL' | 'CC' | '2S' | 'EC';

export interface ClassAvailability {
  className: TravelClassType;
  classLabel: string;
  fare: number;
  availableSeats: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  statusDetails: string;
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
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runsOn: string[];
  classes: ClassAvailability[];
  pantryAvailable: boolean;
}
