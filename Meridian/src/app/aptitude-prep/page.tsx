import React from 'react';

export default function AptitudePrepPage() {
  const sections = [
    { title: "Quantitative Aptitude", desc: "Percentages, Ratios, Time/Distance, Data Interpretation", color: "bg-purple-50 text-purple-700" },
    { title: "Logical Reasoning", desc: "Blood Relations, Syllogisms, Puzzles, Coding-Decoding", color: "bg-orange-50 text-orange-700" },
    { title: "Verbal Ability", desc: "Reading Comprehension, Error Spotting, Vocabulary", color: "bg-teal-50 text-teal-700" },
    { title: "General Awareness", desc: "Current Affairs, Business Ethics, Case Studies", color: "bg-rose-50 text-rose-700" }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Aptitude & Exam Prep</h1>
        <p className="text-gray-600 mt-2">Master the core concepts required for top-tier campus placements and government exams.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((sec, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-start hover:-translate-y-1 transition duration-200">
            <div className={`p-3 rounded-lg font-bold mb-4 ${sec.color}`}>Section {i + 1}</div>
            <h2 className="text-xl font-bold mb-2">{sec.title}</h2>
            <p className="text-sm text-gray-600 flex-grow">{sec.desc}</p>
            <button className="mt-6 text-sm font-semibold text-blue-600 hover:underline">Start Practice &rarr;</button>
          </div>
        ))}
      </div>
    </div>
  );
}