import { TrainStation } from '../types';

export const POPULAR_STATIONS: TrainStation[] = [
  { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana' },
  { code: 'HYB', name: 'Hyderabad Deccan (Nampally)', city: 'Hyderabad', state: 'Telangana' },
  { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', state: 'Andhra Pradesh' },
  { code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'NDLS', name: 'New Delhi', city: 'Delhi', state: 'Delhi' },
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal' },
  { code: 'TPTY', name: 'Tirupati Main', city: 'Tirupati', state: 'Andhra Pradesh' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra' },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar' },
  { code: 'GNT', name: 'Guntur Junction', city: 'Guntur', state: 'Andhra Pradesh' },
  { code: 'RU', name: 'Renigunta Junction', city: 'Tirupati', state: 'Andhra Pradesh' },
];

export function findStationByCode(code: string): TrainStation | undefined {
  const normalized = code.trim().toUpperCase();
  return POPULAR_STATIONS.find(s => s.code === normalized || s.name.toUpperCase().includes(normalized) || s.city.toUpperCase().includes(normalized));
}
