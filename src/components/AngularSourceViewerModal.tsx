import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  FileCode, 
  Copy, 
  Check, 
  Folder, 
  FolderOpen, 
  Download,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AngularSourceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AngularSourceViewerModal: React.FC<AngularSourceViewerModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeFileId, setActiveFileId] = useState<string>('auth-guard');
  const [copied, setCopied] = useState<boolean>(false);

  const files = [
    {
      id: 'auth-guard',
      name: 'auth.guard.ts',
      path: 'src/app/core/guards/auth.guard.ts',
      category: 'Guards',
      code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Angular Functional Route Guard for Protecting Reservation and My Bookings routes
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Preserve redirect URL and navigate to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};`
    },
    {
      id: 'auth-service',
      name: 'auth.service.ts',
      path: 'src/app/core/services/auth.service.ts',
      category: 'Services',
      code: `import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => !!this.currentUserSignal());

  constructor(private storage: StorageService) {
    const saved = this.storage.getCurrentUser();
    if (saved) {
      this.currentUserSignal.set(saved);
    }
  }

  login(identifier: string, pass: string): boolean {
    const users = this.storage.getUsers();
    const user = users.find(u => (u.email === identifier || u.mobile === identifier) && u.password === pass);
    if (user) {
      this.storage.setCurrentUser(user);
      this.currentUserSignal.set(user);
      return true;
    }
    return false;
  }

  register(userData: Omit<User, 'id' | 'createdAt'>): boolean {
    const newUser: User = {
      ...userData,
      id: 'usr-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    this.storage.saveUser(newUser);
    this.storage.setCurrentUser(newUser);
    this.currentUserSignal.set(newUser);
    return true;
  }

  logout(): void {
    this.storage.setCurrentUser(null);
    this.currentUserSignal.set(null);
  }
}`
    },
    {
      id: 'train-service',
      name: 'train.service.ts',
      path: 'src/app/core/services/train.service.ts',
      category: 'Services',
      code: `import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Train, TrainStation } from '../../models/train.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private dummyTrains: Train[] = [
    {
      id: 'tr-20701',
      number: '20701',
      name: 'Secunderabad - Tirupati Vande Bharat Express',
      trainType: 'Vande Bharat',
      source: { code: 'SC', name: 'Secunderabad Jn', city: 'Hyderabad', state: 'Telangana' },
      destination: { code: 'BZA', name: 'Vijayawada Jn', city: 'Vijayawada', state: 'Andhra Pradesh' },
      departureTime: '06:00',
      arrivalTime: '09:20',
      duration: '3h 20m',
      distanceKm: 313,
      runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
      pantryAvailable: true,
      classes: [
        { className: 'CC', classLabel: 'AC Chair Car', fare: 885, availableSeats: 56, status: 'AVAILABLE' },
        { className: 'EC', classLabel: 'Exec Chair Car', fare: 1690, availableSeats: 12, status: 'AVAILABLE' }
      ]
    }
  ];

  searchTrains(from: string, to: string, date: string): Observable<Train[]> {
    const filtered = this.dummyTrains.filter(t => 
      (!from || t.source.code === from) && (!to || t.destination.code === to)
    );
    return of(filtered.length > 0 ? filtered : this.dummyTrains);
  }
}`
    },
    {
      id: 'storage-service',
      name: 'storage.service.ts',
      path: 'src/app/core/services/storage.service.ts',
      category: 'Services',
      code: `import { Injectable } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USERS_KEY = 'railconnect_users';
  private CURRENT_USER_KEY = 'railconnect_current_user';
  private BOOKINGS_KEY = 'railconnect_bookings';

  getUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  getBookings(): Booking[] {
    const data = localStorage.getItem(this.BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
  }

  getBookingByPnr(pnr: string): Booking | undefined {
    return this.getBookings().find(b => b.pnr === pnr);
  }
}`
    },
    {
      id: 'booking-model',
      name: 'booking.model.ts',
      path: 'src/app/models/booking.model.ts',
      category: 'Models',
      code: `import { TrainStation } from './train.model';

export type TravelClassType = '1A' | '2A' | '3A' | 'SL' | 'CC' | '2S' | 'EC';
export type BerthPreference = 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window' | 'No Preference';

export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender';
  berthPreference: BerthPreference;
  allocatedCoach?: string;
  allocatedSeat?: number;
  allocatedBerth?: BerthPreference;
  status?: 'CNF' | 'RAC' | 'WL';
}

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  userEmail: string;
  userMobile?: string;
  trainNumber: string;
  trainName: string;
  source: TrainStation;
  destination: TrainStation;
  departureTime: string;
  arrivalTime: string;
  journeyDate: string;
  travelClass: TravelClassType;
  passengers: Passenger[];
  baseFare: number;
  totalFare: number;
  bookingStatus: 'CONFIRMED' | 'CANCELLED' | 'WAITING_LIST';
  bookedAt: string;
  paymentMethod: string;
}`
    },
    {
      id: 'xlf-en',
      name: 'messages.xlf',
      path: 'locale/messages.xlf',
      category: 'i18n (XLIFF)',
      code: `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="brandName" datatype="html">
        <source>RailConnect</source>
      </trans-unit>
      <trans-unit id="heroHeading" datatype="html">
        <source>Your Journey Begins Here</source>
      </trans-unit>
      <trans-unit id="searchTrains" datatype="html">
        <source>Search Trains</source>
      </trans-unit>
      <trans-unit id="bookNow" datatype="html">
        <source>Book Now</source>
      </trans-unit>
      <trans-unit id="pnrStatus" datatype="html">
        <source>Check PNR Status</source>
      </trans-unit>
    </body>
  </file>
</xliff>`
    },
    {
      id: 'xlf-te',
      name: 'messages.te.xlf',
      path: 'locale/messages.te.xlf',
      category: 'i18n (XLIFF)',
      code: `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" target-language="te" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="brandName" datatype="html">
        <source>RailConnect</source>
        <target>రైల్ కనెక్ట్</target>
      </trans-unit>
      <trans-unit id="heroHeading" datatype="html">
        <source>Your Journey Begins Here</source>
        <target>మీ ప్రయాణం ఇక్కడే ప్రారంభమవుతుంది</target>
      </trans-unit>
      <trans-unit id="searchTrains" datatype="html">
        <source>Search Trains</source>
        <target>రైళ్లను శోధించండి</target>
      </trans-unit>
      <trans-unit id="bookNow" datatype="html">
        <source>Book Now</source>
        <target>ఇప్పుడే బుక్ చేయండి</target>
      </trans-unit>
      <trans-unit id="pnrStatus" datatype="html">
        <source>Check PNR Status</source>
        <target>పిఎన్ఆర్ స్థితిని తనిఖీ చేయండి</target>
      </trans-unit>
    </body>
  </file>
</xliff>`
    },
    {
      id: 'xlf-hi',
      name: 'messages.hi.xlf',
      path: 'locale/messages.hi.xlf',
      category: 'i18n (XLIFF)',
      code: `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" target-language="hi" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="brandName" datatype="html">
        <source>RailConnect</source>
        <target>रेल कनेक्ट</target>
      </trans-unit>
      <trans-unit id="heroHeading" datatype="html">
        <source>Your Journey Begins Here</source>
        <target>आपकी यात्रा यहाँ से शुरू होती है</target>
      </trans-unit>
      <trans-unit id="searchTrains" datatype="html">
        <source>Search Trains</source>
        <target>ट्रेनें खोजें</target>
      </trans-unit>
      <trans-unit id="bookNow" datatype="html">
        <source>Book Now</source>
        <target>अभी बुक करें</target>
      </trans-unit>
      <trans-unit id="pnrStatus" datatype="html">
        <source>Check PNR Status</source>
        <target>पीएनआर स्थिति जांचें</target>
      </trans-unit>
    </body>
  </file>
</xliff>`
    }
  ];

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-slate-900 rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-700 overflow-hidden flex flex-col h-[85vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <span>Angular Architecture & Project Source Code</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Angular 18+ Standalone
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official source code for University Demonstration & IRCTC clone project architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left File Tree + Right Code Editor */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-900">
          {/* File Explorer Tree */}
          <div className="md:col-span-4 bg-slate-950/70 border-r border-slate-800 p-4 overflow-y-auto space-y-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>Project Files & XLIFF</span>
            </div>

            <div className="space-y-1">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                    activeFileId === file.id
                      ? 'bg-orange-500 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/30 font-sans">
                    {file.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                Angular Setup Highlights:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                <li>Standalone Components architecture (No NgModule)</li>
                <li>Signals & Computed reactivity</li>
                <li>Functional Route Guards (<code className="text-orange-300">CanActivateFn</code>)</li>
                <li>Angular i18n & XLIFF 1.2 translation files</li>
                <li>LocalStorage synchronization</li>
              </ul>
            </div>
          </div>

          {/* Right Code Area */}
          <div className="md:col-span-8 flex flex-col h-full bg-[#0d1117] overflow-hidden">
            {/* Code Header Bar */}
            <div className="px-5 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 truncate">
                {activeFile.path}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="flex-1 p-5 overflow-auto font-mono text-xs text-emerald-300 leading-relaxed selection:bg-orange-500 selection:text-white">
              <pre className="whitespace-pre">{activeFile.code}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
