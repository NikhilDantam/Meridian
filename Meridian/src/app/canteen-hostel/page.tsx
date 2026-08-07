import React from 'react';

export default function CanteenHostelPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Campus Living</h1>
        <p className="text-gray-600 mt-2">Manage hostel accommodations and canteen pre-orders seamlessly.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hostel Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">🏠</span> 
            Hostel Administration
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <h3 className="font-bold">Raise a Maintenance Ticket</h3>
              <p className="text-sm text-gray-500">Report plumbing, electrical, or Wi-Fi issues.</p>
            </button>
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <h3 className="font-bold">Digital Out-Pass</h3>
              <p className="text-sm text-gray-500">Apply for weekend leave or late-night curfew extensions.</p>
            </button>
          </div>
        </div>

        {/* Smart Canteen */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-orange-100 text-orange-700 p-2 rounded-lg mr-3">🍔</span> 
            Smart Canteen
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <h3 className="font-bold">Pre-Order Meals</h3>
              <p className="text-sm text-gray-500">Skip the queue. Order and pay digitally.</p>
            </button>
            <button className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <h3 className="font-bold">Today's Menu & Nutrition</h3>
              <p className="text-sm text-gray-500">Check dietary flags (vegan, gluten-free) and calorie counts.</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}