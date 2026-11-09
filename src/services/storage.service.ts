import { Booking, User, SupportedLanguage } from '../types';

const STORAGE_KEYS = {
  USERS: 'railconnect_users',
  CURRENT_USER: 'railconnect_current_user',
  BOOKINGS: 'railconnect_bookings',
  LANGUAGE: 'railconnect_language',
  LAST_SEARCH: 'railconnect_last_search'
};

const DEFAULT_USERS: User[] = [
  {
    id: 'usr-1',
    fullName: 'Sathwika Loni',
    email: 'sathwikaloni2@gmail.com',
    mobile: '9876543210',
    password: 'Password@123',
    gender: 'Female',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-2',
    fullName: 'Rahul Sharma',
    email: 'demo@railconnect.in',
    mobile: '9123456780',
    password: 'Password@123',
    gender: 'Male',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    pnr: '4528192374',
    userId: 'usr-1',
    userEmail: 'sathwikaloni2@gmail.com',
    userMobile: '9876543210',
    trainNumber: '20701',
    trainName: 'Secunderabad - Tirupati Vande Bharat Express',
    trainType: 'Vande Bharat',
    source: { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana' },
    destination: { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', state: 'Andhra Pradesh' },
    departureTime: '06:00',
    arrivalTime: '09:20',
    journeyDate: '2026-11-15',
    travelClass: 'CC',
    passengers: [
      {
        id: 'p-1',
        name: 'Sathwika Loni',
        age: 23,
        gender: 'Female',
        berthPreference: 'Window',
        allocatedCoach: 'C2',
        allocatedSeat: 24,
        allocatedBerth: 'Window',
        status: 'CNF'
      },
      {
        id: 'p-2',
        name: 'Priya Loni',
        age: 26,
        gender: 'Female',
        berthPreference: 'Window',
        allocatedCoach: 'C2',
        allocatedSeat: 25,
        allocatedBerth: 'No Preference',
        status: 'CNF'
      }
    ],
    baseFare: 1770,
    reservationCharge: 80,
    superfastCharge: 90,
    gst: 97,
    totalFare: 2037,
    bookingStatus: 'CONFIRMED',
    bookedAt: '2026-11-01T10:14:00.000Z',
    paymentMethod: 'IRCTC iPay (UPI)'
  },
  {
    id: 'bk-102',
    pnr: '2319084712',
    userId: 'usr-1',
    userEmail: 'sathwikaloni2@gmail.com',
    userMobile: '9876543210',
    trainNumber: '12007',
    trainName: 'MGR Chennai - Mysuru Shatabdi Express',
    trainType: 'Shatabdi',
    source: { code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
    destination: { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka' },
    departureTime: '06:00',
    arrivalTime: '10:55',
    journeyDate: '2026-11-20',
    travelClass: 'CC',
    passengers: [
      {
        id: 'p-3',
        name: 'Sathwika Loni',
        age: 23,
        gender: 'Female',
        berthPreference: 'Window',
        allocatedCoach: 'C4',
        allocatedSeat: 18,
        allocatedBerth: 'Window',
        status: 'CNF'
      }
    ],
    baseFare: 995,
    reservationCharge: 40,
    superfastCharge: 45,
    gst: 54,
    totalFare: 1134,
    bookingStatus: 'CONFIRMED',
    bookedAt: '2026-11-02T14:20:00.000Z',
    paymentMethod: 'Net Banking (SBI)'
  }
];

class StorageService {
  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }

    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    }

    // Default logged in user for immediate seamless testing if desired, or user can log out
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    }
  }

  // Users
  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    window.dispatchEvent(new Event('auth-change'));
  }

  // Bookings
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  }

  getUserBookings(userIdOrEmail: string): Booking[] {
    const all = this.getBookings();
    return all.filter(b => b.userId === userIdOrEmail || b.userEmail.toLowerCase() === userIdOrEmail.toLowerCase());
  }

  saveBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new Event('bookings-change'));
  }

  getBookingByPnr(pnr: string): Booking | undefined {
    const cleanPnr = pnr.replace(/[\s-]/g, '').trim();
    const bookings = this.getBookings();
    return bookings.find(b => b.pnr.replace(/[\s-]/g, '').trim() === cleanPnr);
  }

  cancelBooking(bookingId: string): Booking | null {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return null;

    const booking = bookings[idx];
    if (booking.bookingStatus === 'CANCELLED') return booking;

    // Cancellation policy: Deduct standard IRCTC clerkage / cancellation charges
    const cancellationFee = booking.travelClass === '1A' ? 240 :
      booking.travelClass === '2A' ? 200 :
      booking.travelClass === '3A' ? 180 :
      booking.travelClass === 'CC' ? 180 : 120;
    
    const totalDeduction = cancellationFee * booking.passengers.length;
    const refund = Math.max(0, booking.totalFare - totalDeduction);

    booking.bookingStatus = 'CANCELLED';
    booking.cancelledAt = new Date().toISOString();
    booking.refundAmount = refund;

    // Mark passengers as cancelled
    booking.passengers = booking.passengers.map(p => ({
      ...p,
      status: 'WL' as const // release seat
    }));

    bookings[idx] = booking;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new Event('bookings-change'));
    return booking;
  }

  // Language
  getLanguage(): SupportedLanguage {
    try {
      const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (lang as SupportedLanguage) || 'en';
    } catch {
      return 'en';
    }
  }

  setLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    window.dispatchEvent(new CustomEvent('language-change', { detail: lang }));
  }

  // Last search
  getLastSearch(): { from: string; to: string; date: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_SEARCH);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  saveLastSearch(search: { from: string; to: string; date: string }): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SEARCH, JSON.stringify(search));
  }
}

export const storageService = new StorageService();
