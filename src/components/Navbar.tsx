import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Layers,
  Info,
  Mail,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Settings,
  Edit3,
  Check,
  AlertCircle,
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onUpdateUser?: (updatedUser: User) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  onUpdateUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Profile Edit state
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
    }
  }, [user, showProfileModal]);

  const navItems = [
    { id: 'home', label: 'Home', icon: FileText },
    { id: 'analyzer', label: 'Analyzer', icon: Sparkles },
    { id: 'compare', label: 'Compare', icon: Layers },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileError(null);

    const emailToSave = editEmail.trim() || user.email;
    if (!emailToSave.toLowerCase().endsWith('@gmail.com')) {
      setProfileError('Email address must end with @gmail.com!');
      return;
    }

    const updated: User = {
      ...user,
      name: editName.trim() || user.name,
      email: emailToSave,
    };
    if (onUpdateUser) {
      await onUpdateUser(updated);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowProfileModal(false);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Smart AI
              </span>
              <span className="text-lg font-extrabold text-white ml-1">
                Resume Analyzer
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-950/80 text-blue-400 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Analyze Button */}
            <button
              onClick={() => setActiveTab('analyzer')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Resume
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative pl-2 border-l border-slate-800">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                    <div className="px-3.5 py-3 border-b border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditName(user.name);
                        setEditEmail(user.email);
                        setShowProfileModal(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-blue-400" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700"
              >
                <UserIcon className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">My Profile</h3>
                <p className="text-xs text-slate-400">View and update your personal account details</p>
              </div>
            </div>

            {/* Profile Info Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">User Account ID</span>
                <span className="font-mono text-blue-400 font-semibold">{user.id || 'usr-registered'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Account Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                  Active Account
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {profileError && (
                <div className="p-3 rounded-xl bg-red-950 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              {savedSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile updated successfully!</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-md shadow-blue-600/20"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>

            <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">Account Security</span>
              <button
                type="button"
                onClick={() => {
                  setShowProfileModal(false);
                  onLogout();
                }}
                className="text-xs text-red-400 font-semibold hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-950 text-blue-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('analyzer');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Resume Now
            </button>

            {user ? (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {user.name}
                  </span>
                  <button
                    onClick={() => {
                      setEditName(user.name);
                      setEditEmail(user.email);
                      setShowProfileModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-blue-400 font-semibold hover:underline"
                  >
                    My Profile
                  </button>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-xs text-red-400 font-semibold py-1 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-semibold text-slate-200 border border-slate-700 rounded-lg"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

