import React, { useState } from 'react';
import { 
  Train as TrainIcon, 
  Calendar, 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  AlertCircle,
  FileText,
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Train, TravelClassType, QuotaType, Passenger, BerthPreference, Booking } from '../types';
import { calculateFareBreakdown, allocateSeats, generatePnr } from '../services/booking.helper';
import { storageService } from '../services/storage.service';
import { useAuth } from '../services/auth.context';
import { useLocalization } from '../i18n/LocalizationContext';
import { InteractiveCoachSeatMap } from '../components/InteractiveCoachSeatMap';

interface BookingPageProps {
  train: Train;
  travelClass: TravelClassType;
  journeyDate: string;
  quota: QuotaType;
  onBookingComplete: (booking: Booking) => void;
  onNavigateToLogin: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  train,
  travelClass,
  journeyDate,
  quota,
  onBookingComplete,
  onNavigateToLogin
}) => {
  const { t, formatCurrency, formatDate, formatTime } = useLocalization();
  const { currentUser, isAuthenticated } = useAuth();

  // Class object for the selected class
  const classObj = train.classes.find((c) => c.className === travelClass) || train.classes[0];

  // Dynamic passenger list
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: 'p-initial-1',
      name: currentUser?.fullName || '',
      age: 28,
      gender: currentUser?.gender === 'Female' ? 'Female' : 'Male',
      berthPreference: (travelClass === 'CC' || travelClass === 'EC') ? 'Window' : 'Lower'
    }
  ]);

  const [contactEmail, setContactEmail] = useState<string>(currentUser?.email || 'user@railconnect.in');
  const [contactMobile, setContactMobile] = useState<string>(currentUser?.mobile || '9876543210');
  const [paymentMethod, setPaymentMethod] = useState<string>('IRCTC iPay (UPI)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [showSeatMap, setShowSeatMap] = useState<boolean>(true);

  // Fare calculation
  const fareBreakdown = calculateFareBreakdown(classObj.fare, passengers.length, travelClass);

  const handleUpdatePassengerSeat = (
    passengerIndex: number,
    coach: string,
    seatNumber: number,
    berth: BerthPreference
  ) => {
    const updated = [...passengers];
    if (seatNumber && coach) {
      updated[passengerIndex] = {
        ...updated[passengerIndex],
        allocatedCoach: coach,
        allocatedSeat: seatNumber,
        allocatedBerth: berth,
        berthPreference: (berth !== 'No Preference' ? berth : updated[passengerIndex].berthPreference)
      };
    } else {
      updated[passengerIndex] = {
        ...updated[passengerIndex],
        allocatedCoach: undefined,
        allocatedSeat: undefined,
        allocatedBerth: undefined
      };
    }
    setPassengers(updated);
  };

  const handleClearAllSeats = () => {
    const updated = passengers.map(p => ({
      ...p,
      allocatedCoach: undefined,
      allocatedSeat: undefined,
      allocatedBerth: undefined
    }));
    setPassengers(updated);
  };

  const handleAddPassenger = () => {
    if (passengers.length >= 6) {
      setValidationError(t.maxPassengersNote);
      return;
    }
    setValidationError('');
    setPassengers([
      ...passengers,
      {
        id: `p-${Date.now()}`,
        name: '',
        age: 25,
        gender: 'Male',
        berthPreference: 'No Preference'
      }
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    const updated = passengers.filter((_, idx) => idx !== index);
    setPassengers(updated);
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setPassengers(updated);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !currentUser) {
      setValidationError(t.authRequiredToBook);
      onNavigateToLogin();
      return;
    }

    // Validate passengers
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim() || p.name.trim().length < 3) {
        setValidationError(`Please enter a valid full name for Passenger ${i + 1}`);
        return;
      }
      if (!p.age || p.age < 1 || p.age > 125) {
        setValidationError(`Please enter a valid age between 1 and 125 for Passenger ${i + 1}`);
        return;
      }
    }

    if (!contactMobile || contactMobile.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number for SMS ticket delivery');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    // Simulate railway booking gateway latency
    setTimeout(() => {
      const allocatedPassengers = allocateSeats(passengers, travelClass);
      const generatedPnr = generatePnr();

      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        pnr: generatedPnr,
        userId: currentUser.id,
        userEmail: currentUser.email,
        userMobile: contactMobile,
        trainNumber: train.number,
        trainName: train.name,
        trainType: train.trainType,
        source: train.source,
        destination: train.destination,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        journeyDate,
        travelClass,
        passengers: allocatedPassengers,
        baseFare: fareBreakdown.baseFare,
        reservationCharge: fareBreakdown.reservationCharge,
        superfastCharge: fareBreakdown.superfastCharge,
        gst: fareBreakdown.gst,
        totalFare: fareBreakdown.totalFare,
        bookingStatus: 'CONFIRMED',
        bookedAt: new Date().toISOString(),
        paymentMethod
      };

      storageService.saveBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsSubmitting(false);

      // Trigger celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // canvas-confetti fallback
      }
    }, 1200);
  };

  // If already confirmed in this flow, show celebratory success banner
  if (confirmedBooking) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-200 p-6 sm:p-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              IRCTC TICKET CONFIRMED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.bookingSuccessTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              {t.bookingSuccessDesc}
            </p>
          </div>

          {/* Quick Ticket Highlights Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">{t.pnrNumber}</span>
                <div className="text-2xl font-black text-blue-900 font-mono tracking-wider">
                  {confirmedBooking.pnr}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-semibold uppercase">Status</span>
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {confirmedBooking.bookingStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Train</span>
                <span className="font-bold text-slate-800">
                  #{confirmedBooking.trainNumber} - {confirmedBooking.trainName}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Journey Date</span>
                <span className="font-bold text-slate-800">
                  {formatDate(confirmedBooking.journeyDate)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Route</span>
                <span className="font-bold text-slate-800">
                  {confirmedBooking.source.code} → {confirmedBooking.destination.code}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Class / Total Fare</span>
                <span className="font-bold text-slate-800">
                  {confirmedBooking.travelClass} ({formatCurrency(confirmedBooking.totalFare)})
                </span>
              </div>
            </div>

            {/* Allocated Coach & Seats */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-2">Allocated Seats:</span>
              <div className="flex flex-wrap gap-2">
                {confirmedBooking.passengers.map((p, idx) => (
                  <div key={idx} className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-xs shadow-xs">
                    <span className="font-bold text-slate-900">{p.name}</span>: <strong className="text-blue-900">{p.allocatedCoach}-{p.allocatedSeat}</strong> ({p.allocatedBerth})
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <button
              onClick={() => onBookingComplete(confirmedBooking)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t.viewTicket}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {t.bookingTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your journey parameters and enter passenger information to reserve your train seats.
        </p>
      </div>

      {!isAuthenticated && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{t.authRequiredToBook}</span>
          </div>
          <button
            onClick={onNavigateToLogin}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-sm shrink-0"
          >
            {t.navLogin} / {t.navRegister}
          </button>
        </div>
      )}

      {validationError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Column (Train Details + Passengers + Contact) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Train Card Summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-blue-900 text-white font-mono text-xs font-bold">
                  #{train.number}
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {train.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                  {train.trainType}
                </span>
              </div>
              <div className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
                Class: {classObj.classLabel} ({classObj.className})
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {train.departureTime}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {train.source.city} ({train.source.code})
                </div>
                <div className="text-[11px] text-slate-400">
                  {formatDate(journeyDate)}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400 font-medium">{train.duration}</span>
                <div className="w-full flex items-center gap-1 my-1">
                  <div className="h-[2px] flex-1 bg-slate-200" />
                  <TrainIcon className="w-4 h-4 text-orange-500" />
                  <div className="h-[2px] flex-1 bg-slate-200" />
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">{classObj.statusDetails}</span>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xl font-black text-slate-900 font-mono">
                  {train.arrivalTime}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {train.destination.city} ({train.destination.code})
                </div>
                <div className="text-[11px] text-slate-400">
                  {train.destination.name}
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Details Form */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {t.passengerDetailsTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.maxPassengersNote}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddPassenger}
                disabled={passengers.length >= 6}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200 transition-colors disabled:opacity-50"
              >
                {t.addPassenger}
              </button>
            </div>

            <div className="space-y-4">
              {passengers.map((pax, index) => (
                <div
                  key={pax.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 relative space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-blue-900 font-bold">
                        <UserIcon className="w-3.5 h-3.5" />
                        Passenger {index + 1}
                      </span>
                      {pax.allocatedSeat && pax.allocatedCoach ? (
                        <span className="bg-orange-100 text-orange-900 border border-orange-300 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                          <span>Seat: {pax.allocatedCoach}-{pax.allocatedSeat}</span>
                          <span className="text-orange-700 font-semibold">({pax.allocatedBerth})</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                          (Click seat on map below to pick)
                        </span>
                      )}
                    </div>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePassenger(index)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.removePassenger}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Name */}
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {t.passengerName} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={pax.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Age */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {t.passengerAge} *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="125"
                        required
                        value={pax.age}
                        onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value, 10) || 1)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* Gender */}
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {t.passengerGender} *
                      </label>
                      <select
                        value={pax.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      >
                        <option value="Male">{t.male}</option>
                        <option value="Female">{t.female}</option>
                        <option value="Transgender">{t.transgender}</option>
                      </select>
                    </div>

                    {/* Berth Preference */}
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        {t.berthPreference}
                      </label>
                      <select
                        value={pax.berthPreference}
                        onChange={(e) => handlePassengerChange(index, 'berthPreference', e.target.value as BerthPreference)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      >
                        <option value="No Preference">{t.noPreference}</option>
                        {['CC', 'EC'].includes(travelClass) ? (
                          <>
                            <option value="Window">{t.windowSeat}</option>
                            <option value="No Preference">{t.noPreference}</option>
                          </>
                        ) : (
                          <>
                            <option value="Lower">{t.lowerBerth}</option>
                            <option value="Middle">{t.middleBerth}</option>
                            <option value="Upper">{t.upperBerth}</option>
                            <option value="Side Lower">{t.sideLower}</option>
                            <option value="Side Upper">{t.sideUpper}</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Coach Seat Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Coach Seat Layout & Interactive Selection</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSeatMap(!showSeatMap)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                {showSeatMap ? '▲ Minimize Seat Map' : '▼ Expand Seat Map'}
              </button>
            </div>

            {showSeatMap && (
              <InteractiveCoachSeatMap
                travelClass={travelClass}
                trainNumber={train.number}
                trainName={train.name}
                passengers={passengers}
                onUpdatePassengerSeat={handleUpdatePassengerSeat}
                onClearAllSeats={handleClearAllSeats}
              />
            )}
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              Contact & E-Ticket Notification Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Mobile Number (for SMS & WhatsApp Ticket) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white border border-slate-300 rounded-r-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email ID (for ERS PDF Ticket Copy) *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              Payment Gateway Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'IRCTC iPay (UPI)', label: 'IRCTC iPay (UPI / GPay / PhonePe)', icon: <QrCode className="w-4 h-4 text-orange-500" /> },
                { id: 'Debit / Credit Card', label: 'Debit & Credit Cards', icon: <CreditCard className="w-4 h-4 text-blue-600" /> },
                { id: 'Net Banking (SBI / HDFC)', label: 'Net Banking (All Indian Banks)', icon: <Building className="w-4 h-4 text-emerald-600" /> }
              ].map((pm) => (
                <label
                  key={pm.id}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === pm.id
                      ? 'border-orange-500 bg-orange-50/50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.id}
                    checked={paymentMethod === pm.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-400"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      {pm.icon}
                      <span>{pm.id}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Fare Breakdown & Confirmation */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-4 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              {t.fareBreakdown}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{t.baseFare} ({passengers.length} × {formatCurrency(classObj.fare)})</span>
                <span className="font-bold text-slate-900">{formatCurrency(fareBreakdown.baseFare)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.reservationCharge}</span>
                <span className="font-bold text-slate-900">{formatCurrency(fareBreakdown.reservationCharge)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.superfastCharge}</span>
                <span className="font-bold text-slate-900">{formatCurrency(fareBreakdown.superfastCharge)}</span>
              </div>
              {fareBreakdown.gst > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>{t.gstCharge}</span>
                  <span className="font-bold text-slate-900">{formatCurrency(fareBreakdown.gst)}</span>
                </div>
              )}

              <div className="pt-3 border-t-2 border-dashed border-slate-200 flex justify-between items-center text-sm">
                <span className="font-black text-slate-800">{t.totalAmount}</span>
                <span className="font-black text-xl text-orange-600">
                  {formatCurrency(fareBreakdown.totalFare)}
                </span>
              </div>
            </div>

            {/* Seat Selection Status Card in Sidebar */}
            <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Seat Allocation:</span>
                </span>
                <span className="text-orange-600 font-extrabold">
                  {passengers.filter(p => p.allocatedSeat && p.allocatedCoach).length} / {passengers.length} Assigned
                </span>
              </div>
              <div className="space-y-1 pt-1">
                {passengers.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] text-slate-700 bg-white/90 px-2 py-1 rounded border border-orange-100">
                    <span className="truncate max-w-[120px] font-semibold">{p.name || `Passenger ${idx + 1}`}</span>
                    {p.allocatedSeat && p.allocatedCoach ? (
                      <span className="font-mono font-bold text-blue-900 bg-orange-100/70 px-1.5 rounded">
                        {p.allocatedCoach}-{p.allocatedSeat} ({p.allocatedBerth})
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-[10px]">Auto-assign</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant PNR & Electronic Ticket</span>
              </div>
              <p>Senior citizens & general passengers are allotted seats according to railway rules.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Contacting IRCTC Gateway...</span>
                </div>
              ) : (
                <span>{t.confirmBooking}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
