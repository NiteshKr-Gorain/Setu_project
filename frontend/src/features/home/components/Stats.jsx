import React from 'react';

export default function Stats() {
  const statsList = [
    { value: '1,200+', label: 'Stories Preserved', icon: '📚' },
    { value: '850+', label: 'Active Mentors', icon: '👴' },
    { value: '98%', label: 'Trust Rating', icon: '⭐' },
    { value: '45+', label: 'Regions Covered', icon: '📍' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-3xl md:text-4xl font-black">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
