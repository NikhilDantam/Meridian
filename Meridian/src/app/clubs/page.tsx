import AppLayout from '@/components/AppLayout';
import ClubsContent from './components/ClubsContent';

export default function ClubsPage() {
  return (
    <AppLayout activePath="/clubs">
      <ClubsContent />
    </AppLayout>
  );
}
