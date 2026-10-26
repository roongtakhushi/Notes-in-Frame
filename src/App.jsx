import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/Toast';
import { ProfileDrawer } from './components/ProfileDrawer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { FilterSheet } from './components/FilterSheet';
import { StudentAuthModal } from './components/StudentAuthModal';

// Views
import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { NoteDetailView } from './views/NoteDetailView';
import { ExamRescueView } from './views/ExamRescueView';
import { CollectionsView } from './views/CollectionsView';
import { UploadView } from './views/UploadView';
import { ProfileView } from './views/ProfileView';
import { BookmarksView } from './views/BookmarksView';
import { MyUploadsView } from './views/MyUploadsView';
import { SettingsView } from './views/SettingsView';

const AppContent = () => {
  const {
    currentView,
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    exploreFilters,
    setExploreFilters
  } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'onboarding':
        return <OnboardingView />;
      case 'home':
        return <HomeView />;
      case 'explore':
        return <ExploreView />;
      case 'detail':
        return <NoteDetailView />;
      case 'exam-rescue':
        return <ExamRescueView />;
      case 'collections':
        return <CollectionsView />;
      case 'upload':
        return <UploadView />;
      case 'profile':
        return <ProfileView />;
      case 'bookmarks':
        return <BookmarksView />;
      case 'my-uploads':
        return <MyUploadsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className={`app-root ${currentView === 'landing' ? 'app-root-landing' : ''}`}>
      {/* App Top Header */}
      <Header />

      {/* Main Viewport Content */}
      <main className={`main-content ${currentView === 'landing' ? 'main-content-landing' : ''}`}>
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom 5-Tab Navigation (Screens 3, 4, 8) */}
      <MobileBottomNav />

      {/* Screen 10: Profile Slide-in Menu Modal Drawer */}
      <ProfileDrawer />

      {/* Screen 11: Real-time Notification Activity Drawer */}
      <NotificationDrawer />

      {/* Screen 5: Filter Bottom Sheet Modal */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={exploreFilters}
        onApply={(updated) => setExploreFilters(updated)}
      />

      {/* Student Authentication Modal (Sign In / Register) */}
      <StudentAuthModal />

      {/* Floating Interactive Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
