import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Train, 
  ShieldCheck, 
  QrCode, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileText
} from 'lucide-react';
import { Booking } from '../types';
import { useLocalization } from '../i18n/LocalizationContext';

interface TicketDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
  onCancelRequest?: (booking: Booking) => void;
}

export const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({
  booking,
  onClose,
  onCancelRequest
}) => {
  const { t, formatCurrency, formatDate, formatTime } = useLocalization();

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const isCancelled = booking.bookingStatus === 'CANCELLED';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-300 my-4">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>Electronic Reservation Slip (ERS)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printTicket}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable ERS Ticket Document */}
        <div className="ticket-print-area p-6 sm:p-8 space-y-6 bg-white text-slate-900">
          {/* Header */}
          <div className="border-b-2 border-blue-900 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center">
                  <Train className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-blue-950">
                      INDIAN RAILWAYS / IRCTC
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-300">
                      ERS TICKET
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Electronic Reservation Slip (Record of Passenger Carriage)
                  </p>
                </div>
              </div>

              {/* Status Badge & QR simulation */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Reservation Status</span>
                  <span
                    className={`inline-block text-xs font-black px-2.5 py-1 rounded-md ${
                      isCancelled
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {isCancelled ? 'CANCELLED' : 'CONFIRMED (CNF)'}
                  </span>
                </div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center p-1">
                  <QrCode className="w-10 h-10 text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          {/* PNR and Basic Journey Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">{t.pnrNumber}</span>
              <span className="text-base font-black text-blue-900 font-mono tracking-wider">{booking.pnr}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Train No. & Name</span>
              <span className="font-bold text-slate-900 truncate block">#{booking.trainNumber} {booking.trainName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Class & Quota</span>
              <span className="font-bold text-slate-900">{booking.travelClass} / General (GN)</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Date of Journey</span>
              <span className="font-bold text-slate-900">{formatDate(booking.journeyDate)}</span>
            </div>
          </div>

          {/* Stations & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 bg-white text-xs items-center">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">From / Departure</span>
              <span className="text-base font-black text-slate-900">{booking.source.city}</span>
              <span className="text-slate-500 block">{booking.source.name} [{booking.source.code}]</span>
              <span className="text-blue-900 font-bold font-mono mt-1 block">{booking.departureTime} hrs</span>
            </div>
            <div className="text-center py-2 sm:py-0 border-y sm:border-y-0 sm:border-x border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Journey Distance</span>
              <span className="font-bold text-slate-800">Direct Route</span>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                Chart Prepared
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">To / Scheduled Arrival</span>
              <span className="text-base font-black text-slate-900">{booking.destination.city}</span>
              <span className="text-slate-500 block">{booking.destination.name} [{booking.destination.code}]</span>
              <span className="text-blue-900 font-bold font-mono mt-1 block">{booking.arrivalTime} hrs</span>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Passenger Reservation & Seat Allocation Details
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Passenger Name</th>
                    <th className="py-2.5 px-3">Age</th>
                    <th className="py-2.5 px-3">Gender</th>
                    <th className="py-2.5 px-3">Booking Status</th>
                    <th className="py-2.5 px-3">Coach</th>
                    <th className="py-2.5 px-3">Berth / Seat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {booking.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{p.name}</td>
                      <td className="py-2.5 px-3">{p.age}</td>
                      <td className="py-2.5 px-3">{p.gender}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block font-bold text-[10px] px-2 py-0.5 rounded ${
                          isCancelled ? 'text-rose-700 bg-rose-50' : 'text-emerald-700 bg-emerald-50'
                        }`}>
                          {isCancelled ? 'CAN' : 'CNF'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono text-blue-900">
                        {isCancelled ? '-' : (p.allocatedCoach || 'C2')}
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono text-blue-900">
                        {isCancelled ? 'Released' : `${p.allocatedSeat || 24} (${p.allocatedBerth || 'LB'})`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fare Summary Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 block mb-1">Payment & Accounting Details:</span>
              <div className="flex justify-between text-slate-600">
                <span>Payment Mode:</span>
                <span className="font-medium text-slate-900">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Booked On:</span>
                <span className="font-medium text-slate-900">{new Date(booking.bookedAt).toLocaleString('en-IN')}</span>
              </div>
              {isCancelled && booking.refundAmount !== undefined && (
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-100">
                  <span>Refund Initiated:</span>
                  <span>{formatCurrency(booking.refundAmount)}</span>
                </div>
              )}
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Ticket Fare:</span>
                <span className="font-medium text-slate-900">{formatCurrency(booking.baseFare)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Reservation Charge:</span>
                <span className="font-medium text-slate-900">{formatCurrency(booking.reservationCharge)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Superfast / Convenience:</span>
                <span className="font-medium text-slate-900">{formatCurrency(booking.superfastCharge)}</span>
              </div>
              {booking.gst > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>GST (5%):</span>
                  <span className="font-medium text-slate-900">{formatCurrency(booking.gst)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                <span>Total Fare Paid:</span>
                <span className="text-orange-600 font-mono">{formatCurrency(booking.totalFare)}</span>
              </div>
            </div>
          </div>

          {/* Passenger Instructions / IRCTC notice */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Important Railway Travel Instructions:
            </span>
            <p>1. At least one passenger must carry an original government-issued photo identity proof (Aadhaar, Voter ID, Passport, Driving License) during the journey.</p>
            <p>2. E-ticket holders are not required to visit railway booking counters. Present this ERS slip or SMS to the ticket examiner (TTE).</p>
          </div>

          {/* Footer Action Bar (hidden when printing) */}
          <div className="no-print pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Need assistance? Call Indian Railways Helpline <strong className="text-slate-800">139</strong>.
            </div>

            <div className="flex items-center gap-2">
              {!isCancelled && onCancelRequest && (
                <button
                  type="button"
                  onClick={() => onCancelRequest(booking)}
                  className="px-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
                >
                  {t.cancelTicket}
                </button>
              )}
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.printTicket}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
