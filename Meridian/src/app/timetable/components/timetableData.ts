export interface TimetableSlot {
  subjectCode: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'break';
  color: string;
}

export interface DaySchedule {
  day: string;
  short: string;
  slots: (TimetableSlot | null)[];
}

export const periods = [
  { label: 'P1', time: '09:00 – 09:50' },
  { label: 'P2', time: '09:50 – 10:40' },
  { label: 'P3', time: '10:50 – 11:40' },
  { label: 'P4', time: '11:40 – 12:30' },
  { label: 'LUNCH', time: '12:30 – 01:20' },
  { label: 'P5', time: '01:20 – 02:10' },
  { label: 'P6', time: '02:10 – 03:00' },
  { label: 'P7', time: '03:10 – 04:00' },
];

const DAA: TimetableSlot = { subjectCode: 'CS501', subject: 'Design & Analysis of Algorithms', faculty: 'Dr. N. Ramesh', room: 'LH-204', type: 'lecture', color: 'amber' };
const OS: TimetableSlot = { subjectCode: 'CS502', subject: 'Operating Systems', faculty: 'Dr. P. Sharma', room: 'LH-204', type: 'lecture', color: 'blue' };
const CN: TimetableSlot = { subjectCode: 'CS503', subject: 'Computer Networks', faculty: 'Prof. K. Iyer', room: 'LH-108', type: 'lecture', color: 'emerald' };
const DBMS: TimetableSlot = { subjectCode: 'CS504', subject: 'Database Management Systems', faculty: 'Dr. S. Rao', room: 'LH-108', type: 'lecture', color: 'purple' };
const SE: TimetableSlot = { subjectCode: 'CS505', subject: 'Software Engineering', faculty: 'Ms. A. Fernandes', room: 'LH-204', type: 'lecture', color: 'rose' };
const OSLAB: TimetableSlot = { subjectCode: 'CS512', subject: 'OS Lab', faculty: 'Dr. P. Sharma', room: 'Lab-3', type: 'lab', color: 'blue' };
const DBLAB: TimetableSlot = { subjectCode: 'CS514', subject: 'DBMS Lab', faculty: 'Dr. S. Rao', room: 'Lab-1', type: 'lab', color: 'purple' };
const DAATUT: TimetableSlot = { subjectCode: 'CS501-T', subject: 'DAA Tutorial', faculty: 'Dr. N. Ramesh', room: 'LH-204', type: 'tutorial', color: 'amber' };
const APT: TimetableSlot = { subjectCode: 'GE401', subject: 'Aptitude & Soft Skills', faculty: 'Career Cell', room: 'Seminar Hall', type: 'lecture', color: 'teal' };
const LUNCH: TimetableSlot = { subjectCode: 'LUNCH', subject: 'Lunch Break', faculty: '', room: '', type: 'break', color: 'gray' };

export const timetable: DaySchedule[] = [
  { day: 'Monday', short: 'MON', slots: [DAA, OS, CN, DBMS, LUNCH, SE, OSLAB, OSLAB] },
  { day: 'Tuesday', short: 'TUE', slots: [OS, DAA, DBMS, CN, LUNCH, DBLAB, DBLAB, APT] },
  { day: 'Wednesday', short: 'WED', slots: [CN, SE, DAA, OS, LUNCH, DAATUT, DBMS, null] },
  { day: 'Thursday', short: 'THU', slots: [DBMS, CN, OSLAB, OSLAB, LUNCH, DAA, SE, null] },
  { day: 'Friday', short: 'FRI', slots: [SE, DBLAB, DBLAB, DAA, LUNCH, OS, CN, APT] },
  { day: 'Saturday', short: 'SAT', slots: [APT, DAA, OS, null, LUNCH, null, null, null] },
];

export const legend = [
  { label: 'Lecture', color: 'amber' },
  { label: 'Lab Session', color: 'blue' },
  { label: 'Tutorial', color: 'purple' },
  { label: 'Break', color: 'gray' },
];

export const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
};
