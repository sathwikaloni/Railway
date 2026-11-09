/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LocalizationProvider } from './i18n/LocalizationContext';
import { AuthProvider, useAuth } from './services/auth.context';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TrainSearchPage } from './pages/TrainSearchPage';
import { BookingPage } from './pages/BookingPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { PnrStatusPage } from './pages/PnrStatusPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TicketDetailsModal } from './pages/TicketDetailsModal';
import { AngularSourceViewerModal } from './components/AngularSourceViewerModal';
import { Train, TravelClassType, QuotaType, Booking } from './types';
import { INITIAL_TRAINS } from './services/train.data';

const AppContent: React.FC = () => {
  const { isAuthenticated, pendingRedirect, setPendingRedirect } = useAuth();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Search parameters state
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    date: string;
    travelClass: string;
    quota: QuotaType;
  }>({
    from: 'SC',
    to: 'BZA',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    travelClass: 'ALL',
    quota: 'GN'
  });

  // Selected train for booking flow
  const [bookingDetails, setBookingDetails] = useState<{
    train: Train;
    travelClass: TravelClassType;
    date: string;
    quota: QuotaType;
  }>({
    train: INITIAL_TRAINS[0],
    travelClass: 'CC',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    quota: 'GN'
  });

  // Ticket modal (for viewing an issued ticket)
  const [viewingTicket, setViewingTicket] = useState<Booking | null>(null);

  // Angular Source Viewer modal
  const [isAngularModalOpen, setIsAngularModalOpen] = useState<boolean>(false);

  // Handlers
  const handleSearchTrains = (params: {
    from: string;
    to: string;
    date: string;
    travelClass: string;
    quota: string;
  }) => {
    setSearchParams({
      from: params.from,
      to: params.to,
      date: params.date,
      travelClass: params.travelClass,
      quota: (params.quota as QuotaType) || 'GN'
    });
    setCurrentTab('train-search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRouteFromHome = (from: string, to: string) => {
    setSearchParams((prev) => ({
      ...prev,
      from,
      to
    }));
    setCurrentTab('train-search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrainForBooking = (
    train: Train,
    selectedClass: TravelClassType,
    date: string,
    quota: QuotaType
  ) => {
    setBookingDetails({
      train,
      travelClass: selectedClass,
      date,
      quota
    });

    if (!isAuthenticated) {
      setPendingRedirect('booking');
      setCurrentTab('login');
    } else {
      setCurrentTab('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    if (pendingRedirect) {
      const destination = pendingRedirect;
      setPendingRedirect(null);
      setCurrentTab(destination);
    } else {
      setCurrentTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingCompleted = (booking: Booking) => {
    setViewingTicket(booking);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openAngularModal={() => setIsAngularModalOpen(true)}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSearchTrains={handleSearchTrains}
            onSelectRoute={handleSelectRouteFromHome}
            openAngularModal={() => setIsAngularModalOpen(true)}
          />
        )}

        {currentTab === 'train-search' && (
          <TrainSearchPage
            initialFrom={searchParams.from}
            initialTo={searchParams.to}
            initialDate={searchParams.date}
            initialClass={searchParams.travelClass}
            initialQuota={searchParams.quota}
            onSelectTrainForBooking={handleSelectTrainForBooking}
          />
        )}

        {currentTab === 'booking' && (
          <BookingPage
            train={bookingDetails.train}
            travelClass={bookingDetails.travelClass}
            journeyDate={bookingDetails.date}
            quota={bookingDetails.quota}
            onBookingComplete={handleBookingCompleted}
            onNavigateToLogin={() => {
              setPendingRedirect('booking');
              setCurrentTab('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'pnr-status' && <PnrStatusPage />}

        {currentTab === 'my-bookings' && (
          <MyBookingsPage
            onNavigateToSearch={() => {
              setCurrentTab('train-search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLogin={() => {
              setPendingRedirect('my-bookings');
              setCurrentTab('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'login' && (
          <LoginPage
            onSuccess={handleLoginSuccess}
            onNavigateToRegister={() => {
              setCurrentTab('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'register' && (
          <RegisterPage
            onSuccess={handleLoginSuccess}
            onNavigateToLogin={() => {
              setCurrentTab('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer
        setCurrentTab={setCurrentTab}
        openAngularModal={() => setIsAngularModalOpen(true)}
      />

      {/* Ticket Details Modal if triggered */}
      {viewingTicket && (
        <TicketDetailsModal
          booking={viewingTicket}
          onClose={() => setViewingTicket(null)}
          onCancelRequest={() => {
            setViewingTicket(null);
            setCurrentTab('my-bookings');
          }}
        />
      )}

      {/* Angular Architecture & Code Viewer Modal */}
      <AngularSourceViewerModal
        isOpen={isAngularModalOpen}
        onClose={() => setIsAngularModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LocalizationProvider>
  );
}
