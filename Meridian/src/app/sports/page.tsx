import React from 'react';

export default function SportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Games & Sports</h1>
        <p className="text-gray-600 mt-2">Book facilities, track leagues, and manage sports equipment.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:border-blue-500 transition">
          <div className="text-4xl mb-4">🏟️</div>
          <h2 className="text-xl font-bold mb-2">Facility Booking</h2>
          <p className="text-sm text-gray-600 mb-6">Reserve badminton courts, turfs, and gym slots.</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Book Slot</button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:border-green-500 transition">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-bold mb-2">Campus Leagues</h2>
          <p className="text-sm text-gray-600 mb-6">Live scoreboards, schedules, and tournament tracking.</p>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">View Fixtures</button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:border-purple-500 transition">
          <div className="text-4xl mb-4">🏸</div>
          <h2 className="text-xl font-bold mb-2">Equipment Log</h2>
          <p className="text-sm text-gray-600 mb-6">Digital inventory for borrowing and returning gear.</p>
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Check Inventory</button>
        </div>
      </div>
    </div>
  );
}