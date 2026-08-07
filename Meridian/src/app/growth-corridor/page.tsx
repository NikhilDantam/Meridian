import React from 'react';

export default function GrowthCorridorPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Growth Corridor</h1>
        <p className="text-gray-600 mt-2">Discover emerging market trends, high-demand roles, and career roadmaps.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tech Core Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Engineering & Tech Core</h2>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800">Clean Energy & EVs</h3>
              <p className="text-sm text-gray-600">Roles: EV Infrastructure Engineers, Battery Chemists.</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800">AI, Cloud & Cyber</h3>
              <p className="text-sm text-gray-600">Roles: ML Engineers, Cloud Architects, Cyber Auditors.</p>
            </li>
          </ul>
        </div>

        {/* Non-Tech Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Business & Humanities</h2>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800">BFSI & FinTech</h3>
              <p className="text-sm text-gray-600">Roles: Wealth Managers, Risk Analysts, ESG Consultants.</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800">Healthcare Management</h3>
              <p className="text-sm text-gray-600">Roles: Hospital Administrators, Health Informatics Officers.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}