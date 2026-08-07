import AppLayout from '@/components/AppLayout';
import HeroBanner from './components/HeroBanner';
import OrchestratorChat from './components/OchestratorChat';
import AgentGrid from './components/AgentGrid';
import CampusStats from './components/CampusStats';
import NotificationTicker from './components/NotificationTicker';

export default function HomePage() {
  return (
    <AppLayout activePath="/">
      <div className="min-h-full">
        <NotificationTicker />
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-8">
          <HeroBanner />
          <OrchestratorChat />
          <CampusStats />
          <AgentGrid />
        </div>
      </div>
    </AppLayout>
  );
}
