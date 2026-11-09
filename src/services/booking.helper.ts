import { Train, TravelClassType, Passenger, BerthPreference, Booking } from '../types';
import { INITIAL_TRAINS } from './train.data';

export function generatePnr(): string {
  // Real Indian Railways PNR format: 3 digits + 7 digits (e.g. 4528192374)
  const prefix = Math.floor(200 + Math.random() * 700); // 200 - 899 (zone indicator)
  const suffix = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${suffix}`;
}

export function calculateFareBreakdown(
  baseFarePerPassenger: number,
  passengersCount: number,
  travelClass: TravelClassType
) {
  const baseTotal = baseFarePerPassenger * passengersCount;
  
  // IRCTC reservation fee per passenger
  const resFeePerPax = travelClass === '1A' ? 60 :
    travelClass === '2A' ? 50 :
    travelClass === '3A' ? 40 :
    travelClass === 'CC' || travelClass === 'EC' ? 40 : 20;
  const reservationCharge = resFeePerPax * passengersCount;

  // Superfast surcharge
  const superfastCharge = (travelClass === 'SL' || travelClass === '2S' ? 30 : 45) * passengersCount;

  // GST 5% applies to AC classes in Indian Railways
  const isAcClass = ['1A', '2A', '3A', 'CC', 'EC'].includes(travelClass);
  const gst = isAcClass ? Math.round((baseTotal + reservationCharge + superfastCharge) * 0.05) : 0;

  const totalFare = baseTotal + reservationCharge + superfastCharge + gst;

  return {
    baseFare: baseTotal,
    reservationCharge,
    superfastCharge,
    gst,
    totalFare
  };
}

export function allocateSeats(passengers: Passenger[], travelClass: TravelClassType, preferredCoach?: string): Passenger[] {
  // Generate coach name based on travel class
  let coachPrefix = 'S';
  if (travelClass === '1A') coachPrefix = 'H';
  else if (travelClass === '2A') coachPrefix = 'A';
  else if (travelClass === '3A') coachPrefix = 'B';
  else if (travelClass === 'CC') coachPrefix = 'C';
  else if (travelClass === 'EC') coachPrefix = 'E';
  else if (travelClass === '2S') coachPrefix = 'D';

  const defaultCoach = preferredCoach || `${coachPrefix}${Math.floor(1 + Math.random() * 4)}`;
  const startingSeat = Math.floor(10 + Math.random() * 40);

  const berthCycle: BerthPreference[] = ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper', 'Lower'];

  return passengers.map((p, idx) => {
    // If user already interactively chose their seat and coach, honor it!
    if (p.allocatedSeat && p.allocatedCoach) {
      return {
        ...p,
        status: 'CNF'
      };
    }

    const seatNum = startingSeat + idx;
    const assignedBerth = (p.berthPreference !== 'No Preference' && p.berthPreference)
      ? p.berthPreference
      : (travelClass === 'CC' || travelClass === 'EC')
        ? 'Window'
        : berthCycle[idx % berthCycle.length];

    return {
      ...p,
      allocatedCoach: defaultCoach,
      allocatedSeat: seatNum,
      allocatedBerth: assignedBerth,
      status: 'CNF'
    };
  });
}

export function searchTrains(fromCode?: string, toCode?: string, date?: string): Train[] {
  let results = [...INITIAL_TRAINS];

  if (fromCode && toCode) {
    const fromUpper = fromCode.trim().toUpperCase();
    const toUpper = toCode.trim().toUpperCase();

    const exactMatches = results.filter(
      t => (t.source.code === fromUpper || t.source.city.toUpperCase().includes(fromUpper)) &&
           (t.destination.code === toUpper || t.destination.city.toUpperCase().includes(toUpper))
    );

    if (exactMatches.length > 0) {
      return exactMatches;
    }

    // If reverse route or similar, find relevant trains
    const reverseMatches = results.filter(
      t => (t.source.code === toUpper || t.source.city.toUpperCase().includes(toUpper)) &&
           (t.destination.code === fromUpper || t.destination.city.toUpperCase().includes(fromUpper))
    );
    if (reverseMatches.length > 0) {
      return reverseMatches;
    }
  } else if (fromCode) {
    const fromUpper = fromCode.trim().toUpperCase();
    return results.filter(
      t => t.source.code === fromUpper || t.source.city.toUpperCase().includes(fromUpper)
    );
  }

  // Fallback: return popular trains if no exact query or empty
  return results;
}
