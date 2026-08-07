import React from 'react';

export default function MarketNewsPage() {
  const newsItems = [
    { title: "Supply Chain Shifts: The 'China Plus One' Strategy", category: "Global Trade", date: "Today" },
    { title: "Energy Transition: Investments in Green Hydrogen", category: "Geopolitics", date: "Yesterday" },
    { title: "Stricter Data Protection Regulations in the EU", category: "Tech Policy", date: "2 Days Ago" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Professional Market News</h1>
        <p className="text-gray-600 mt-2">Live updates on geopolitics, macroeconomics, and industry shifts.</p>
      </header>

      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h3>
            </div>
            <span className="text-sm text-gray-400 mt-2 md:mt-0">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}