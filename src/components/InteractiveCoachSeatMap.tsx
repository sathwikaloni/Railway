import React, { useState, useMemo } from 'react';
import { 
  Train, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw, 
  User as UserIcon, 
  Layers, 
  Info,
  ChevronRight,
  ShieldCheck,
  DoorOpen,
  ArrowRight
} from 'lucide-react';
import { TravelClassType, Passenger, BerthPreference } from '../types';
import { useLocalization } from '../i18n/LocalizationContext';

interface SeatInfo {
  seatNumber: number;
  berthType: BerthPreference;
  columnPosition?: 'window' | 'middle' | 'aisle' | 'side-lower' | 'side-upper';
  bayNumber?: number;
  isBooked: boolean;
}

interface InteractiveCoachSeatMapProps {
  travelClass: TravelClassType;
  trainNumber: string;
  trainName: string;
  passengers: Passenger[];
  onUpdatePassengerSeat: (passengerIndex: number, coach: string, seatNumber: number, berth: BerthPreference) => void;
  onClearAllSeats: () => void;
}

export const InteractiveCoachSeatMap: React.FC<InteractiveCoachSeatMapProps> = ({
  travelClass,
  trainNumber,
  trainName,
  passengers,
  onUpdatePassengerSeat,
  onClearAllSeats
}) => {
  const { t } = useLocalization();

  // Get available coaches for this class
  const coachList = useMemo(() => {
    switch (travelClass) {
      case '1A': return ['H1'];
      case '2A': return ['A1', 'A2'];
      case '3A': return ['B1', 'B2', 'B3', 'B4'];
      case 'CC': return ['C1', 'C2', 'C3'];
      case 'EC': return ['E1', 'E2'];
      case '2S': return ['D1', 'D2', 'D3'];
      case 'SL':
      default: return ['S1', 'S2', 'S3', 'S4'];
    }
  }, [travelClass]);

  // Selected coach (default to first coach or the coach of the first assigned passenger)
  const [selectedCoach, setSelectedCoach] = useState<string>(
    passengers[0]?.allocatedCoach || coachList[0]
  );

  // Active passenger index for whom we are picking a seat
  const [activePassengerIndex, setActivePassengerIndex] = useState<number>(0);

  // Generate realistic seats for the selected coach
  const seatsData = useMemo(() => {
    // Generate deterministic booked seats based on coach name + train number
    const seed = (trainNumber + selectedCoach).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isSeatPreBooked = (seatNum: number) => {
      // Deterministic pseudorandom: some seats booked, but ensure plenty of nice seats available
      const pseudo = Math.sin(seed * 997 + seatNum * 13) * 10000;
      const val = pseudo - Math.floor(pseudo);
      return val < 0.38; // ~38% pre-booked
    };

    const seats: SeatInfo[] = [];

    if (travelClass === 'CC' || travelClass === '2S') {
      // Chair Car: 15 rows of 5 seats (2+3 layout, seats 1 to 75)
      let currentSeat = 1;
      for (let row = 1; row <= 15; row++) {
        // Left side (2 seats): Window (A), Aisle (B)
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'Window',
          columnPosition: 'window',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'No Preference',
          columnPosition: 'aisle',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        // Right side (3 seats): Aisle (C), Middle (D), Window (E)
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'No Preference',
          columnPosition: 'aisle',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'Middle',
          columnPosition: 'middle',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'Window',
          columnPosition: 'window',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
      }
    } else if (travelClass === 'EC') {
      // Executive Chair Car: 12 rows of 4 seats (2+2 layout, seats 1 to 48)
      let currentSeat = 1;
      for (let row = 1; row <= 12; row++) {
        // Left Window, Left Aisle, Right Aisle, Right Window
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'Window',
          columnPosition: 'window',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'No Preference',
          columnPosition: 'aisle',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'No Preference',
          columnPosition: 'aisle',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
        seats.push({
          seatNumber: currentSeat++,
          berthType: 'Window',
          columnPosition: 'window',
          bayNumber: row,
          isBooked: isSeatPreBooked(currentSeat - 1)
        });
      }
    } else if (travelClass === '3A' || travelClass === 'SL') {
      // Sleeper & 3-Tier AC: 8 bays of 8 berths (64 berths total)
      // In each 8-berth cabin:
      // 1: LB, 2: MB, 3: UB, 4: LB, 5: MB, 6: UB, 7: SL, 8: SU
      const berthPattern: BerthPreference[] = [
        'Lower', 'Middle', 'Upper',
        'Lower', 'Middle', 'Upper',
        'Side Lower', 'Side Upper'
      ];
      for (let bay = 1; bay <= 8; bay++) {
        for (let idx = 0; idx < 8; idx++) {
          const seatNum = (bay - 1) * 8 + (idx + 1);
          const bType = berthPattern[idx];
          seats.push({
            seatNumber: seatNum,
            berthType: bType,
            columnPosition: bType.startsWith('Side') ? (bType === 'Side Lower' ? 'side-lower' : 'side-upper') : (bType === 'Lower' ? 'window' : 'aisle'),
            bayNumber: bay,
            isBooked: isSeatPreBooked(seatNum)
          });
        }
      }
    } else if (travelClass === '2A') {
      // 2 Tier AC: 8 bays of 6 berths (48 berths total)
      // 1: LB, 2: UB, 3: LB, 4: UB, 5: SL, 6: SU
      const berthPattern2A: BerthPreference[] = [
        'Lower', 'Upper',
        'Lower', 'Upper',
        'Side Lower', 'Side Upper'
      ];
      for (let bay = 1; bay <= 8; bay++) {
        for (let idx = 0; idx < 6; idx++) {
          const seatNum = (bay - 1) * 6 + (idx + 1);
          const bType = berthPattern2A[idx];
          seats.push({
            seatNumber: seatNum,
            berthType: bType,
            columnPosition: bType.startsWith('Side') ? 'side-lower' : 'window',
            bayNumber: bay,
            isBooked: isSeatPreBooked(seatNum)
          });
        }
      }
    } else {
      // 1A (Coupes and Cabins)
      for (let seatNum = 1; seatNum <= 24; seatNum++) {
        const isUpper = seatNum % 2 === 0;
        seats.push({
          seatNumber: seatNum,
          berthType: isUpper ? 'Upper' : 'Lower',
          columnPosition: 'window',
          bayNumber: Math.ceil(seatNum / 4),
          isBooked: isSeatPreBooked(seatNum)
        });
      }
    }

    return seats;
  }, [travelClass, trainNumber, selectedCoach]);

  // Check which seat belongs to which passenger
  const getPassengerForSeat = (seatNumber: number, coach: string) => {
    return passengers.findIndex(
      (p) => p.allocatedSeat === seatNumber && p.allocatedCoach === coach
    );
  };

  const handleSeatClick = (seat: SeatInfo) => {
    if (seat.isBooked) return;

    const existingPaxIndex = getPassengerForSeat(seat.seatNumber, selectedCoach);

    if (existingPaxIndex !== -1) {
      // Deselect if clicking on currently active passenger's seat
      if (existingPaxIndex === activePassengerIndex) {
        onUpdatePassengerSeat(activePassengerIndex, '', 0, 'No Preference');
        return;
      }
      // If clicking another passenger's seat, make that passenger active
      setActivePassengerIndex(existingPaxIndex);
      return;
    }

    // Assign this seat to the active passenger
    onUpdatePassengerSeat(activePassengerIndex, selectedCoach, seat.seatNumber, seat.berthType);

    // Auto-advance to next passenger who does not have a seat assigned yet
    const nextUnassignedIdx = passengers.findIndex(
      (p, idx) => idx !== activePassengerIndex && (!p.allocatedSeat || !p.allocatedCoach)
    );
    if (nextUnassignedIdx !== -1) {
      setActivePassengerIndex(nextUnassignedIdx);
    }
  };

  const handleAutoAssign = () => {
    // Find first available seats in selected coach
    const available = seatsData.filter(
      (s) => !s.isBooked && getPassengerForSeat(s.seatNumber, selectedCoach) === -1
    );

    passengers.forEach((_, idx) => {
      if (available[idx]) {
        onUpdatePassengerSeat(
          idx,
          selectedCoach,
          available[idx].seatNumber,
          available[idx].berthType
        );
      }
    });
  };

  const assignedCount = passengers.filter((p) => p.allocatedSeat && p.allocatedCoach).length;

  return (
    <div className="bg-white rounded-2xl border-2 border-orange-200/80 shadow-md p-5 sm:p-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Coach Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>{t.interactiveSeatMap}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300">
                LIVE INTERACTIVE
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.seatMapSubtitle} • #{trainNumber} {trainName}
          </p>
        </div>

        {/* Coach Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Coach:</span>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {coachList.map((coach) => (
              <button
                key={coach}
                type="button"
                onClick={() => setSelectedCoach(coach)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCoach === coach
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {coach}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Passenger Selector Chips */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-blue-950 font-extrabold">
            <UserIcon className="w-4 h-4 text-orange-500" />
            <span>Select Passenger to Assign Seat:</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Assigned: <strong className="text-orange-600">{assignedCount}/{passengers.length}</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {passengers.map((p, idx) => {
            const isTarget = activePassengerIndex === idx;
            const hasSeat = p.allocatedSeat && p.allocatedCoach;

            return (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => setActivePassengerIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                  isTarget
                    ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-2 ring-orange-300'
                    : hasSeat
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="font-bold truncate max-w-[120px]">
                  {p.name || `Passenger ${idx + 1}`}
                </span>
                {hasSeat ? (
                  <span className="font-mono text-[11px] font-bold bg-white/70 px-1.5 py-0.2 rounded text-slate-900">
                    {p.allocatedCoach}-{p.allocatedSeat} ({p.allocatedBerth})
                  </span>
                ) : (
                  <span className="text-[10px] opacity-75">Click seat</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md border-2 border-emerald-400 bg-emerald-50" />
            <span className="font-semibold text-slate-600">{t.seatAvailable}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-orange-500 text-white flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <span className="font-semibold text-slate-600">{t.seatSelected}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400 text-[10px]">
              ✕
            </div>
            <span className="font-semibold text-slate-600">{t.seatBooked}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoAssign}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.autoAssignRemaining}</span>
          </button>
          <button
            type="button"
            onClick={onClearAllSeats}
            className="text-xs font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.clearSeatSelection}</span>
          </button>
        </div>
      </div>

      {/* Visual Coach Container */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-inner border-4 border-slate-800 space-y-4">
        {/* Train Orientation Direction Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DoorOpen className="w-4 h-4 text-slate-500" />
            <span>Coach Entrance Door / Vestibule</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <span>◄ Train Direction / Engine Ahead</span>
          </div>
          <div className="flex items-center gap-2 text-right">
            <span>Lavatory & Washroom</span>
            <DoorOpen className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        {/* Coach Body Rendering */}
        <div className="overflow-x-auto pb-4 pt-2">
          {travelClass === 'CC' || travelClass === '2S' ? (
            /* Chair Car 2+3 Seater Grid */
            <div className="min-w-[650px] space-y-2">
              <div
                className="gap-2 text-center text-[10px] text-slate-400 font-mono mb-1"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i} className="font-bold">R{i + 1}</span>
                ))}
              </div>

              {/* Row A (Window Left) */}
              <div
                className="gap-2"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {seatsData.filter((_, idx) => idx % 5 === 0).map((seat) => renderSeatButton(seat))}
              </div>

              {/* Row B (Aisle Left) */}
              <div
                className="gap-2"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {seatsData.filter((_, idx) => idx % 5 === 1).map((seat) => renderSeatButton(seat))}
              </div>

              {/* Aisle Walkway */}
              <div className="py-1 my-1 border-y border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                ────── {t.coachAisle} ──────
              </div>

              {/* Row C (Aisle Right) */}
              <div
                className="gap-2"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {seatsData.filter((_, idx) => idx % 5 === 2).map((seat) => renderSeatButton(seat))}
              </div>

              {/* Row D (Middle Right) */}
              <div
                className="gap-2"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {seatsData.filter((_, idx) => idx % 5 === 3).map((seat) => renderSeatButton(seat))}
              </div>

              {/* Row E (Window Right) */}
              <div
                className="gap-2"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(15, minmax(36px, 1fr))' }}
              >
                {seatsData.filter((_, idx) => idx % 5 === 4).map((seat) => renderSeatButton(seat))}
              </div>
            </div>
          ) : travelClass === 'EC' ? (
            /* Executive Chair Car 2+2 Seater Grid */
            <div className="min-w-[550px] space-y-2">
              <div className="grid grid-cols-12 gap-2 text-center text-[10px] text-slate-400 font-mono mb-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className="font-bold">R{i + 1}</span>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-2">
                {seatsData.filter((_, idx) => idx % 4 === 0).map((seat) => renderSeatButton(seat))}
              </div>
              <div className="grid grid-cols-12 gap-2">
                {seatsData.filter((_, idx) => idx % 4 === 1).map((seat) => renderSeatButton(seat))}
              </div>
              <div className="py-1 my-1 border-y border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                ────── Executive Aisle ──────
              </div>
              <div className="grid grid-cols-12 gap-2">
                {seatsData.filter((_, idx) => idx % 4 === 2).map((seat) => renderSeatButton(seat))}
              </div>
              <div className="grid grid-cols-12 gap-2">
                {seatsData.filter((_, idx) => idx % 4 === 3).map((seat) => renderSeatButton(seat))}
              </div>
            </div>
          ) : (
            /* Sleeper / 3A / 2A / 1A Bay-by-Bay Layout */
            <div className="min-w-[700px] space-y-4">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {Array.from(new Set(seatsData.map((s) => s.bayNumber || 1))).map((bay) => {
                  const baySeats = seatsData.filter((s) => s.bayNumber === bay);
                  const mainCoupeSeats = baySeats.filter((s) => !s.berthType.startsWith('Side'));
                  const sideSeats = baySeats.filter((s) => s.berthType.startsWith('Side'));

                  return (
                    <div
                      key={bay}
                      className="bg-slate-800/80 rounded-2xl p-2.5 border border-slate-700 flex flex-col justify-between"
                    >
                      <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider text-center pb-1 border-b border-slate-700">
                        Bay {bay}
                      </div>

                      {/* Main Compartment Berths (LB, MB, UB) */}
                      <div className="space-y-1.5 my-2">
                        <div className="grid grid-cols-3 gap-1">
                          {mainCoupeSeats.slice(0, 3).map((seat) => renderSeatButton(seat, true))}
                        </div>
                        {mainCoupeSeats.length > 3 && (
                          <div className="grid grid-cols-3 gap-1">
                            {mainCoupeSeats.slice(3, 6).map((seat) => renderSeatButton(seat, true))}
                          </div>
                        )}
                      </div>

                      {/* Aisle Spacer */}
                      <div className="text-[8px] text-slate-500 text-center uppercase tracking-widest py-0.5 border-y border-dashed border-slate-700/60">
                        aisle
                      </div>

                      {/* Side Track Berths (SL, SU) */}
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        {sideSeats.map((seat) => renderSeatButton(seat, true))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Coach Footer Summary */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Indian Railways Passenger Reservation System (IRCTC PRS)</span>
          </div>
          <div>
            Coach <strong className="text-white">{selectedCoach}</strong> • Currently allocating for:{' '}
            <strong className="text-orange-400 font-bold">
              {passengers[activePassengerIndex]?.name || `Passenger ${activePassengerIndex + 1}`}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSeatButton(seat: SeatInfo, isCompact: boolean = false) {
    const assignedPaxIndex = getPassengerForSeat(seat.seatNumber, selectedCoach);
    const isSelected = assignedPaxIndex !== -1;
    const isCurrentActive = isSelected && assignedPaxIndex === activePassengerIndex;

    const berthShort = seat.berthType === 'Lower'
      ? 'LB'
      : seat.berthType === 'Middle'
      ? 'MB'
      : seat.berthType === 'Upper'
      ? 'UB'
      : seat.berthType === 'Side Lower'
      ? 'SL'
      : seat.berthType === 'Side Upper'
      ? 'SU'
      : seat.berthType === 'Window'
      ? 'W'
      : 'S';

    if (seat.isBooked) {
      return (
        <div
          key={seat.seatNumber}
          title={`Seat ${seat.seatNumber} (${seat.berthType}) - Already Booked`}
          className={`rounded-lg bg-slate-800 text-slate-500 border border-slate-700/60 flex flex-col items-center justify-center select-none cursor-not-allowed opacity-60 ${
            isCompact ? 'py-1.5 px-0.5 text-[9px]' : 'p-2 text-xs h-12'
          }`}
        >
          <span className="font-mono font-bold leading-none">{seat.seatNumber}</span>
          <span className="text-[8px] font-medium opacity-60 leading-tight">{berthShort}</span>
        </div>
      );
    }

    if (isSelected) {
      return (
        <button
          key={seat.seatNumber}
          type="button"
          onClick={() => handleSeatClick(seat)}
          title={`Seat ${seat.seatNumber} (${seat.berthType}) - Assigned to ${passengers[assignedPaxIndex]?.name || `Passenger ${assignedPaxIndex + 1}`}`}
          className={`rounded-lg bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-300 shadow-lg flex flex-col items-center justify-center font-bold transition-all transform scale-105 ${
            isCompact ? 'py-1.5 px-0.5 text-[9px]' : 'p-2 text-xs h-12'
          } ${isCurrentActive ? 'ring-2 ring-white animate-pulse' : ''}`}
        >
          <span className="font-mono font-black leading-none">{seat.seatNumber}</span>
          <span className="text-[8px] bg-black/25 px-1 rounded font-bold uppercase leading-tight mt-0.5">
            P{assignedPaxIndex + 1}
          </span>
        </button>
      );
    }

    return (
      <button
        key={seat.seatNumber}
        type="button"
        onClick={() => handleSeatClick(seat)}
        title={`Seat ${seat.seatNumber} (${seat.berthType}) - Available. Click to assign to ${passengers[activePassengerIndex]?.name || `Passenger ${activePassengerIndex + 1}`}`}
        className={`rounded-lg bg-slate-800/80 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-600 hover:border-emerald-400 flex flex-col items-center justify-center font-bold transition-all hover:scale-105 shadow-xs cursor-pointer ${
          isCompact ? 'py-1.5 px-0.5 text-[9px]' : 'p-2 text-xs h-12'
        }`}
      >
        <span className="font-mono font-bold leading-none">{seat.seatNumber}</span>
        <span className="text-[8px] font-medium text-slate-400 group-hover:text-white leading-tight mt-0.5">
          {berthShort}
        </span>
      </button>
    );
  }
};
