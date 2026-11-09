import { User } from '../../models/user.model';
import { Booking } from '../../models/booking.model';

export class StorageService {
  private USERS_KEY = 'railconnect_users';
  private CURRENT_USER_KEY = 'railconnect_current_user';
  private BOOKINGS_KEY = 'railconnect_bookings';

  getUsers(): User[] {
    try {
      const data = localStorage.getItem(this.USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(this.CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(this.BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
  }

  getBookingByPnr(pnr: string): Booking | undefined {
    return this.getBookings().find(b => b.pnr.replace(/[\s-]/g, '') === pnr.replace(/[\s-]/g, ''));
  }
}
