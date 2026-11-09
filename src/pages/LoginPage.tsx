import React, { useState } from 'react';
import { 
  LogIn, 
  Lock, 
  Mail, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../services/auth.context';
import { useLocalization } from '../i18n/LocalizationContext';

interface LoginPageProps {
  onSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onNavigateToRegister }) => {
  const { t } = useLocalization();
  const { login } = useAuth();

  const [emailOrMobile, setEmailOrMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrMobile.trim()) {
      setErrorMessage('Please enter your Email or Mobile Number');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(emailOrMobile, password);
      setIsSubmitting(false);

      if (result.success) {
        onSuccess();
      } else {
        setErrorMessage(t.invalidCredentials);
      }
    }, 400);
  };

  const handleUseDemoAccount = () => {
    setEmailOrMobile('sathwikaloni2@gmail.com');
    setPassword('Password@123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
            <LogIn className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t.loginTitle}
          </h1>
          <p className="text-xs text-slate-500">
            {t.loginSubtitle}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.emailOrMobile} *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="sathwikaloni2@gmail.com or 9876543210"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.password} *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-orange-500 focus:ring-orange-400"
              />
              <span>{t.rememberMe}</span>
            </label>
            <button
              type="button"
              onClick={handleUseDemoAccount}
              className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{t.signInButton}</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          <span>{t.noAccountPrompt} </span>
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="font-bold text-orange-600 hover:text-orange-700 underline"
          >
            {t.registerHere}
          </button>
        </div>
      </div>
    </div>
  );
};
