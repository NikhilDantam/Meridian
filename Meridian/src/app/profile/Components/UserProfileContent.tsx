'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const ALL_INTERESTS = [
  'AI/ML', 'Web Development', 'Competitive Programming', 'Data Science',
  'Cybersecurity', 'Cloud Computing', 'Mobile Development', 'Open Source',
  'Blockchain', 'IoT', 'Robotics', 'UI/UX Design', 'DevOps', 'Game Development',
];

const INITIAL_TAGS = ['AI/ML', 'Web Development', 'Competitive Programming', 'Data Science'];

interface ProfileField {
  label: string;
  value: string;
  icon: string;
  editable?: boolean;
}

export default function UserProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(INITIAL_TAGS);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: 'Mahesh Babu',
    rollNumber: '25211A0458',
    branch: 'Electronics & CommunicationEngineering',
    year: '2nd Year',
    division: 'A',
    email: '25211A0458@meridian.ac.in',
    phone: '+91 9346296593',
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  const profileFields: ProfileField[] = [
    { label: 'Full Name', value: profile.name, icon: 'UserIcon', editable: true },
    { label: 'Roll Number', value: profile.rollNumber, icon: 'IdentificationIcon', editable: false },
    { label: 'Branch', value: profile.branch, icon: 'ComputerDesktopIcon', editable: false },
    { label: 'Year', value: profile.year, icon: 'AcademicCapIcon', editable: false },
    { label: 'Division / Section', value: profile.division, icon: 'UserGroupIcon', editable: false },
    { label: 'Email Address', value: profile.email, icon: 'EnvelopeIcon', editable: true },
    { label: 'Phone Number', value: profile.phone, icon: 'PhoneIcon', editable: true },
  ];

  const academicStats = [
    { label: 'CGPA', value: '8.7', sub: 'out of 10.0', icon: 'StarIcon', color: 'amber', trend: '+0.2 this sem' },
    { label: 'Class Rank', value: '12', sub: 'out of 120', icon: 'TrophyIcon', color: 'orange', trend: '↑ 3 places' },
    { label: 'Attendance', value: '79.6%', sub: 'overall', icon: 'ClipboardDocumentCheckIcon', color: 'emerald', trend: 'Above 75%' },
    { label: 'Credits Earned', value: '96', sub: 'of 160 total', icon: 'BookOpenIcon', color: 'blue', trend: '5th Semester' },
  ];

  const semesterGPAs = [
    { sem: 'Sem I', gpa: 8.2 },
    { sem: 'Sem II', gpa: 8.5 },
    { sem: 'Sem III', gpa: 8.4 },
    { sem: 'Sem IV', gpa: 8.9 },
    { sem: 'Sem V', gpa: 8.7 },
  ];

  const maxGPA = 10;

  const subjectAttendance = [
    { name: 'Mathematics III', pct: 87.5, status: 'safe' as const },
    { name: 'Data Structures', pct: 84.4, status: 'safe' as const },
    { name: 'Computer Networks', pct: 70.5, status: 'warning' as const },
    { name: 'Operating Systems', pct: 66.7, status: 'warning' as const },
    { name: 'Database Management', pct: 86.9, status: 'safe' as const },
    { name: 'Software Engineering', pct: 58.7, status: 'danger' as const },
  ];

  const statusColor = { safe: 'bg-emerald-500', warning: 'bg-amber-400', danger: 'bg-red-400' };
  const statusText = { safe: 'text-emerald-700', warning: 'text-amber-700', danger: 'text-red-600' };
  const statusBg = { safe: 'bg-emerald-50', warning: 'bg-amber-50', danger: 'bg-red-50' };

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSave() {
    setProfile({ ...editProfile });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditProfile({ ...profile });
    setIsEditing(false);
  }

  function handleLogout() {
    router.push('/signin');
  }

  const colorMap: Record<string, string> = {
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    orange: 'text-orange-600 bg-orange-50 border-orange-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-xl mx-auto space-y-6">

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-3xl font-800 text-white">RK</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-800 text-gray-900">{profile.name}</h1>
              <span className="text-xs font-600 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">Active Student</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-500">
              <span className="flex items-center gap-1">
                <Icon name="IdentificationIcon" size={14} className="text-amber-500" />
                {profile.rollNumber}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="ComputerDesktopIcon" size={14} className="text-amber-500" />
                CSE — {profile.year}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="BuildingOfficeIcon" size={14} className="text-amber-500" />
                Meridian Engineering College
              </span>
              <span className="flex items-center gap-1">
                <Icon name="UserGroupIcon" size={14} className="text-amber-500" />
                Division {profile.division}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 transition-all ${
                isEditing
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' :'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
              }`}
            >
              <Icon name={isEditing ? 'XMarkIcon' : 'PencilSquareIcon'} size={15} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={15} />
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Profile Details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Details Card */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-700 text-gray-900 flex items-center gap-2">
                <Icon name="UserCircleIcon" size={18} className="text-amber-500" />
                Profile Details
              </h2>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 text-white text-sm font-600 rounded-xl hover:bg-amber-600 transition-all shadow-sm"
                >
                  <Icon name="CheckIcon" size={14} />
                  Save Changes
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileFields.map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-xs font-600 text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <Icon name={field.icon as Parameters<typeof Icon>[0]['name']} size={12} className="text-amber-400" />
                    {field.label}
                  </label>
                  {isEditing && field.editable ? (
                    <input
                      type="text"
                      value={
                        field.label === 'Full Name' ? editProfile.name :
                        field.label === 'Email Address' ? editProfile.email :
                        editProfile.phone
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (field.label === 'Full Name') setEditProfile((p) => ({ ...p, name: val }));
                        else if (field.label === 'Email Address') setEditProfile((p) => ({ ...p, email: val }));
                        else setEditProfile((p) => ({ ...p, phone: val }));
                      }}
                      className="w-full text-sm font-500 text-gray-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-all"
                    />
                  ) : (
                    <div className="text-sm font-600 text-gray-800 bg-gray-50 border border-border rounded-xl px-3 py-2.5">
                      {field.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interests & Tags */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-700 text-gray-900 flex items-center gap-2">
                <Icon name="TagIcon" size={18} className="text-amber-500" />
                Interests & Tags
              </h2>
              <button
                onClick={() => setShowTagPicker(!showTagPicker)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-600 text-amber-700 bg-amber-50 border border-amber-100 rounded-xl hover:bg-amber-100 transition-all"
              >
                <Icon name={showTagPicker ? 'ChevronUpIcon' : 'PlusIcon'} size={14} />
                {showTagPicker ? 'Done' : 'Manage Tags'}
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-3 font-500">
              These tags help personalize your agent recommendations and content feed.
            </p>

            {/* Selected tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No interests selected yet.</p>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 text-sm font-600 rounded-full border border-amber-200"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:text-amber-600 transition-colors"
                  >
                    <Icon name="XMarkIcon" size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Tag picker */}
            {showTagPicker && (
              <div className="border border-border rounded-2xl p-4 bg-amber-50/40">
                <p className="text-xs font-600 text-muted-foreground uppercase tracking-wide mb-3">All Available Tags</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_INTERESTS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 text-sm font-600 rounded-full border transition-all ${
                          active
                            ? 'bg-amber-500 text-white border-amber-500' :'bg-white text-gray-600 border-border hover:border-amber-300 hover:text-amber-700'
                        }`}
                      >
                        {active && <span className="mr-1">✓</span>}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Academic Progress */}
        <div className="space-y-6">

          {/* Stats Grid */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-6">
            <h2 className="text-base font-700 text-gray-900 flex items-center gap-2 mb-5">
              <Icon name="ChartBarIcon" size={18} className="text-amber-500" />
              Academic Progress
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {academicStats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border p-3.5 ${colorMap[stat.color]}`}
                >
                  <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={16} className="mb-2 opacity-70" />
                  <p className="text-2xl font-800 font-tabular leading-none mb-0.5">{stat.value}</p>
                  <p className="text-xs font-500 opacity-70">{stat.sub}</p>
                  <p className="text-xs font-600 mt-1.5 opacity-90">{stat.trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Semester GPA Trend */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-6">
            <h2 className="text-base font-700 text-gray-900 flex items-center gap-2 mb-5">
              <Icon name="ArrowTrendingUpIcon" size={18} className="text-amber-500" />
              GPA Trend
            </h2>
            <div className="space-y-3">
              {semesterGPAs.map((item) => (
                <div key={item.sem} className="flex items-center gap-3">
                  <span className="text-xs font-600 text-muted-foreground w-12 flex-shrink-0">{item.sem}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${(item.gpa / maxGPA) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-700 text-amber-700 font-tabular w-8 text-right">{item.gpa}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-3xl border border-border shadow-card p-6">
            <h2 className="text-base font-700 text-gray-900 flex items-center gap-2 mb-5">
              <Icon name="ClipboardDocumentCheckIcon" size={18} className="text-amber-500" />
              Attendance Summary
            </h2>
            <div className="space-y-3">
              {subjectAttendance.map((sub) => (
                <div key={sub.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-600 text-gray-700 truncate max-w-[140px]">{sub.name}</span>
                    <span className={`text-xs font-700 px-2 py-0.5 rounded-full ${statusBg[sub.status]} ${statusText[sub.status]}`}>
                      {sub.pct}%
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${statusColor[sub.status]}`}
                      style={{ width: `${sub.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-500 text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Safe ≥75%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Low 65–75%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Critical &lt;65%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
