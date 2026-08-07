import React from 'react';

export default function FreshersGuidePage() {
  const guideSections = [
    {
      title: "IT & Connectivity",
      icon: "💻",
      description: "Set up your student email, connect to the campus Wi-Fi (Eduroam), and access the learning management system (LMS).",
      action: "Setup Guide",
      color: "border-blue-200 hover:border-blue-500"
    },
    {
      title: "Campus Map & Navigation",
      icon: "🗺️",
      description: "Find your way around lecture halls, laboratories, the central library, and the student union building.",
      action: "View Map",
      color: "border-emerald-200 hover:border-emerald-500"
    },
    {
      title: "Clubs & Societies",
      icon: "🎸",
      description: "Explore technical chapters (IEEE, ACM), cultural clubs (music, dramatics), and entrepreneurship cells.",
      action: "Explore Clubs",
      color: "border-purple-200 hover:border-purple-500"
    },
    {
      title: "Support & Safety",
      icon: "🛡️",
      description: "Important contacts for the medical center, student counselors, and the zero-tolerance anti-ragging cell.",
      action: "Emergency Contacts",
      color: "border-red-200 hover:border-red-500"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
        <h1 className="text-4xl font-bold mb-2">Welcome to Campus! 🎉</h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Your ultimate survival guide to navigating first year. From setting up your digital identity to finding the best spot in the library, we have you covered.
        </p>
      </header>

      {/* Quick Links / To-Do List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">First-Week Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
            <span className="text-gray-700 font-medium">Collect Student ID Card from Admin Block</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
            <span className="text-gray-700 font-medium">Register biometric for hostel attendance</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
            <span className="text-gray-700 font-medium">Attend the mandatory anti-ragging orientation</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" className="h-5 w-5 text-blue-600 rounded border-gray-300" />
            <span className="text-gray-700 font-medium">Log into the academic portal to check timetable</span>
          </label>
        </div>
      </div>

      {/* Guide Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guideSections.map((section, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border-2 transition duration-300 flex flex-col ${section.color}`}>
            <div className="text-4xl mb-4">{section.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-gray-600 mb-6 flex-grow">{section.description}</p>
            <button className="self-start px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition">
              {section.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}