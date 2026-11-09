import React from 'react';
import { Train, Phone, ShieldCheck, ExternalLink, Heart, Code2 } from 'lucide-react';
import { useLocalization } from '../i18n/LocalizationContext';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openAngularModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openAngularModal }) => {
  const { t, language, setLanguage } = useLocalization();

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07192e] text-slate-300 pt-12 pb-8 border-t border-blue-900/40">
      {/* 139 Emergency Helpline Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-blue-950 via-[#0f3460] to-blue-950 rounded-2xl p-4 sm:p-6 border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg">
                {t.helplineBanner}
              </p>
              <p className="text-xs text-slate-300">
                Single window portal for passenger grievance redressal, medical emergencies, security assistance & inquiries.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-orange-400 font-bold bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/30">
              Dial 139 Anytime
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <Train className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">
              Rail<span className="text-orange-400">Connect</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Banking & Payments</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
            {t.quickLinks}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-orange-400 transition-colors">
                {t.navHome}
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('train-search')} className="hover:text-orange-400 transition-colors">
                {t.navSearch}
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('pnr-status')} className="hover:text-orange-400 transition-colors">
                {t.navPnrStatus}
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('my-bookings')} className="hover:text-orange-400 transition-colors">
                {t.navMyBookings}
              </button>
            </li>
            <li>
              <button onClick={openAngularModal} className="text-orange-300 hover:text-orange-200 transition-colors font-medium flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" />
                {t.viewAngularCode}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Railway Services */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
            {t.railServices}
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center justify-between">
              <span>IRCTC e-Catering Food Delivery</span>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded">Active</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Tatkal Booking Window (10:00 / 11:00 AM)</span>
              <span className="text-[10px] bg-orange-900/60 text-orange-300 px-1.5 py-0.5 rounded">GN/TQ</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Vande Bharat & Tejas Express</span>
              <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">High-Speed</span>
            </li>
            <li className="flex items-center justify-between">
              <span>National Train Enquiry (NTES)</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">24x7</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Multilingual & Support */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
            {t.contactSupport}
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <p>
              Customer Care Email: <span className="text-white font-mono">support@railconnect.gov.in</span>
            </p>
            <p>
              Ticket Cancellation Helpline: <span className="text-white font-mono">139 (Option 4)</span>
            </p>
            <div className="pt-2">
              <p className="text-white font-semibold mb-1.5">Languages / భాషలు / भाषाएँ:</p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    language === 'en' ? 'bg-orange-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    language === 'te' ? 'bg-orange-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    language === 'hi' ? 'bg-orange-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
        <p className="text-center sm:text-right text-slate-400">
          {t.disclaimer}
        </p>
      </div>
    </footer>
  );
};
