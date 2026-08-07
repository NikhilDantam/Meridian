import AppLayout from '@/components/AppLayout';
import AcademicPortalContent from './components/AcademicPortalContent';

export default function AcademicPortalPage() {
  return (
    <AppLayout activePath="/academic-portal">
      <AcademicPortalContent />
    </AppLayout>
  );
}