'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

interface MapSpot {
  id: string;
  name: string;
  type: 'building' | 'food' | 'entertainment' | 'facility';
  description: string;
  x: number;
  y: number;
  icon: string;
  color: string;
  bg: string;
}

const spots: MapSpot[] = [
  { id: 'main-block', name: 'Main Block', type: 'building', description: 'Administrative offices, Principal\'s office, and examination cell', x: 50, y: 20, icon: 'BuildingOffice2Icon', color: 'text-blue-700', bg: 'bg-blue-100' },
  { id: 'cse-block', name: 'CSE Block', type: 'building', description: 'Computer Science labs, classrooms, and faculty rooms', x: 20, y: 40, icon: 'ComputerDesktopIcon', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  { id: 'ece-block', name: 'ECE Block', type: 'building', description: 'Electronics labs, communication labs, and seminar halls', x: 75, y: 40, icon: 'CpuChipIcon', color: 'text-purple-700', bg: 'bg-purple-100' },
  { id: 'mech-block', name: 'Mech Block', type: 'building', description: 'Mechanical workshops, CAD labs, and thermal labs', x: 30, y: 65, icon: 'WrenchScrewdriverIcon', color: 'text-gray-700', bg: 'bg-gray-100' },
  { id: 'civil-block', name: 'Civil Block', type: 'building', description: 'Surveying labs, concrete labs, and drawing halls', x: 65, y: 65, icon: 'HomeModernIcon', color: 'text-orange-700', bg: 'bg-orange-100' },
  { id: 'library', name: 'Central Library', type: 'facility', description: 'Over 50,000 books, digital resources, and reading rooms', x: 50, y: 45, icon: 'BookOpenIcon', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  { id: 'canteen', name: 'Main Canteen', type: 'food', description: 'Hot meals, snacks, and beverages. Open 8AM–8PM', x: 35, y: 80, icon: 'BuildingStorefrontIcon', color: 'text-amber-700', bg: 'bg-amber-100' },
  { id: 'mini-canteen', name: 'Mini Canteen', type: 'food', description: 'Quick bites, tea, coffee, and snacks near CSE block', x: 15, y: 55, icon: 'CakeIcon', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  { id: 'juice-corner', name: 'Juice Corner', type: 'food', description: 'Fresh juices, smoothies, and health drinks', x: 80, y: 75, icon: 'BeakerIcon', color: 'text-green-700', bg: 'bg-green-100' },
  { id: 'auditorium', name: 'Auditorium', type: 'entertainment', description: 'Main auditorium with 1200 seating capacity for events', x: 50, y: 75, icon: 'MusicalNoteIcon', color: 'text-rose-700', bg: 'bg-rose-100' },
  { id: 'sports', name: 'Sports Ground', type: 'entertainment', description: 'Cricket, football, basketball, and volleyball courts', x: 15, y: 80, icon: 'TrophyIcon', color: 'text-teal-700', bg: 'bg-teal-100' },
  { id: 'open-theatre', name: 'Open Air Theatre', type: 'entertainment', description: 'Outdoor stage for cultural events and performances', x: 80, y: 55, icon: 'StarIcon', color: 'text-pink-700', bg: 'bg-pink-100' },
  { id: 'hostel', name: 'Hostel Block', type: 'facility', description: 'Boys and girls hostels with mess facility', x: 85, y: 25, icon: 'HomeIcon', color: 'text-cyan-700', bg: 'bg-cyan-100' },
  { id: 'parking', name: 'Parking Area', type: 'facility', description: 'Two-wheeler and four-wheeler parking zones', x: 10, y: 20, icon: 'TruckIcon', color: 'text-slate-700', bg: 'bg-slate-100' },
];

const typeFilters = [
  { key: 'all', label: 'All', icon: 'MapIcon' },
  { key: 'building', label: 'Buildings', icon: 'BuildingOffice2Icon' },
  { key: 'food', label: 'Food', icon: 'BuildingStorefrontIcon' },
  { key: 'entertainment', label: 'Entertainment', icon: 'MusicalNoteIcon' },
  { key: 'facility', label: 'Facilities', icon: 'WrenchScrewdriverIcon' },
];

const typeColor: Record<string, string> = {
  building: 'bg-blue-500',
  food: 'bg-amber-500',
  entertainment: 'bg-rose-500',
  facility: 'bg-emerald-500',
};

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);

  const filtered = activeFilter === 'all' ? spots : spots.filter((s) => s.type === activeFilter);

  return (
    <AppLayout activePath="/map">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <Icon name="MapIcon" size={24} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-700 text-gray-900">Campus Map</h1>
            <p className="text-sm text-muted-foreground">Meridian College of Engineering — Buildings, food spots & entertainment</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {typeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-600 transition-colors ${activeFilter === f.key ? 'bg-amber-500 text-white' : 'bg-white border border-border text-gray-600 hover:bg-amber-50'}`}
            >
              <Icon name={f.icon as Parameters<typeof Icon>[0]['name']} size={14} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Visual */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h2 className="font-700 text-gray-900 text-sm">Interactive Campus Map</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {Object.entries(typeColor).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" style={{ height: 480 }}>
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6b7280" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Roads */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#d1d5db" strokeWidth="12" strokeDasharray="0" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d1d5db" strokeWidth="12" />
                <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#e5e7eb" strokeWidth="6" />
                <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#e5e7eb" strokeWidth="6" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#e5e7eb" strokeWidth="6" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#e5e7eb" strokeWidth="6" />
                {/* Road labels */}
                <text x="52%" y="15%" fill="#9ca3af" fontSize="9" fontFamily="sans-serif">Main Road</text>
              </svg>

              {/* Spots */}
              {filtered.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(selectedSpot?.id === spot.id ? null : spot)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                  className="absolute group flex flex-col items-center"
                  title={spot.name}
                >
                  <div className={`w-9 h-9 rounded-full ${typeColor[spot.type]} flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-110 ${selectedSpot?.id === spot.id ? 'scale-125 ring-2 ring-amber-400' : ''}`}>
                    <Icon name={spot.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-white" />
                  </div>
                  <span className="mt-1 text-[9px] font-700 text-gray-700 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap max-w-[80px] truncate">
                    {spot.name}
                  </span>
                </button>
              ))}

              {/* College boundary label */}
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-700 text-gray-700 shadow-sm">
                🏛️ Meridian College of Engineering, Hyderabad
              </div>
            </div>
          </div>

          {/* Spot List / Detail */}
          <div className="bg-white rounded-2xl border border-border shadow-card flex flex-col" style={{ maxHeight: 540 }}>
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-700 text-gray-900">{selectedSpot ? 'Spot Details' : 'All Locations'}</h2>
              {selectedSpot && (
                <button onClick={() => setSelectedSpot(null)} className="text-xs text-amber-600 font-600 hover:underline mt-0.5">← Back to list</button>
              )}
            </div>

            {selectedSpot ? (
              <div className="p-5 flex-1">
                <div className={`w-14 h-14 ${selectedSpot.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon name={selectedSpot.icon as Parameters<typeof Icon>[0]['name']} size={28} className={selectedSpot.color} />
                </div>
                <h3 className="text-lg font-700 text-gray-900 mb-1">{selectedSpot.name}</h3>
                <span className={`text-[10px] font-600 px-2.5 py-1 rounded-full capitalize ${selectedSpot.bg} ${selectedSpot.color}`}>{selectedSpot.type}</span>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{selectedSpot.description}</p>
                <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-amber-700">
                    <Icon name="MapPinIcon" size={14} className="text-amber-500" />
                    <span>Location: {selectedSpot.x}% East, {selectedSpot.y}% South of main gate</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {filtered.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="w-full px-5 py-3 flex items-center gap-3 hover:bg-amber-50/40 transition-colors text-left"
                  >
                    <div className={`w-9 h-9 ${spot.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon name={spot.icon as Parameters<typeof Icon>[0]['name']} size={16} className={spot.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-600 text-gray-900 truncate">{spot.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{spot.type}</p>
                    </div>
                    <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
