import AppLayout from '@/components/AppLayout';
import TimetableContent from './components/TimetableContent';

export default function TimetablePage() {
  return (
    <AppLayout activePath="/timetable">
      <TimetableContent />
    </AppLayout>
  );
}
