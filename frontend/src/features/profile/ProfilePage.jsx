import React, { useState, useEffect } from 'react';
import EditProfileModal from './components/EditProfileModal';
import { useAuth } from '../auth/AuthContext';
import * as mentorsApi from '../../shared/api/mentorsApi';
import { fetchKnowledgeEntries } from '../library/api/knowledgeApi';

export default function ProfilePage({ userProfile, onLogout }) {
  const { patchLocalProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('contributions'); // 'contributions', 'mentorship', 'verification'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [myContributions, setMyContributions] = useState([]);
  const [contribsLoading, setContribsLoading] = useState(true);

  const [mentorProfile, setMentorProfile] = useState(null);
  const [mentorLoading, setMentorLoading] = useState(true);
  const [mentorSaving, setMentorSaving] = useState(false);
  const [mentorMsg, setMentorMsg] = useState('');

  const [mentorBio, setMentorBio] = useState('');
  const [yearsExp, setYearsExp] = useState(5);
  const [availability, setAvailability] = useState('Weekends, 2 hrs/week');
  const [categoriesInput, setCategoriesInput] = useState('Agriculture, Traditional Skills');

  const profileData = {
    name: userProfile?.name || 'Community Member',
    title: userProfile?.role === 'contributor' ? 'Senior Heritage Contributor' : 'Youth Learner & Explorer',
    location: userProfile?.location || 'India',
    bio: userProfile?.bio || 'Passionate about connecting with elders, learning traditional techniques, and building intergenerational bridges.',
    avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80',
    joinedDate: 'Joined July 2026',
    email: userProfile?.email || 'user@example.com',
    role: userProfile?.role || 'user',
  };

  useEffect(() => {
    let isMounted = true;
    setContribsLoading(true);
    fetchKnowledgeEntries()
      .then((items) => {
        if (isMounted) {
          setMyContributions(items.slice(0, 3));
        }
      })
      .catch(() => {
        if (isMounted) setMyContributions([]);
      })
      .finally(() => {
        if (isMounted) setContribsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setMentorLoading(true);
    mentorsApi
      .getMyMentorProfile()
      .then((data) => {
        if (isMounted && data) {
          setMentorProfile(data);
          setMentorBio(data.bio || '');
          setYearsExp(data.years_of_experience || 5);
          setAvailability(data.availability || 'Weekends, 2 hrs/week');
          setCategoriesInput((data.expertise_categories || []).join(', '));
        }
      })
      .catch(() => {
        // Not a mentor yet
      })
      .finally(() => {
        if (isMounted) setMentorLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleSaveProfile = (updatedFields) => {
    patchLocalProfile(updatedFields);
  };

  const handleSaveMentorProfile = async (e) => {
    e.preventDefault();
    setMentorSaving(true);
    setMentorMsg('');
    const cats = categoriesInput.split(',').map((c) => c.trim()).filter(Boolean);
    const payload = {
      bio: mentorBio.trim(),
      years_of_experience: Number(yearsExp),
      availability,
      expertise_categories: cats,
    };
    try {
      const result = await mentorsApi.upsertMentorProfile(payload);
      setMentorProfile(result);
      setMentorMsg('Mentor profile saved successfully!');
    } catch (err) {
      setMentorMsg(err.message || 'Could not save mentor profile.');
    } finally {
      setMentorSaving(false);
      setTimeout(() => setMentorMsg(''), 4000);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-8">
        
        {/* Header Profile Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xs text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-amber-100/30 rounded-full blur-2xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black text-slate-900">{profileData.name}</h1>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/50 px-2.5 py-0.5 rounded-md uppercase">
                    {profileData.role}
                  </span>
                </div>
                <p className="text-xs font-semibold text-brand-primary">{profileData.title}</p>
                <p className="text-[11px] text-slate-400 font-medium">📍 {profileData.location} • 📅 {profileData.joinedDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-600 leading-relaxed font-normal">{profileData.bio}</p>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-200/60 space-x-6 text-left">
          <button
            onClick={() => setActiveTab('contributions')}
            className={`pb-3 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'contributions'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            My Contributions ({myContributions.length})
          </button>
          <button
            onClick={() => setActiveTab('mentorship')}
            className={`pb-3 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mentorship'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Mentor Profile &amp; Availability
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'contributions' && (
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-bold text-slate-900">Submitted Knowledge Entries</h3>
            {contribsLoading ? (
              <div className="py-10 text-center text-xs font-bold text-slate-400">Loading your entries...</div>
            ) : myContributions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {myContributions.map((c) => (
                  <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs space-y-2">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">
                      {c.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{c.description}</p>
                    <span className="text-[9px] font-semibold text-emerald-600 block pt-2">✓ Verified on Setu</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center text-xs text-slate-400 italic">
                You haven't shared any traditional knowledge entries yet.
              </div>
            )}
          </div>
        )}

        {activeTab === 'mentorship' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 text-left space-y-6 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Become a Setu Mentor</h3>
              <p className="text-xs text-slate-400 font-normal">
                List your expertise so youth learners can discover you in the Community mentor directory.
              </p>
            </div>

            {mentorMsg && (
              <div className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2.5 rounded-2xl">
                {mentorMsg}
              </div>
            )}

            <form onSubmit={handleSaveMentorProfile} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expertise Categories (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={categoriesInput}
                  onChange={(e) => setCategoriesInput(e.target.value)}
                  className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-brand-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years of Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    required
                    value={yearsExp}
                    onChange={(e) => setYearsExp(e.target.value)}
                    className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-brand-primary font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Availability</label>
                  <input
                    type="text"
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-brand-primary font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mentor Bio &amp; Offerings</label>
                <textarea
                  rows={4}
                  required
                  value={mentorBio}
                  onChange={(e) => setMentorBio(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-brand-primary font-normal resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={mentorSaving}
                className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-brand-primary/10 cursor-pointer disabled:opacity-60"
              >
                {mentorSaving ? 'Saving...' : 'Save Mentor Profile'}
              </button>
            </form>
          </div>
        )}

      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
