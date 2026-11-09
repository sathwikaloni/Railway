import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Calendar, 
  Search, 
  MapPin, 
  Layers, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';
import { POPULAR_STATIONS } from '../services/stations.data';
import { useLocalization } from '../i18n/LocalizationContext';
import { storageService } from '../services/storage.service';
import { TravelClassType, QuotaType } from '../types';

interface HeroSearchProps {
  onSearch: (params: { from: string; to: string; date: string; travelClass: string; quota: QuotaType }) => void;
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ 
  onSearch, 
  initialFrom = 'SC', 
  initialTo = 'BZA', 
  initialDate 
}) => {
  const { t, language } = useLocalization();

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [fromStation, setFromStation] = useState<string>(initialFrom);
  const [toStation, setToStation] = useState<string>(initialTo);
  const [journeyDate, setJourneyDate] = useState<string>(initialDate || getTomorrowDate());
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [quota, setQuota] = useState<QuotaType>('GN');
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation === toStation) {
      setErrorMsg('Source and Destination stations cannot be the same!');
      return;
    }
    setErrorMsg('');
    storageService.saveLastSearch({ from: fromStation, to: toStation, date: journeyDate });
    onSearch({ from: fromStation, to: toStation, date: journeyDate, travelClass: selectedClass, quota });
  };

  const quickRoutes = [
    { from: 'SC', to: 'BZA', label: 'Hyderabad → Vijayawada' },
    { from: 'BZA', to: 'MAS', label: 'Vijayawada → Chennai' },
    { from: 'SC', to: 'SBC', label: 'Hyderabad → Bengaluru' },
    { from: 'NDLS', to: 'MMCT', label: 'Delhi → Mumbai' },
    { from: 'VSKP', to: 'SC', label: 'Visakhapatnam → Secunderabad' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-7 border border-slate-200/80">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
            <span>BOOK TRAIN TICKET</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quota:</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setQuota('GN')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  quota === 'GN' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.generalQuota}
              </button>
              <button
                type="button"
                onClick={() => setQuota('TQ')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  quota === 'TQ' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.tatkalQuota}
              </button>
              <button
                type="button"
                onClick={() => setQuota('LD')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  quota === 'LD' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.ladiesQuota}
              </button>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* From Station */}
          <div className="md:col-span-4 relative">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.fromStation}</span>
            </label>
            <div className="relative">
              <select
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all cursor-pointer"
              >
                {POPULAR_STATIONS.map((station) => (
                  <option key={`from-${station.code}`} value={station.code}>
                    {station.city} - {station.name} [{station.code}]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Stations Button */}
          <div className="md:col-span-1 flex justify-center -my-2 md:my-0 pt-4 md:pt-5">
            <button
              type="button"
              onClick={handleSwap}
              title={t.swapStations}
              className={`w-10 h-10 rounded-full bg-blue-50 hover:bg-orange-500 hover:text-white text-blue-900 flex items-center justify-center border border-blue-200 shadow-sm transition-all transform ${
                isSwapping ? 'rotate-180 scale-110' : ''
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* To Station */}
          <div className="md:col-span-4 relative">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-900" />
              <span>{t.toStation}</span>
            </label>
            <div className="relative">
              <select
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all cursor-pointer"
              >
                {POPULAR_STATIONS.map((station) => (
                  <option key={`to-${station.code}`} value={station.code}>
                    {station.city} - {station.name} [{station.code}]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.journeyDate}</span>
            </label>
            <input
              type="date"
              min={getTodayDate()}
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Classes and Submit row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 items-center">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.travelClass}</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all cursor-pointer"
            >
              <option value="ALL">{t.allClasses}</option>
              <option value="SL">Sleeper (SL)</option>
              <option value="3A">AC 3 Tier (3A)</option>
              <option value="2A">AC 2 Tier (2A)</option>
              <option value="1A">AC First Class (1A)</option>
              <option value="CC">AC Chair Car (CC)</option>
              <option value="EC">Exec. Chair Car (EC)</option>
            </select>
          </div>

          <div className="md:col-span-8 flex flex-col sm:flex-row gap-3 pt-4 sm:pt-0">
            <div className="flex-1 flex items-center text-xs text-slate-500 font-medium">
              <span>* Authorized IRCTC ticketing partner with instant live PNR allocation.</span>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base px-8 py-3 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group shrink-0"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t.searchTrains}</span>
            </button>
          </div>
        </div>

        {/* Quick Route Suggestion Chips */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Routes:
          </span>
          {quickRoutes.map((route, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setFromStation(route.from);
                setToStation(route.to);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-100 hover:text-orange-700 text-slate-700 font-medium transition-colors"
            >
              {route.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};
