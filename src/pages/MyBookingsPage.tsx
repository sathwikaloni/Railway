import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Train, 
  ArrowRight, 
  AlertCircle,
  Search,
  LogIn,
  Ticket
} from 'lucide-react';
import { Booking } from '../types';
import { storageService } from '../services/storage.service';
import { useAuth } from '../services/auth.context';
import { useLocalization } from '../i18n/LocalizationContext';
import { TicketDetailsModal } from './TicketDetailsModal';

interface MyBookingsPageProps {
  onNavigateToSearch: () => void;
  onNavigateToLogin: () => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  onNavigateToSearch,
  onNavigateToLogin
}) => {
  const { t, formatCurrency, formatDate, formatTime } = useLocalization();
  const { currentUser, isAuthenticated } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<Booking | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [cancellationSuccessMsg, setCancellationSuccessMsg] = useState<string>('');

  const loadBookings = () => {
    if (!currentUser) {
      setBookings([]);
      return;
    }
    const userBookings = storageService.getUserBookings(currentUser.id || currentUser.email);
    setBookings(userBookings);
  };

  useEffect(() => {
    loadBookings();

    const handleBookingsChange = () => {
      loadBookings();
    };
    window.addEventListener('bookings-change', handleBookingsChange);
    return () => window.removeEventListener('bookings-change', handleBookingsChange);
  }, [currentUser]);

  const handleOpenCancelModal = (booking: Booking) => {
    setBookingToCancel(booking);
  };

  const handleConfirmCancel = () => {
    if (!bookingToCancel) return;

    const updated = storageService.cancelBooking(bookingToCancel.id);
    if (updated) {
      setCancellationSuccessMsg(
        `Ticket with PNR ${updated.pnr} has been cancelled successfully. Refund of ${formatCurrency(
          updated.refundAmount || 0
        )} initiated.`
      );
      loadBookings();
      if (selectedBookingForModal && selectedBookingForModal.id === updated.id) {
        setSelectedBookingForModal(updated);
      }
    }
    setBookingToCancel(null);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto">
          <Ticket className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">{t.myBookingsTitle}</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Please log in to your RailConnect account to view, download, or manage your train tickets and travel history.
        </p>
        <button
          onClick={onNavigateToLogin}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{t.navLogin} / {t.navRegister}</span>
        </button>
      </div>
    );
  }

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'CONFIRMED') return b.bookingStatus === 'CONFIRMED';
    if (statusFilter === 'CANCELLED') return b.bookingStatus === 'CANCELLED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t.myBookingsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.myBookingsSubtitle}
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setStatusFilter('CONFIRMED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'CONFIRMED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Confirmed ({bookings.filter((b) => b.bookingStatus === 'CONFIRMED').length})
          </button>
          <button
            onClick={() => setStatusFilter('CANCELLED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'CANCELLED'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Cancelled ({bookings.filter((b) => b.bookingStatus === 'CANCELLED').length})
          </button>
        </div>
      </div>

      {cancellationSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{cancellationSuccessMsg}</span>
          </div>
          <button
            onClick={() => setCancellationSuccessMsg('')}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">{t.noBookingsFound}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {t.noBookingsDesc}
          </p>
          <button
            onClick={onNavigateToSearch}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{t.searchTrains}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isConfirmed = booking.bookingStatus === 'CONFIRMED';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Booking Header Strip */}
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-500 uppercase">{t.pnrNumber}:</span>
                    <span className="text-sm font-black text-blue-900 font-mono tracking-wider">
                      {booking.pnr}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Booked on {formatDate(booking.bookedAt)}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Train and Route Details */}
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-900 text-xs">
                        #{booking.trainNumber}
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {booking.trainName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span>{booking.source.city} ({booking.source.code})</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                      <span>{booking.destination.city} ({booking.destination.code})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Journey: <strong className="text-slate-700">{formatDate(booking.journeyDate)}</strong> ({booking.departureTime} - {booking.arrivalTime})
                    </div>
                  </div>

                  {/* Passengers & Class */}
                  <div className="md:col-span-4 space-y-1 text-xs">
                    <div className="text-slate-500 font-medium">
                      Class: <strong className="text-slate-800">{booking.travelClass}</strong> • Passengers: <strong className="text-slate-800">{booking.passengers.length}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {booking.passengers.map((p, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          {p.name} ({p.allocatedCoach ? `${p.allocatedCoach}-${p.allocatedSeat}` : 'CNF'})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fare & Action Buttons */}
                  <div className="md:col-span-4 flex flex-col sm:flex-row items-end sm:items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Amount</span>
                      <span className="text-base font-black text-slate-900 font-mono">
                        {formatCurrency(booking.totalFare)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBookingForModal(booking)}
                        className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                        title="View and print ticket"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t.viewTicket}</span>
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => handleOpenCancelModal(booking)}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                          title="Cancel ticket with refund"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Ticket Details Modal */}
      {selectedBookingForModal && (
        <TicketDetailsModal
          booking={selectedBookingForModal}
          onClose={() => setSelectedBookingForModal(null)}
          onCancelRequest={(b) => {
            setSelectedBookingForModal(null);
            handleOpenCancelModal(b);
          }}
        />
      )}

      {/* Cancellation Confirmation Dialog */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t.confirmCancelModalTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.confirmCancelModalDesc}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">PNR Number:</span>
                <span className="font-mono font-bold text-slate-800">{bookingToCancel.pnr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Train:</span>
                <span className="font-bold text-slate-800">#{bookingToCancel.trainNumber} - {bookingToCancel.trainName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Fare Paid:</span>
                <span className="font-bold text-slate-800">{formatCurrency(bookingToCancel.totalFare)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                <span>Estimated Refund:</span>
                <span>
                  {formatCurrency(
                    Math.max(0, bookingToCancel.totalFare - 120 * bookingToCancel.passengers.length)
                  )}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              {t.refundNotice}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingToCancel(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {t.keepTicket}
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-colors"
              >
                {t.yesCancelTicket}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
