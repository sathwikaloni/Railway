import React, { useState, useMemo } from 'react';
import { 
  Train as TrainIcon, 
  ArrowLeftRight, 
  Calendar, 
  Clock, 
  Filter, 
  SlidersHorizontal, 
  ShieldCheck, 
  Coffee, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Train, TravelClassType, QuotaType, ClassAvailability } from '../types';
import { searchTrains } from '../services/booking.helper';
import { POPULAR_STATIONS, findStationByCode } from '../services/stations.data';
import { useLocalization } from '../i18n/LocalizationContext';

interface TrainSearchPageProps {
  initialFrom: string;
  initialTo: string;
  initialDate: string;
  initialClass?: string;
  initialQuota?: QuotaType;
  onSelectTrainForBooking: (train: Train, selectedClass: TravelClassType, date: string, quota: QuotaType) => void;
}

export const TrainSearchPage: React.FC<TrainSearchPageProps> = ({
  initialFrom,
  initialTo,
  initialDate,
  initialClass = 'ALL',
  initialQuota = 'GN',
  onSelectTrainForBooking
}) => {
  const { t, language, formatCurrency, formatDate, formatTime } = useLocalization();

  // Search Bar State
  const [fromStation, setFromStation] = useState<string>(initialFrom || 'SC');
  const [toStation, setToStation] = useState<string>(initialTo || 'BZA');
  const [journeyDate, setJourneyDate] = useState<string>(
    initialDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [quota, setQuota] = useState<QuotaType>(initialQuota);

  // Filters State
  const [selectedDepartureWindow, setSelectedDepartureWindow] = useState<string>('ALL'); // ALL, 0-6, 6-12, 12-18, 18-24
  const [selectedArrivalWindow, setSelectedArrivalWindow] = useState<string>('ALL');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>(initialClass || 'ALL');
  const [selectedTrainTypes, setSelectedTrainTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  // Active selections on each train card (trainId -> selected class)
  const [selectedClassByTrain, setSelectedClassByTrain] = useState<Record<string, TravelClassType>>({});

  // Query trains
  const rawTrains = useMemo(() => {
    return searchTrains(fromStation, toStation, journeyDate);
  }, [fromStation, toStation, journeyDate]);

  // Apply filters
  const filteredTrains = useMemo(() => {
    return rawTrains.filter((train) => {
      // Departure window filter
      const depHour = parseInt(train.departureTime.split(':')[0], 10);
      if (selectedDepartureWindow === '0-6' && (depHour < 0 || depHour >= 6)) return false;
      if (selectedDepartureWindow === '6-12' && (depHour < 6 || depHour >= 12)) return false;
      if (selectedDepartureWindow === '12-18' && (depHour < 12 || depHour >= 18)) return false;
      if (selectedDepartureWindow === '18-24' && (depHour < 18 || depHour >= 24)) return false;

      // Arrival window filter
      const arrHour = parseInt(train.arrivalTime.split(':')[0], 10);
      if (selectedArrivalWindow === '0-6' && (arrHour < 0 || arrHour >= 6)) return false;
      if (selectedArrivalWindow === '6-12' && (arrHour < 6 || arrHour >= 12)) return false;
      if (selectedArrivalWindow === '12-18' && (arrHour < 12 || arrHour >= 18)) return false;
      if (selectedArrivalWindow === '18-24' && (arrHour < 18 || arrHour >= 24)) return false;

      // Class filter
      if (selectedClassFilter !== 'ALL') {
        const hasClass = train.classes.some((c) => c.className === selectedClassFilter);
        if (!hasClass) return false;
      }

      // Train type filter
      if (selectedTrainTypes.length > 0) {
        if (!selectedTrainTypes.includes(train.trainType)) return false;
      }

      // Price filter (at least one class under maxPrice)
      const lowestFare = Math.min(...train.classes.map((c) => c.fare));
      if (lowestFare > maxPrice) return false;

      return true;
    });
  }, [rawTrains, selectedDepartureWindow, selectedArrivalWindow, selectedClassFilter, selectedTrainTypes, maxPrice]);

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSelectClass = (trainId: string, className: TravelClassType) => {
    setSelectedClassByTrain((prev) => ({
      ...prev,
      [trainId]: className
    }));
  };

  const handleBookNow = (train: Train) => {
    // Determine which class is currently selected for this train (default to first available)
    const activeClass = selectedClassByTrain[train.id] || train.classes[0].className;
    onSelectTrainForBooking(train, activeClass, journeyDate, quota);
  };

  const getLocalizedTrainName = (train: Train) => {
    if (language === 'te' && train.teluguName) return train.teluguName;
    if (language === 'hi' && train.hindiName) return train.hindiName;
    return train.name;
  };

  const fromInfo = findStationByCode(fromStation);
  const toInfo = findStationByCode(toStation);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Modify Search Bar */}
      <div className="bg-gradient-to-r from-[#0b2847] via-[#0f3460] to-[#122b49] rounded-2xl p-5 text-white shadow-xl border border-blue-900/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-3">
            <label className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block mb-1">
              {t.fromStation}
            </label>
            <select
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {POPULAR_STATIONS.map((s) => (
                <option key={`f-${s.code}`} value={s.code} className="text-slate-900">
                  {s.city} ({s.code}) - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1 flex justify-center pt-2 sm:pt-4">
            <button
              type="button"
              onClick={handleSwap}
              title={t.swapStations}
              className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-3">
            <label className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block mb-1">
              {t.toStation}
            </label>
            <select
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {POPULAR_STATIONS.map((s) => (
                <option key={`t-${s.code}`} value={s.code} className="text-slate-900">
                  {s.city} ({s.code}) - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block mb-1">
              {t.journeyDate}
            </label>
            <input
              type="date"
              value={journeyDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-[11px] font-bold text-orange-300 uppercase tracking-wider block mb-1">
              {t.quota}
            </label>
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value as QuotaType)}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="GN" className="text-slate-900">{t.generalQuota}</option>
              <option value="TQ" className="text-slate-900">{t.tatkalQuota}</option>
              <option value="LD" className="text-slate-900">{t.ladiesQuota}</option>
              <option value="SS" className="text-slate-900">{t.seniorCitizenQuota}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Results Container with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filters Sidebar */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <span>{t.filtersTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedDepartureWindow('ALL');
                  setSelectedArrivalWindow('ALL');
                  setSelectedClassFilter('ALL');
                  setSelectedTrainTypes([]);
                  setMaxPrice(5000);
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Departure Time Slots */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.filterDeparture}
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                {[
                  { id: 'ALL', label: 'All Times' },
                  { id: '0-6', label: '00:00 - 06:00' },
                  { id: '6-12', label: '06:00 - 12:00' },
                  { id: '12-18', label: '12:00 - 18:00' },
                  { id: '18-24', label: '18:00 - 24:00' },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedDepartureWindow(slot.id)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      selectedDepartureWindow === slot.id
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Class Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.filterClasses}
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
                {['ALL', 'SL', '3A', '2A', '1A', 'CC', '2S', 'EC'].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      selectedClassFilter === cls
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {cls === 'ALL' ? 'All Classes' : cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Train Type Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.filterTrainType}
              </label>
              <div className="space-y-2 text-xs font-medium text-slate-700">
                {['Vande Bharat', 'Rajdhani', 'Shatabdi', 'Superfast'].map((type) => {
                  const isChecked = selectedTrainTypes.includes(type);
                  return (
                    <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedTrainTypes(selectedTrainTypes.filter((t) => t !== type));
                          } else {
                            setSelectedTrainTypes([...selectedTrainTypes, type]);
                          }
                        }}
                        className="rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Maximum Price Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span className="uppercase tracking-wider">Max Ticket Fare</span>
                <span className="text-orange-600 font-extrabold">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="150"
                max="5000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>{formatCurrency(150)}</span>
                <span>{formatCurrency(5000)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Train Cards List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header Summary */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>{fromInfo?.city || fromStation}</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
                <span>{toInfo?.city || toStation}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {formatDate(journeyDate)} • <strong className="text-slate-800">{filteredTrains.length}</strong> {t.trainsFound}
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Available</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2"></span>
              <span>RAC</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 ml-2"></span>
              <span>Waitlist</span>
            </div>
          </div>

          {/* If No Trains Found */}
          {filteredTrains.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t.noTrainsFound}</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {t.noTrainsDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDepartureWindow('ALL');
                  setSelectedArrivalWindow('ALL');
                  setSelectedClassFilter('ALL');
                  setSelectedTrainTypes([]);
                  setMaxPrice(5000);
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTrains.map((train) => {
              const activeClass = selectedClassByTrain[train.id] || train.classes[0].className;
              const activeClassObj = train.classes.find((c) => c.className === activeClass) || train.classes[0];

              return (
                <div
                  key={train.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-900/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Train Top Strip */}
                  <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-900 text-white text-xs font-mono font-bold tracking-wider">
                        #{train.number}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {getLocalizedTrainName(train)}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        train.trainType === 'Vande Bharat'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : train.trainType === 'Rajdhani'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {train.trainType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-600">{t.runsOn}:</span>
                        <div className="flex gap-0.5 font-mono text-[10px]">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <span
                              key={i}
                              className={`w-4 h-4 rounded-sm flex items-center justify-center font-bold ${
                                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] &&
                                train.runsOn.includes(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i])
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'text-slate-300'
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      {train.pantryAvailable && (
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <Coffee className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.pantry}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Schedule Row */}
                  <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Departure */}
                    <div className="md:col-span-3">
                      <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                        {train.departureTime}
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {train.source.city} ({train.source.code})
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {train.source.name}
                      </div>
                    </div>

                    {/* Duration Graphic */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center px-2">
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        <span>{train.duration}</span>
                        <span className="text-slate-300">•</span>
                        <span>{train.distanceKm} km</span>
                      </div>
                      <div className="w-full flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <div className="h-[2px] flex-1 bg-slate-300"></div>
                        <TrainIcon className="w-4 h-4 text-orange-500" />
                        <div className="h-[2px] flex-1 bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">Direct Express</span>
                    </div>

                    {/* Arrival */}
                    <div className="md:col-span-3 text-left md:text-right">
                      <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                        {train.arrivalTime}
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        {train.destination.city} ({train.destination.code})
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {train.destination.name}
                      </div>
                    </div>

                    {/* Actions summary on desktop */}
                    <div className="md:col-span-2 text-right hidden md:block">
                      <span className="text-[11px] text-slate-400 block">Selected Class</span>
                      <span className="text-lg font-black text-orange-600">
                        {formatCurrency(activeClassObj.fare)}
                      </span>
                    </div>
                  </div>

                  {/* Travel Classes Chips Row */}
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                      {train.classes.map((cls) => {
                        const isSelected = activeClass === cls.className;
                        const isAvailable = cls.status === 'AVAILABLE';
                        const isRac = cls.status === 'RAC';

                        return (
                          <div
                            key={cls.className}
                            onClick={() => handleSelectClass(train.id, cls.className)}
                            className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/40 shadow-md ring-1 ring-orange-400'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-slate-800">
                                {cls.className}
                              </span>
                              <span className="text-xs font-extrabold text-slate-900 font-mono">
                                {formatCurrency(cls.fare)}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium truncate mb-2">
                              {cls.classLabel}
                            </div>
                            <div>
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  isAvailable
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isRac
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {cls.statusDetails}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Book Now Button Row */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-600">
                        Selected: <strong className="text-blue-900 font-bold">{activeClassObj.classLabel} ({activeClassObj.className})</strong> • Fare: <strong className="text-orange-600 font-extrabold">{formatCurrency(activeClassObj.fare)}</strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleBookNow(train)}
                        className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-md hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{t.bookNow}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
