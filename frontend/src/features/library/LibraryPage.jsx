import React, { useState, useEffect } from 'react';
import LibraryCard from './components/LibraryCard';
import { fetchKnowledgeEntries } from './api/knowledgeApi';
import { listLearningPaths } from './api/learningPathsApi';

const fallbackMockEntries = [
  {
    id: 'mock-1',
    title: 'Natural Pest Control with Neem & Cow Urine Extract',
    category: 'Agriculture',
    contributor: 'Harbhajan Singh',
    description: 'An ancient organic biopesticide preparation that repels over 200 species of leaf-chewing insects without toxic chemical residues.',
    summary: 'A time-tested herbal biopesticide concocted by fermenting crushed neem leaves (Azadirachta indica), wild garlic cloves, and aged cow urine for 14 days.',
    traditionalMethod: 'Crush 5kg fresh neem leaves into a paste. Steep in 10 liters of fermented cow urine in a shaded clay urn for 14-21 days.',
    scientificExplanation: 'Azadirachtin disrupts the ecdysone steroid hormone cycle in insect larvae, halting metamorphosis.',
    benefits: 'Zero chemical runoff toxicity, cost-effective for smallholder farmers, and enhances plant leaf immunity naturally.',
    precautions: 'Dilute at a 1:20 ratio with fresh water prior to spraying to prevent foliar leaf scorch.',
    contentType: 'Article',
    readTime: '4 min read'
  },
  {
    id: 'mock-2',
    title: 'Centering River Clay on Stone Potter Wheel',
    category: 'Traditional Skills',
    contributor: 'Sita Devi',
    description: 'Tactile techniques of wedging, centering, and throwing micro-porous earthen matkas that naturally chill drinking water.',
    summary: 'Master craftswoman Sita Devi demonstrates hand position, rotational momentum physics, and clay moisture balance required to throw unglazed water pots.',
    traditionalMethod: 'Harvest fine riverbed alluvial silt. Wedge repeatedly on granite slabs to exhaust all trapped air pockets.',
    scientificExplanation: 'Microscopic interconnected pores in fired terracotta enable continuous capillary action and surface evaporative cooling.',
    benefits: 'Maintains drinking water temperature 8-10°C below ambient without electricity while adding trace essential minerals.',
    precautions: 'Sun-dry slowly in shaded ambient air before firing to avoid structural thermal fractures in kilns.',
    contentType: 'Video',
    readTime: '8 min video'
  },
  {
    id: 'mock-3',
    title: 'Sprouted Finger Millet (Ragi) Herbal Porridge',
    category: 'Recipes',
    contributor: 'Savitri Devi',
    description: 'Nutrient-rich traditional breakfast porridge providing sustained energy, high bioavailable calcium, and digestive probiotics.',
    summary: 'Grandmother Savitri Devi details the 36-hour germination and slow-roasting process that unlocks finger millet nutrients for growing children and seniors.',
    traditionalMethod: 'Soak whole Ragi grains for 12 hours. Wrap tightly in moist muslin cloth for 24 hours until sprouts appear.',
    scientificExplanation: 'Sprouting activates endogenous alpha-amylase and phytase enzymes, breaking down phytic acid bound minerals.',
    benefits: 'High dietary calcium density (344mg/100g), extremely low glycemic index, and rich in natural prebiotic fibers.',
    precautions: 'Cook on gentle low flame while continuously stirring to prevent starch clump formations.',
    contentType: 'Audio',
    readTime: '5 min audio'
  }
];

export default function LibraryPage({ onContribute }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContentType, setSelectedContentType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCard, setSelectedCard] = useState(null);
  const [aiSummaryCard, setAiSummaryCard] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [learningPaths, setLearningPaths] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const apiData = await fetchKnowledgeEntries({
          category: selectedCategory,
          contentType: selectedContentType,
          q: searchQuery,
        });

        if (isMounted) {
          if (apiData && apiData.length > 0) {
            setEntries(apiData);
          } else if (!searchQuery && selectedCategory === 'All' && selectedContentType === 'All') {
            setEntries(fallbackMockEntries);
          } else {
            setEntries([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Backend API unavailable, using fallback mock library data:', err.message);
          setEntries(fallbackMockEntries);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [selectedCategory, selectedContentType, searchQuery]);

  useEffect(() => {
    let isMounted = true;
    listLearningPaths()
      .then((data) => {
        if (isMounted) setLearningPaths(Array.isArray(data) ? data : data?.items || []);
      })
      .catch(() => {
        // Learning paths optional fallback
      });
    return () => { isMounted = false; };
  }, []);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Agriculture', 'Health', 'Traditional Skills', 'Recipes', 'Technology'];
  const contentTypes = ['All', 'Article', 'Audio', 'Video', 'PDF'];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        
        {/* Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-8 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200/50 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wide">
              Heritage Knowledge Repository
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight pt-1">
              Ancestral Wisdom Library
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Explore verified traditional practices, oral recipes, ecological wisdom, and ancestral craftsmanship cataloged with intelligent scientific explanations.
            </p>
          </div>

          {onContribute && (
            <button
              onClick={onContribute}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-full shadow-md shadow-brand-primary/20 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>✍️</span>
              <span>Share Knowledge</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 text-left shadow-xs space-y-5">
          <div className="flex items-center bg-slate-50 border border-slate-200/50 rounded-2xl p-1.5 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100/50 transition-all duration-300">
            <span className="pl-3 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search knowledge by keywords, remedies, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none px-3 py-2 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

          <div className="h-px bg-slate-100"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-3xs'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Content Type Filter */}
            <div className="flex items-center space-x-2 self-start md:self-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Format:</span>
              <select
                value={selectedContentType}
                onChange={(e) => setSelectedContentType(e.target.value)}
                className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                {contentTypes.map((ct) => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Learning Paths Section (if present) */}
        {learningPaths.length > 0 && (
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 md:p-8 text-white text-left space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Guided Curriculums
              </span>
              <span className="text-xs text-blue-200 font-semibold">{learningPaths.length} Active Paths</span>
            </div>
            <h3 className="text-lg font-extrabold">Structured Traditional Learning Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {learningPaths.map((path) => (
                <div key={path.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
                  <h4 className="font-bold text-sm text-white">{path.title}</h4>
                  <p className="text-xs text-blue-100 leading-relaxed font-normal">{path.description}</p>
                  <div className="flex items-center justify-between pt-2 text-[10px] font-bold text-blue-200">
                    <span>{path.steps_count || 3} Learning Steps</span>
                    <span className="text-amber-300">★ {path.level || 'Beginner'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cards Grid Section */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Library Archives...</p>
          </div>
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((item) => (
              <LibraryCard
                key={item.id}
                item={item}
                onReadMore={(entry) => setSelectedCard(entry)}
                onAiSummary={(entry) => setAiSummaryCard(entry)}
                onBookmark={handleToggleBookmark}
                isBookmarked={bookmarkedIds.includes(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center text-slate-400 text-xs italic shadow-3xs space-y-2">
            <p className="text-2xl font-normal">🔍</p>
            <p className="font-semibold text-slate-600">No knowledge entries found matching your search criteria.</p>
            <p>Try clearing filters or search query.</p>
          </div>
        )}

      </div>

      {/* Read More Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 p-8 text-left space-y-6 overflow-y-auto max-h-[85vh] animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedCard.category}
              </span>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-slate-900 leading-snug">{selectedCard.title}</h2>
              <p className="text-xs text-slate-400 font-semibold">Contributed by {selectedCard.contributor}</p>
              <div className="h-px bg-slate-100"></div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{selectedCard.description}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">🌿 Traditional Technique</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{selectedCard.traditionalMethod}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  const target = selectedCard;
                  setSelectedCard(null);
                  setAiSummaryCard(target);
                }}
                className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                ✨ View AI Summary
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary Modal */}
      {aiSummaryCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-left animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <h3 className="font-extrabold text-base">Setu AI Verification &amp; Summary</h3>
              </div>
              <button
                onClick={() => setAiSummaryCard(null)}
                className="text-white hover:text-blue-100 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {aiSummaryCard.category}
                </span>
                <h4 className="text-md font-bold text-slate-900 mt-2">{aiSummaryCard.title}</h4>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 space-y-1">
                  <h5 className="font-bold text-blue-800 uppercase tracking-wider text-[10px]">🔬 Scientific Explanation</h5>
                  <p className="text-slate-650 leading-relaxed font-normal">{aiSummaryCard.scientificExplanation}</p>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-1">
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">✓ Key Benefits</h5>
                  <p className="text-slate-650 leading-relaxed font-normal">{aiSummaryCard.benefits}</p>
                </div>

                {aiSummaryCard.precautions && (
                  <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 space-y-1">
                    <h5 className="font-bold text-rose-800 uppercase tracking-wider text-[10px]">⚠️ Safety Precautions</h5>
                    <p className="text-slate-650 leading-relaxed font-normal">{aiSummaryCard.precautions}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setAiSummaryCard(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
