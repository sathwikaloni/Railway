import React, { useState } from 'react';
import { 
  Search, 
  Ticket, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Train, 
  ArrowRight, 
  ShieldCheck, 
  Printer, 
  FileText,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { Booking } from '../types';
import { storageService } from '../services/storage.service';
import { useLocalization } from '../i18n/LocalizationContext';
import { TicketDetailsModal } from './TicketDetailsModal';

export const PnrStatusPage: React.FC = () => {
  const { t, formatCurrency, formatDate, formatTime } = useLocalization();

  const [pnrInput, setPnrInput] = useState<string>('4528192374');
  const [searchedPnr, setSearchedPnr] = useState<string>('');
  const [pnrResult, setPnrResult] = useState<Booking | null>(() => {
    return storageService.getBookingByPnr('4528192374') || null;
  });
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFullTicketModal, setShowFullTicketModal] = useState<boolean>(false);

  const samplePnrs = ['4528192374', '2319084712'];

  const handleCheckPnr = (targetPnr?: string) => {
    const query = (targetPnr || pnrInput).trim();
    if (!query) return;

    setIsLoading(true);
    setSearchedPnr(query);
    setHasSearched(true);

    setTimeout(() => {
      const match = storageService.getBookingByPnr(query);
      setPnrResult(match || null);
      setIsLoading(false);
    }, 400);
  };

  const handleSampleClick = (pnr: string) => {
    setPnrInput(pnr);
    handleCheckPnr(pnr);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Hero Box */}
      <div className="bg-gradient-to-r from-[#0b2847] via-[#0f3460] to-[#122b49] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-blue-900/40 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs font-semibold">
          <Ticket className="w-4 h-4 text-orange-400" />
          <span>PASSENGER CURRENT STATUS ENQUIRY</span>
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t.pnrStatusTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {t.pnrStatusSubtitle}
          </p>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckPnr();
          }}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 pt-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={10}
              placeholder={t.enterPnrPlaceholder}
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white text-slate-900 rounded-2xl px-5 py-3.5 text-sm sm:text-base font-bold font-mono tracking-widest placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-4 focus:ring-orange-500/30 shadow-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !pnrInput}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t.checkStatusButton}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo PNR Chips for Fast Testing */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-300">
          <span className="font-semibold text-orange-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            {t.samplePnrHint}
          </span>
          {samplePnrs.map((pnr) => (
            <button
              key={pnr}
              type="button"
              onClick={() => handleSampleClick(pnr)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-orange-500/40 text-white font-mono font-bold text-xs border border-white/20 transition-all hover:scale-105"
            >
              {pnr}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-200">
          {pnrResult ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-6 p-6 sm:p-8">
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      PNR NUMBER:
                    </span>
                    <span className="text-2xl font-black text-blue-900 font-mono tracking-wider">
                      {pnrResult.pnr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Booked on {formatDate(pnrResult.bookedAt)} • {t.chartPrepared}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl ${
                      pnrResult.bookingStatus === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {pnrResult.bookingStatus === 'CONFIRMED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{pnrResult.bookingStatus}</span>
                  </span>

                  <button
                    onClick={() => setShowFullTicketModal(true)}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.viewTicket}</span>
                  </button>
                </div>
              </div>

              {/* Train and Route Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Departure</span>
                  <div className="text-lg font-black text-slate-900 font-mono">{pnrResult.departureTime}</div>
                  <div className="text-xs font-bold text-slate-800">{pnrResult.source.city} ({pnrResult.source.code})</div>
                  <div className="text-[11px] text-slate-500">{pnrResult.source.name}</div>
                </div>

                <div className="text-center py-2 sm:py-0 border-y sm:border-y-0 sm:border-x border-slate-200">
                  <div className="text-xs font-black text-blue-900">
                    #{pnrResult.trainNumber} {pnrResult.trainName}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Date of Journey: <strong className="text-slate-800">{formatDate(pnrResult.journeyDate)}</strong>
                  </div>
                  <div className="text-[10px] text-orange-600 font-bold uppercase mt-1">
                    Class: {pnrResult.travelClass} • Quota: GN
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Arrival</span>
                  <div className="text-lg font-black text-slate-900 font-mono">{pnrResult.arrivalTime}</div>
                  <div className="text-xs font-bold text-slate-800">{pnrResult.destination.city} ({pnrResult.destination.code})</div>
                  <div className="text-[11px] text-slate-500">{pnrResult.destination.name}</div>
                </div>
              </div>

              {/* Passenger Status Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                  Passenger Current Booking Status
                </h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Passenger Name</th>
                        <th className="py-3 px-4">Booking Status</th>
                        <th className="py-3 px-4">{t.currentStatus}</th>
                        <th className="py-3 px-4">{t.coach}</th>
                        <th className="py-3 px-4">{t.berthSeat}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {pnrResult.passengers.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                          <td className="py-3 px-4">
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              {pnrResult.bookingStatus === 'CANCELLED' ? 'CAN' : 'CNF'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold px-2 py-0.5 rounded ${
                              pnrResult.bookingStatus === 'CANCELLED'
                                ? 'text-rose-700 bg-rose-50'
                                : 'text-emerald-700 bg-emerald-50'
                            }`}>
                              {pnrResult.bookingStatus === 'CANCELLED' ? 'CANCELLED' : 'CNF (Confirmed)'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-900">
                            {pnrResult.bookingStatus === 'CANCELLED' ? '-' : (p.allocatedCoach || 'C2')}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-900">
                            {pnrResult.bookingStatus === 'CANCELLED' ? '-' : `${p.allocatedSeat || 24} (${p.allocatedBerth || 'LB'})`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Fare & Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div>
                  Payment Mode: <strong className="text-slate-800">{pnrResult.paymentMethod}</strong> • Total Fare: <strong className="text-orange-600 font-bold">{formatCurrency(pnrResult.totalFare)}</strong>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticated IRCTC PNR Record</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-md space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">{t.pnrNotFoundTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {t.pnrNotFoundDesc}
              </p>
              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-2">Try testing with this registered PNR:</span>
                <button
                  onClick={() => handleSampleClick('4528192374')}
                  className="px-4 py-2 rounded-xl bg-orange-50 text-orange-700 font-mono font-bold text-xs border border-orange-200 hover:bg-orange-100 transition-colors"
                >
                  4528192374
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ticket Details Modal */}
      {showFullTicketModal && pnrResult && (
        <TicketDetailsModal
          booking={pnrResult}
          onClose={() => setShowFullTicketModal(false)}
        />
      )}
    </div>
  );
};
