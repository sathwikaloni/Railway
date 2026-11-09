import React, { useState } from 'react';
import { 
  Train, 
  Search, 
  Ticket, 
  FileText, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Globe, 
  Menu, 
  X, 
  ChevronDown,
  Code2,
  ShieldCheck
} from 'lucide-react';
import { useLocalization } from '../i18n/LocalizationContext';
import { useAuth } from '../services/auth.context';
import { SupportedLanguage } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAngularModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openAngularModal }) => {
  const { t, language, setLanguage } = useLocalization();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0b2847] via-[#0f3460] to-[#16425b] text-white shadow-lg border-b border-blue-900/40">
      {/* Top micro bar for IRCTC feel */}
      <div className="bg-[#071a2e] text-xs py-1.5 px-4 text-slate-300 border-b border-blue-950 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-orange-400 font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            IRCTC INITIATIVE PORTAL
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            {t.helplineCall}: <strong className="text-white">139</strong> (Indian Railway Customer Care)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={openAngularModal}
            className="flex items-center gap-1.5 text-xs text-orange-300 hover:text-orange-200 transition-colors font-medium bg-orange-950/40 hover:bg-orange-900/60 px-2 py-0.5 rounded border border-orange-500/30"
            title="Inspect Angular Standalone Components & XLIFF files"
          >
            <Code2 className="w-3 h-3 text-orange-400" />
            <span>{t.viewAngularCode}</span>
          </button>
          <span className="text-slate-400 text-xs hidden md:inline">
            {new Date().toLocaleDateString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-orange-300/30">
              <Train className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Rail<span className="text-orange-400">Connect</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  IRCTC
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{t.navHome}</span>
            </button>

            <button
              onClick={() => handleNav('train-search')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'train-search'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.navSearch}</span>
            </button>

            <button
              onClick={() => handleNav('pnr-status')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'pnr-status'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{t.navPnrStatus}</span>
            </button>

            <button
              onClick={() => handleNav('my-bookings')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'my-bookings'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.navMyBookings}</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-white/15"
                title="Change language / భాషను మార్చండి / भाषा बदलें"
              >
                <Globe className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">
                  {languages.find(l => l.code === language)?.native || 'English'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 bg-white text-slate-800 rounded-xl shadow-xl py-2 z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Language / భాష
                  </div>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => setLanguage(item.code)}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                        language === item.code 
                          ? 'bg-orange-50 text-orange-600 font-bold' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{item.native}</span>
                      <span className="text-xs text-slate-400">({item.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile or Login */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold shadow hover:brightness-105 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-orange-600 font-bold flex items-center justify-center text-xs">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline">
                    {currentUser.fullName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-2xl py-2 z-50 border border-slate-200"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">{t.navWelcome},</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => handleNav('my-bookings')}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Ticket className="w-4 h-4 text-orange-500" />
                      <span>{t.navMyBookings}</span>
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        handleNav('home');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.navLogout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.navLogin}</span>
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.navRegister}</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09223d] border-t border-blue-900/60 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentTab === 'home' ? 'bg-orange-500 text-white' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <span>{t.navHome}</span>
          </button>
          <button
            onClick={() => handleNav('train-search')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentTab === 'train-search' ? 'bg-orange-500 text-white' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t.navSearch}</span>
          </button>
          <button
            onClick={() => handleNav('pnr-status')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentTab === 'pnr-status' ? 'bg-orange-500 text-white' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{t.navPnrStatus}</span>
          </button>
          <button
            onClick={() => handleNav('my-bookings')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
              currentTab === 'my-bookings' ? 'bg-orange-500 text-white' : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.navMyBookings}</span>
          </button>

          <div className="border-t border-blue-800/60 pt-3">
            {isAuthenticated && currentUser ? (
              <div className="space-y-2">
                <div className="px-3 text-xs text-slate-400">
                  {t.navWelcome}, <strong className="text-white">{currentUser.fullName}</strong>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleNav('home');
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-sm font-semibold text-red-300 hover:bg-red-950/40 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-center bg-white/10 text-white"
                >
                  {t.navLogin}
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-center bg-orange-500 text-white"
                >
                  {t.navRegister}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
