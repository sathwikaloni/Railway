import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Languages, 
  TrendingUp, 
  ArrowRight, 
  Utensils, 
  Bed, 
  Compass, 
  Award,
  ChevronRight,
  Train
} from 'lucide-react';
import { HeroSearch } from '../components/HeroSearch';
import { useLocalization } from '../i18n/LocalizationContext';

interface HomePageProps {
  onSearchTrains: (params: { from: string; to: string; date: string; travelClass: string; quota: string }) => void;
  onSelectRoute: (from: string, to: string) => void;
  openAngularModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearchTrains, onSelectRoute, openAngularModal }) => {
  const { t, formatCurrency } = useLocalization();

  const popularRoutes = [
    {
      from: 'SC',
      to: 'BZA',
      fromCity: 'Hyderabad',
      toCity: 'Vijayawada',
      trainsCount: 18,
      duration: '3h 20m',
      startingFare: 245,
      type: 'Vande Bharat / SF',
      bgGradient: 'from-blue-900 to-indigo-950',
      badge: 'Popular Route'
    },
    {
      from: 'NDLS',
      to: 'MMCT',
      fromCity: 'New Delhi',
      toCity: 'Mumbai Central',
      trainsCount: 14,
      duration: '15h 40m',
      startingFare: 2140,
      type: 'Rajdhani / Tejas',
      bgGradient: 'from-amber-900 to-orange-950',
      badge: 'High Speed Corridor'
    },
    {
      from: 'BZA',
      to: 'MAS',
      fromCity: 'Vijayawada',
      toCity: 'Chennai',
      trainsCount: 12,
      duration: '5h 45m',
      startingFare: 165,
      type: 'Coromandel / SF',
      bgGradient: 'from-emerald-900 to-teal-950',
      badge: 'Coastal Express'
    },
    {
      from: 'SC',
      to: 'SBC',
      fromCity: 'Hyderabad',
      toCity: 'Bengaluru',
      trainsCount: 8,
      duration: '8h 30m',
      startingFare: 375,
      type: 'Vande Bharat / Exp',
      bgGradient: 'from-purple-900 to-slate-950',
      badge: 'Tech Corridor'
    },
    {
      from: 'VSKP',
      to: 'SC',
      fromCity: 'Visakhapatnam',
      toCity: 'Hyderabad',
      trainsCount: 10,
      duration: '8h 30m',
      startingFare: 410,
      type: 'Vande Bharat / Godavari',
      bgGradient: 'from-cyan-900 to-blue-950',
      badge: 'Superfast'
    },
    {
      from: 'MAS',
      to: 'SBC',
      fromCity: 'Chennai',
      toCity: 'Bengaluru',
      trainsCount: 16,
      duration: '4h 55m',
      startingFare: 150,
      type: 'Shatabdi / Vande Bharat',
      bgGradient: 'from-rose-900 to-slate-950',
      badge: 'Express Corridor'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: t.instantBookingTitle,
      description: t.instantBookingDesc
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: t.securePaymentsTitle,
      description: t.securePaymentsDesc
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: t.liveTrackingTitle,
      description: t.liveTrackingDesc
    },
    {
      icon: <Languages className="w-6 h-6 text-purple-500" />,
      title: t.multilingualTitle,
      description: t.multilingualDesc
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2847] via-[#0f3460] to-[#122b49] text-white pt-10 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle railway track backdrop decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-6xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs sm:text-sm font-semibold mb-2">
            <Award className="w-4 h-4 text-orange-400" />
            <span>INDIAN RAILWAYS RESERVATION RE-IMAGINED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 font-medium">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Floating Search Form */}
        <div className="relative max-w-5xl mx-auto">
          <HeroSearch onSearch={onSearchTrains} />
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>FREQUENT CORRIDORS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.popularRoutesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.popularRoutesSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularRoutes.map((route, idx) => (
              <div
                key={idx}
                onClick={() => onSelectRoute(route.from, route.to)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 hover:border-orange-500/60 p-5 bg-gradient-to-br from-slate-50 to-white hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {route.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {route.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <div className="text-lg font-black text-slate-900">{route.fromCity}</div>
                      <div className="text-xs font-mono font-bold text-orange-600">{route.from}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-2">
                      <span className="text-[10px] text-slate-400 font-semibold">{route.type}</span>
                      <div className="w-full flex items-center gap-1 my-1">
                        <div className="h-[2px] flex-1 bg-slate-300 group-hover:bg-orange-400 transition-colors" />
                        <Train className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                        <div className="h-[2px] flex-1 bg-slate-300 group-hover:bg-orange-400 transition-colors" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">{route.toCity}</div>
                      <div className="text-xs font-mono font-bold text-blue-800">{route.to}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Starting from</span>
                    <span className="text-base font-extrabold text-slate-900">
                      {formatCurrency(route.startingFare)}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:text-orange-700 group-hover:translate-x-1 transition-all">
                    <span>Search Trains</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose RailConnect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.whyChooseTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t.whyChooseSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Railway Services Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-[#0f3460] to-blue-950 rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-wider font-bold text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 inline-block">
              INTEGRATED VALUE ADDED SERVICES
            </span>
            <h3 className="text-2xl sm:text-4xl font-black leading-tight">
              Delicious Food & Comfortable Stays Along Your Rail Journey
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experience hot hygienic food delivered directly to your train berth with IRCTC e-Catering, or book official railway retiring rooms and executive lounges at over 300 major junctions across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
                <Utensils className="w-4 h-4 text-orange-400" />
                <span>e-Catering at 450+ Stations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
                <Bed className="w-4 h-4 text-emerald-400" />
                <span>IRCTC Executive Lounges</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Bharat Gaurav Tourist Trains</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
