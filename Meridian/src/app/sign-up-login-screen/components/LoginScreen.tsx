'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

type AuthMode = 'login' | 'signup';
type UserRole = 'student' | 'faculty' | 'admin';

interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormData {
  fullName: string;
  rollNumber: string;
  email: string;
  department: string;
  year: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const demoCredentials = [
  { id: 'cred-student', role: 'Student' as UserRole, email: '22A91A0501', password: 'vce@student2026', label: 'Ravi Kumar · CSE 3rd Year' },
  { id: 'cred-faculty', role: 'Faculty' as UserRole, email: 'faculty.cse@vce.ac.in', password: 'vce@faculty2026', label: 'Dr. S. Ramaiah · CSE Dept.' },
  { id: 'cred-admin', role: 'Admin' as UserRole, email: 'admin@vce.ac.in', password: 'vce@admin2026', label: 'VCE Admin Office' },
];

const departments = ['CSE', 'CSE (AI & ML)', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const campusHighlights = [
  { id: 'hl-naac', icon: 'StarIcon', label: 'NAAC A++ Grade', sub: 'Highest accreditation' },
  { id: 'hl-nba', icon: 'ShieldCheckIcon', label: 'NBA Accredited', sub: 'All UG programmes' },
  { id: 'hl-students', icon: 'UsersIcon', label: '3,500+ Students', sub: 'Across 7 departments' },
  { id: 'hl-placement', icon: 'BriefcaseIcon', label: '95% Placement', sub: 'Class of 2025' },
];

export default function LoginScreen({ initialMode = 'login' }: { initialMode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({
    defaultValues: { identifier: '', password: '', rememberMe: false },
  });

  const signupForm = useForm<SignupFormData>({
    defaultValues: {
      fullName: '', rollNumber: '', email: '', department: '', year: '', password: '', confirmPassword: '', agreeTerms: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/login with { identifier: data.identifier, password: data.password, role: activeRole }
    await new Promise((r) => setTimeout(r, 1200));

    const valid = demoCredentials.find(
      (c) => c.email === data.identifier && c.password === data.password
    );

    if (!valid) {
      setIsLoading(false);
      loginForm.setError('password', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }

    toast.success(`Welcome back, ${valid.label.split(' · ')[0]}!`);
    setIsLoading(false);
    router.push('/');
  };

  const handleSignup = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      signupForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setIsLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/signup with student data
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Account created! Welcome to Meridian.');
    setIsLoading(false);
    setMode('login');
  };

  const autofillCredentials = (cred: typeof demoCredentials[0]) => {
    setActiveRole(cred.role.toLowerCase() as UserRole);
    loginForm.setValue('identifier', cred.email);
    loginForm.setValue('password', cred.password);
    toast.info(`Demo credentials filled for ${cred.role}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[480px] xl:w-[560px] flex-shrink-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 relative overflow-hidden p-10">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-orange-400/30 rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <AppLogo size={28} />
          </div>
          <div>
            <p className="font-800 text-white text-lg leading-tight">Meridian</p>
            <p className="text-amber-100 text-xs font-500">Smart Campus Portal</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl xl:text-4xl font-800 text-white leading-tight mb-4">
            Your Campus,<br />Smarter.
          </h2>
          <p className="text-amber-100 text-base leading-relaxed mb-8 max-w-sm">
            Access results, attendance, events, and 7 AI-powered agents — all from one unified portal built for Meridian Engineering College.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3">
            {campusHighlights.map((h) => (
              <div key={h.id} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <Icon name={h.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-white mb-2" />
                <p className="text-white font-700 text-sm">{h.label}</p>
                <p className="text-amber-100 text-xs font-400 mt-0.5">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8">
          <p className="text-amber-200 text-xs">
            © 2026 Meridian Engineering College · Ibrahimbagh, Hyderabad
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-10 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={32} />
            <span className="font-800 text-xl text-gray-900">Meridian</span>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-muted rounded-2xl p-1 mb-8">
            {(['login', 'signup'] as AuthMode[]).map((m) => (
              <button
                key={`mode-${m}`}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-600 rounded-xl transition-all duration-200 ${
                  mode === m
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-muted-foreground hover:text-gray-700'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <>
              {/* Role selector */}
              <div className="mb-6">
                <p className="text-xs font-600 text-muted-foreground uppercase tracking-wide mb-2">Sign in as</p>
                <div className="flex gap-2">
                  {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={`role-${r}`}
                      onClick={() => setActiveRole(r)}
                      className={`flex-1 py-2.5 text-sm font-600 rounded-xl border transition-all duration-150 capitalize ${
                        activeRole === r
                          ? 'bg-amber-50 border-amber-300 text-amber-700' :'bg-white border-border text-gray-600 hover:border-amber-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login form */}
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">
                    {activeRole === 'student' ? 'Roll Number' : 'Email Address'}
                  </label>
                  <input
                    type={activeRole === 'student' ? 'text' : 'email'}
                    placeholder={activeRole === 'student' ? 'e.g. 22A91A0501' : 'your@vce.ac.in'}
                    {...loginForm.register('identifier', {
                      required: activeRole === 'student' ? 'Roll number is required' : 'Email is required',
                    })}
                    className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                  />
                  {loginForm.formState.errors.identifier && (
                    <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.identifier.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-600 text-gray-700">Password</label>
                    <button type="button" className="text-xs text-amber-600 hover:text-amber-700 font-500">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...loginForm.register('password', { required: 'Password is required' })}
                      className="w-full px-4 py-3 pr-11 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-gray-600 transition-colors"
                    >
                      <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    {...loginForm.register('rememberMe')}
                    className="w-4 h-4 rounded border-border text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 font-400">
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-700 text-sm rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In to Meridian'
                  )}
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="KeyIcon" size={14} className="text-amber-600" />
                  <p className="text-xs font-700 text-amber-800">Demo Accounts — click to autofill</p>
                </div>
                <div className="space-y-2">
                  {demoCredentials.map((cred) => (
                    <div key={cred.id} className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-amber-100">
                      <div className="min-w-0">
                        <p className="text-xs font-600 text-gray-800">{cred.role} · <span className="font-400 text-gray-500">{cred.label}</span></p>
                        <p className="text-[11px] text-muted-foreground font-400 font-tabular mt-0.5 truncate">{cred.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => autofillCredentials(cred)}
                        className="flex-shrink-0 ml-2 px-2.5 py-1 text-xs font-600 text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                      >
                        Use
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Signup form */
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="As per college records"
                  {...signupForm.register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                />
                {signupForm.formState.errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.fullName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Roll Number</label>
                  <input
                    type="text"
                    placeholder="22A91A0501"
                    {...signupForm.register('rollNumber', { required: 'Roll number is required', pattern: { value: /^\d{2}[A-Z]\d{2}[A-Z]\d{4}$/, message: 'Invalid format' } })}
                    className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                  />
                  {signupForm.formState.errors.rollNumber && (
                    <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.rollNumber.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-600 text-gray-700 mb-1.5">Year</label>
                  <select
                    {...signupForm.register('year', { required: 'Year is required' })}
                    className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all appearance-none"
                  >
                    <option value="">Select year</option>
                    {years.map((y) => (
                      <option key={`year-${y}`} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Department</label>
                <select
                  {...signupForm.register('department', { required: 'Department is required' })}
                  className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all appearance-none"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={`dept-${d}`} value={d}>{d}</option>
                  ))}
                </select>
                {signupForm.formState.errors.department && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.department.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">College Email</label>
                <input
                  type="email"
                  placeholder="rollno@vce.ac.in"
                  {...signupForm.register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    {...signupForm.register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
                    className="w-full px-4 py-3 pr-11 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground">
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                  </button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-600 text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    {...signupForm.register('confirmPassword', { required: 'Please confirm your password' })}
                    className="w-full px-4 py-3 pr-11 text-sm bg-muted rounded-xl border border-transparent focus:border-amber-300 focus:bg-white focus:outline-none transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground">
                    <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                  </button>
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  {...signupForm.register('agreeTerms', { required: 'You must agree to continue' })}
                  className="mt-0.5 w-4 h-4 rounded border-border text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 font-400 leading-relaxed">
                  I agree to the{' '}
                  <span className="text-amber-600 font-600 cursor-pointer hover:underline">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-amber-600 font-600 cursor-pointer hover:underline">Privacy Policy</span>
                  {' '}of Meridian Engineering College
                </label>
              </div>
              {signupForm.formState.errors.agreeTerms && (
                <p className="text-xs text-red-500">{signupForm.formState.errors.agreeTerms.message}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-700 text-sm rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create My Account'
                )}
              </button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            {mode === 'login' ? (
              <>
                New to Meridian?{' '}
                <button onClick={() => setMode('signup')} className="text-amber-600 font-600 hover:underline">Create an account</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-amber-600 font-600 hover:underline">Sign in</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}