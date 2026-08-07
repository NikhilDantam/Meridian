import React from 'react';

export default function ResearchHubPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Research Hub</h1>
        <p className="text-gray-600 mt-2">Access digital archives, research grants, and publication guides.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Digital Archives</h2>
          <p className="text-sm text-gray-600 mb-4">Search through IEEE Xplore, JSTOR, and Google Scholar integrated repositories.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Access Portal</button>
        </div>

        {/* Add more cards for Grants, Faculty Collabs, etc. */}
      </div>
    </div>
  );
}