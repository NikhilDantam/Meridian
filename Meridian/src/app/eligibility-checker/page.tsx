import AppLayout from '@/components/AppLayout';
import EligibilityCheckerContent from './components/EligibilityCheckerContent';

export default function EligibilityCheckerPage() {
  return (
    <AppLayout activePath="/eligibility-checker">
      <EligibilityCheckerContent />
    </AppLayout>
  );
}
