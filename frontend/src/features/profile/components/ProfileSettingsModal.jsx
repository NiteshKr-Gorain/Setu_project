// Component imports
import React, { useState, useEffect } from 'react';
import {
  exportHistoryAsJSON,
  clearLocalStorageCache,
  getSavedTextSizePreference,
  applyTextSizePreference,
  FONT_SIZE_PRESETS
} from '../../../shared/services/localStorageService';

// Avatar presets
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80'
];

// Settings modal
export default function ProfileSettingsModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveSettings,
  initialTab = 'edit_profile'
}) {
  // Tab state
  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile state
  const [name, setName] = useState(currentProfile?.name || '');
  const [title, setTitle] = useState(currentProfile?.title || '');
  const [location, setLocation] = useState(currentProfile?.location || '');
  const [bio, setBio] = useState(currentProfile?.bio || '');
  const [avatar, setAvatar] = useState(currentProfile?.avatar || AVATAR_PRESETS[0]);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');
  
  // Text size
  const [textSizeState, setTextSizeState] = useState(() => getSavedTextSizePreference());
  const [textSizeSavedMsg, setTextSizeSavedMsg] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  // Notifications state
  const [emailDigest, setEmailDigest] = useState(true);
  const [mentorAlerts, setMentorAlerts] = useState(true);
  const [communityReplies, setCommunityReplies] = useState(true);

  // Privacy state
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmailOnProfile, setShowEmailOnProfile] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState('everyone');

  // Preferences state
  const [language, setLanguage] = useState('en');
  const [statusMsg, setStatusMsg] = useState('');

  // Sync state
  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      if (currentProfile) {
        setName(currentProfile.name || '');
        setTitle(currentProfile.title || '');
        setLocation(currentProfile.location || '');
        setBio(currentProfile.bio || '');
        setAvatar(currentProfile.avatar || AVATAR_PRESETS[0]);
      }
      setTextSizeState(getSavedTextSizePreference());
    }
  }, [isOpen, initialTab, currentProfile]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Modal check
  if (!isOpen) return null;

  // Save profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setProfileSavedMsg('Name cannot be empty.');
      return;
    }

    const updatedData = {
      name: name.trim(),
      title: title.trim(),
      location: location.trim(),
      bio: bio.trim(),
      avatar: avatar.trim() || currentProfile?.avatar || AVATAR_PRESETS[0]
    };

    if (onSaveSettings) {
      onSaveSettings(updatedData);
    }

    setProfileSavedMsg('Profile details updated successfully!');
    setTimeout(() => {
      setProfileSavedMsg('');
    }, 3500);
  };

  // Select preset
  const handleSelectPreset = (presetId) => {
    const updated = applyTextSizePreference(presetId);
    setTextSizeState(updated);
    setTextSizeSavedMsg(`Applied ${updated.scale}% (${updated.px}px) font scale globally!`);
    setTimeout(() => setTextSizeSavedMsg(''), 3000);
  };

  // Slider change
  const handleSliderChange = (e) => {
    const scaleVal = parseFloat(e.target.value);
    const updated = applyTextSizePreference(scaleVal);
    setTextSizeState(updated);
  };

  // Step size
  const handleStepSize = (delta) => {
    const currentScale = textSizeState.scale || 100;
    const newScale = Math.min(135, Math.max(80, currentScale + delta));
    const updated = applyTextSizePreference(newScale);
    setTextSizeState(updated);
    setTextSizeSavedMsg(`Adjusted scale to ${updated.scale}% (${updated.px}px)`);
    setTimeout(() => setTextSizeSavedMsg(''), 2500);
  };

  // Reset scale
  const handleResetTextSize = () => {
    const updated = applyTextSizePreference('default');
    setTextSizeState(updated);
    setTextSizeSavedMsg('Reset text size to standard 100% (16px)');
    setTimeout(() => setTextSizeSavedMsg(''), 3000);
  };

  // Submit password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (newPassword.length < 6) {
      setPassMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (onSaveSettings) {
      onSaveSettings({ passwordUpdated: true });
    }

    setPassMsg({ type: 'success', text: 'Password updated successfully!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setPassMsg({ type: '', text: '' });
    }, 4000);
  };

  // Save general
  const handleSaveGeneralSettings = (e) => {
    e.preventDefault();
    if (onSaveSettings) {
      onSaveSettings({
        emailDigest,
        mentorAlerts,
        communityReplies,
        profileVisibility,
        showEmailOnProfile,
        allowDirectMessages,
        language
      });
    }
    setStatusMsg('Settings saved successfully!');
    setTimeout(() => {
      setStatusMsg('');
      onClose();
    }, 1200);
  };

  // Clear cache
  const handleClearCache = () => {
    clearLocalStorageCache();
    setStatusMsg('Local AI search cache cleared!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // Export data
  const handleExportData = () => {
    exportHistoryAsJSON();
    setStatusMsg('Account data exported successfully.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // Render modal
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal box */}
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[90vh] min-h-[640px] max-h-[860px] text-left transition-all duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header bar */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-slate-900 text-white flex items-center justify-between shadow-md shrink-0 select-none">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner">
              ⚙️
            </div>
            <div>
              <h3 className="text-lg font-black text-white leading-tight">Account &amp; Profile Settings</h3>
              <p className="text-xs text-amber-100/90 font-medium">Edit profile, display text size, security, privacy &amp; preferences</p>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-white/20"
            title="Close Settings"
            aria-label="Close Settings"
          >
            ✕
          </button>
        </div>

        {/* Feedback alert */}
        {statusMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2.5 text-xs font-bold flex items-center space-x-2 shrink-0">
            <span>✨</span>
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Main layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 relative">
          
          {/* Sidebar tabs */}
          <div className="w-full md:w-64 bg-slate-50/90 border-r border-slate-100 p-3 sm:p-4 flex md:flex-col space-x-1.5 md:space-x-0 md:space-y-1.5 overflow-x-auto md:overflow-y-auto shrink-0 overscroll-contain custom-scrollbar">
            
            {/* Profile tab */}
            <button
              onClick={() => setActiveTab('edit_profile')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'edit_profile'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-base">👤</span>
                <span>Edit Profile</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-200/60 hidden sm:inline-block">
                Details
              </span>
            </button>

            {/* Text size tab */}
            <button
              onClick={() => setActiveTab('text_size')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'text_size'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-base">🔤</span>
                <span>Text Size &amp; Display</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-200/60 hidden sm:inline-block">
                {textSizeState.scale}%
              </span>
            </button>

            {/* Security tab */}
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🔒</span>
              <span>Security &amp; Password</span>
            </button>

            {/* Notifications tab */}
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🔔</span>
              <span>Notifications</span>
            </button>

            {/* Privacy tab */}
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🛡️</span>
              <span>Privacy &amp; Direct Msgs</span>
            </button>

            {/* Language tab */}
            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                activeTab === 'preferences'
                  ? 'bg-white text-orange-600 shadow-sm border border-slate-200/80 ring-1 ring-orange-500/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🌐</span>
              <span>Language &amp; Data</span>
            </button>
          </div>

          {/* Form body */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto overscroll-contain space-y-6 min-h-0 custom-scrollbar scroll-smooth">
            
            {/* Edit profile form */}
            {activeTab === 'edit_profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Form header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span>👤</span>
                      <span>Edit Profile Information</span>
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Update your public name, headline, location, avatar, and personal bio.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-lg uppercase">
                    {currentProfile?.role || 'Member'}
                  </span>
                </div>

                {/* Profile alert */}
                {profileSavedMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-2 animate-in fade-in">
                    <span>✨</span>
                    <span>{profileSavedMsg}</span>
                  </div>
                )}

                {/* Profile preview */}
                <div className="p-4 bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-slate-50 border border-amber-200/70 rounded-xl space-y-2">
                  <div className="flex items-center justify-between border-b border-amber-200/40 pb-1.5">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span>👁️</span>
                      <span>Live Profile Card Preview</span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">Updates live as you type</span>
                  </div>

                  <div className="flex items-start space-x-3.5 pt-1">
                    <img
                      src={avatar || AVATAR_PRESETS[0]}
                      alt="Avatar Preview"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold text-slate-900 truncate">{name || 'Your Name'}</span>
                        <span className="text-[9px] font-bold bg-blue-100/80 text-blue-800 px-1.5 py-0.2 rounded-sm uppercase">
                          {currentProfile?.role || 'user'}
                        </span>
                      </div>
                      <p className="text-xs text-orange-600 font-semibold truncate">{title || 'Your Headline or Title'}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">📍 {location || 'Location'} • 📅 Joined July 2026</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 pt-1 font-normal leading-snug">
                        {bio || 'Tell the community about your background, interests, and traditional wisdom knowledge...'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Avatar selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Profile Avatar
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {AVATAR_PRESETS.map((presetImg, idx) => {
                      const isSelected = avatar === presetImg;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(presetImg)}
                          className={`w-10 h-10 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                            isSelected ? 'border-orange-600 scale-110 shadow-sm' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={presetImg}
                            alt={`Preset ${idx + 1}`}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input fields */}
                <div className="space-y-4 text-xs font-semibold">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Title field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Professional Headline / Role Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="E.g. Traditional Organic Farmer &amp; Heritage Contributor"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Location field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="E.g. Punjab, India"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                    />
                    {/* Location chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Punjab, India', 'Kerala, India', 'Rajasthan, India', 'Karnataka, India', 'Maharashtra, India'].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className="text-[10px] font-medium bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        >
                          + {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bio field */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Bio &amp; Personal Background
                      </label>
                      <span className="text-[10px] text-slate-400 font-normal">{bio.length} characters</span>
                    </div>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Share your interests, traditional practices, cultural crafts, or learning aspirations with the Setu community..."
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 font-normal focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Save button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Changes will be updated across your profile immediately.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            )}

            {/* Text size panel */}
            {activeTab === 'text_size' && (
              <div className="space-y-6">
                {/* Panel header */}
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span>🔤</span>
                      <span>Text Size &amp; Reading Scale</span>
                    </h4>
                    <span className="text-xs font-bold px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg">
                      Scale: {textSizeState.scale}% ({textSizeState.px}px)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Increase or adjust font sizing according to your reading comfort across the entire Setu website.
                  </p>
                </div>

                {/* Scale message */}
                {textSizeSavedMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-2">
                    <span>✨</span>
                    <span>{textSizeSavedMsg}</span>
                  </div>
                )}

                {/* Presets grid */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Quick Size Presets
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FONT_SIZE_PRESETS.map((preset) => {
                      const isActive = textSizeState.preset === preset.id || Math.abs(textSizeState.scale - preset.scale) < 2;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                            isActive
                              ? 'bg-orange-50/60 border-orange-500 ring-2 ring-orange-500/20 shadow-xs'
                              : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{preset.icon}</span>
                              <span className="text-xs font-bold text-slate-900">{preset.label}</span>
                            </div>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                              isActive ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                            {preset.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slider control */}
                <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Custom Font Scaling Slider</h5>
                      <p className="text-[11px] text-slate-500">Fine-tune font size from 80% to 135%</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetTextSize}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                    >
                      ↺ Reset to Default (100%)
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Stepper decrease */}
                    <button
                      type="button"
                      onClick={() => handleStepSize(-5)}
                      className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-3xs hover:scale-105 active:scale-95 shrink-0"
                      title="Decrease text size (A-)"
                      aria-label="Decrease text size"
                    >
                      A-
                    </button>

                    {/* Range slider */}
                    <div className="flex-1 space-y-1">
                      <input
                        type="range"
                        min="80"
                        max="135"
                        step="2.5"
                        value={textSizeState.scale}
                        onChange={handleSliderChange}
                        className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                        <span>Compact (80%)</span>
                        <span className="text-orange-600 font-extrabold">{textSizeState.scale}% ({textSizeState.px}px)</span>
                        <span>Extra Large (135%)</span>
                      </div>
                    </div>

                    {/* Stepper increase */}
                    <button
                      type="button"
                      onClick={() => handleStepSize(5)}
                      className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-3xs hover:scale-105 active:scale-95 shrink-0"
                      title="Increase text size (A+)"
                      aria-label="Increase text size"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Text preview */}
                <div className="p-4 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-slate-50 border border-amber-200/80 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-amber-200/50 pb-2">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span>👁️</span>
                      <span>Live Reading Preview</span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      ✓ Instant Global Effect
                    </span>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h5 className="text-sm font-black text-slate-900 leading-snug">
                      Connecting Generations &amp; Traditional Wisdom
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Setu enables youth and elders to bridge time-honored Indian practices with modern AI discovery.
                      Adjusting this text size helps elders, researchers, and learners read with maximum ease.
                    </p>
                  </div>
                </div>

                {/* Done button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Preference is automatically saved to your browser session.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Password panel */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Change Account Password</h4>
                  <p className="text-xs text-slate-400 font-medium">Update your password regularly to keep your profile secure.</p>
                </div>

                {/* Password alert */}
                {passMsg.text && (
                  <div className={`p-3 rounded-lg text-xs font-bold border ${
                    passMsg.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {passMsg.text}
                  </div>
                )}

                {/* Password inputs */}
                <div className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Password</label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full border-b border-slate-200 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full border-b border-slate-200 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full border-b border-slate-200 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Show password */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="show-pass-checkbox"
                      checked={showPass}
                      onChange={(e) => setShowPass(e.target.checked)}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                    <label htmlFor="show-pass-checkbox" className="text-xs text-slate-600 font-medium cursor-pointer">
                      Show Password characters
                    </label>
                  </div>
                </div>

                {/* Password submit */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* Notifications panel */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Email &amp; Notification Preferences</h4>
                  <p className="text-xs text-slate-400 font-medium">Choose when Setu sends you updates and alerts.</p>
                </div>

                {/* Notification list */}
                <div className="space-y-4">
                  {/* Digest option */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Monthly Heritage Digest</p>
                      <p className="text-[10px] text-slate-500">Receive monthly top storyteller summaries &amp; heritage articles.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailDigest}
                      onChange={(e) => setEmailDigest(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 accent-orange-600 cursor-pointer"
                    />
                  </div>

                  {/* Alerts option */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Mentorship Request Alerts</p>
                      <p className="text-[10px] text-slate-500">Get notified immediately when a youth learner requests guidance.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={mentorAlerts}
                      onChange={(e) => setMentorAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 accent-orange-600 cursor-pointer"
                    />
                  </div>

                  {/* Replies option */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Community Discussion Replies</p>
                      <p className="text-[10px] text-slate-500">Alerts when someone comments on or appreciates your posts.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={communityReplies}
                      onChange={(e) => setCommunityReplies(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 accent-orange-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Notification submit */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Save Notification Preferences
                  </button>
                </div>
              </form>
            )}

            {/* Privacy panel */}
            {activeTab === 'privacy' && (
              <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Privacy &amp; Visibility Controls</h4>
                  <p className="text-xs text-slate-400 font-medium">Control who can discover your profile and message you.</p>
                </div>

                {/* Privacy controls */}
                <div className="space-y-4 text-xs font-semibold">
                  {/* Visibility dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Directory Visibility</label>
                    <select
                      value={profileVisibility}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-orange-500"
                    >
                      <option value="public">Public (Discoverable in Community Directory)</option>
                      <option value="connections">Connections Only (Only approved connections)</option>
                      <option value="private">Private (Hidden from directory listings)</option>
                    </select>
                  </div>

                  {/* DM permissions */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Message Permissions</label>
                    <select
                      value={allowDirectMessages}
                      onChange={(e) => setAllowDirectMessages(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-orange-500"
                    >
                      <option value="everyone">Everyone on Setu</option>
                      <option value="connections">Approved Connections Only</option>
                      <option value="none">Nobody (Disable Direct Messaging)</option>
                    </select>
                  </div>

                  {/* Email toggle */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 pt-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Display Email Address on Public Profile</p>
                      <p className="text-[10px] text-slate-500">Allow users to see {currentProfile?.email || 'your email'}.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={showEmailOnProfile}
                      onChange={(e) => setShowEmailOnProfile(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 accent-orange-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Privacy submit */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Save Privacy Settings
                  </button>
                </div>
              </form>
            )}

            {/* Language panel */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Language &amp; Account Data</h4>
                  <p className="text-xs text-slate-400 font-medium">Manage system language, text size shortcuts, and local browser data.</p>
                </div>

                {/* Language inputs */}
                <div className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred System Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-orange-500"
                    >
                      <option value="en">English (US / Global)</option>
                      <option value="hi">Hindi (हिंदी)</option>
                      <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                      <option value="ta">Tamil (தமிழ்)</option>
                      <option value="bn">Bengali (বাংলা)</option>
                    </select>
                  </div>

                  {/* Size shortcut */}
                  <div className="p-4 bg-orange-50/50 border border-orange-200/80 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">🔤</span>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">Text Size &amp; Accessibility</h5>
                          <p className="text-[10px] text-slate-500">Currently scaled to {textSizeState.scale}%</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('text_size')}
                        className="px-3 py-1.5 bg-white border border-orange-200 hover:bg-orange-50 text-orange-700 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                      >
                        Adjust Text Size →
                      </button>
                    </div>
                  </div>

                  {/* Data actions */}
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
                    <h5 className="text-xs font-bold text-slate-900">Account Data &amp; Local Storage Cache</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      Export your account saved history or reset local browser AI search cache.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleExportData}
                        className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                      >
                        📥 Export Account Data (JSON)
                      </button>

                      <button
                        type="button"
                        onClick={handleClearCache}
                        className="px-3.5 py-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                      >
                        🗑️ Clear AI Local Search Cache
                      </button>
                    </div>
                  </div>
                </div>

                {/* Done button */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
