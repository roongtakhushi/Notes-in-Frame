import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_RESOURCES,
  DEFAULT_COLLECTIONS,
  DEFAULT_EXAM_CHECKLIST
} from '../data/mockResources';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Shared Resource State with LocalStorage Persistence
  const [resources, setResources] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_resources');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading resources from localStorage', e);
    }
    return INITIAL_RESOURCES;
  });

  // 2. Bookmarked Resource IDs
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_bookmarks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading bookmarks from localStorage', e);
    }
    return ["nif-01", "nif-03", "nif-06"];
  });

  // 3. Collections State with LocalStorage Persistence
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_collections');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading collections from localStorage', e);
    }
    return DEFAULT_COLLECTIONS;
  });

  // 4. My Uploads list with LocalStorage Persistence
  const [myUploads, setMyUploads] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_my_uploads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading my_uploads from localStorage', e);
    }
    return [];
  });

  // 5. Exam Rescue State (selected subject, exam date, checklist items, generated plan)
  const [examState, setExamState] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_exam_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading exam_state from localStorage', e);
    }
    return {
      selectedSubject: "Machine Learning",
      examDate: "2026-11-15",
      isPlanGenerated: true,
      checklist: DEFAULT_EXAM_CHECKLIST
    };
  });

  // 6. Navigation and History Stack
  // Views: 'landing' | 'onboarding' | 'home' | 'explore' | 'detail' | 'exam-rescue' | 'collections' | 'upload' | 'profile' | 'bookmarks' | 'my-uploads' | 'settings'
  const [isLoggedOut, setIsLoggedOut] = useState(() => {
    try {
      return localStorage.getItem('nif_auth_logged_out') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState(() => {
    try {
      const loggedOut = localStorage.getItem('nif_auth_logged_out') === 'true';
      if (loggedOut) {
        return 'landing';
      }
      const seen = localStorage.getItem('nif_onboarding_seen');
      return seen ? 'home' : 'landing';
    } catch (e) {
      return 'landing';
    }
  });
  const [selectedResourceId, setSelectedResourceId] = useState('nif-01');
  const [historyStack, setHistoryStack] = useState(() => {
    try {
      const loggedOut = localStorage.getItem('nif_auth_logged_out') === 'true';
      if (loggedOut) {
        return ['landing'];
      }
      const seen = localStorage.getItem('nif_onboarding_seen');
      return seen ? ['home'] : ['landing'];
    } catch (e) {
      return ['landing'];
    }
  });

  // Explore Filter state (preserved across back navigation)
  const [exploreFilters, setExploreFilters] = useState({
    query: '',
    subject: 'All',
    year: 'All',
    type: 'All',
    sort: 'relevant'
  });

  // Modal / Drawer Overlay States matching wireframe
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Campus Activity Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Aarav Mehta bookmarked your DBMS 5-Year Solved PYQs',
      description: 'Your notes were saved to their "Semester 4 Prep" collection.',
      type: 'bookmark',
      time: '5m ago',
      read: false,
      targetView: 'detail',
      targetId: 'nif-02'
    },
    {
      id: 'notif-2',
      title: 'New upload: Machine Learning Unit 3 Deep Learning by Priya S.',
      description: 'Check out newly contributed lecture diagrams.',
      type: 'upload',
      time: '1h ago',
      read: false,
      targetView: 'explore',
      targetId: null
    },
    {
      id: 'notif-3',
      title: 'Exam Reminder: DBMS Mid-terms in 4 days!',
      description: 'Your Exam Rescue revision checklist is waiting.',
      type: 'exam',
      time: '3h ago',
      read: false,
      targetView: 'exam-rescue',
      targetId: null
    },
    {
      id: 'notif-4',
      title: 'Campus Milestone: 1,280 peer downloads on your notes!',
      description: 'You earned the "Silver Note Taker" contributor badge.',
      type: 'award',
      time: 'Yesterday',
      read: true,
      targetView: 'profile',
      targetId: null
    }
  ]);

  // Active Toast Feedback
  const [toasts, setToasts] = useState([]);

  // Study Settings & Student Preferences (persisted in localStorage)
  const [studySettings, setStudySettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nif_study_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    return {
      highContrast: false,
      paperTexture: true,
      autoDownloadOnWifi: true,
      examAlerts: true,
      peerActivityAlerts: true,
      university: 'Delhi Technological University',
      branch: 'Computer Science & Engineering',
      semester: 'Semester VII',
      cachedBytes: 50541363 // ~48.2 MB
    };
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('nif_resources', JSON.stringify(resources));
    } catch (e) {
      console.warn('LocalStorage quota or access issue', e);
    }
  }, [resources]);

  useEffect(() => {
    try {
      localStorage.setItem('nif_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('nif_collections', JSON.stringify(collections));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem('nif_my_uploads', JSON.stringify(myUploads));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [myUploads]);

  useEffect(() => {
    try {
      localStorage.setItem('nif_exam_state', JSON.stringify(examState));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [examState]);

  useEffect(() => {
    try {
      localStorage.setItem('nif_study_settings', JSON.stringify(studySettings));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    if (studySettings.highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
    if (studySettings.paperTexture) {
      document.body.classList.add('paper-texture-mode');
    } else {
      document.body.classList.remove('paper-texture-mode');
    }
  }, [studySettings]);

  const updateStudySetting = (key, value) => {
    setStudySettings(prev => ({ ...prev, [key]: value }));
  };

  const clearCache = () => {
    setStudySettings(prev => ({ ...prev, cachedBytes: 0 }));
    showToast({
      title: 'Local Notes Cache Cleared 🧹',
      description: 'Freed 48.2 MB of local storage. Study frames will be re-cached on demand.',
      type: 'success'
    });
  };

  const downloadAllOfflineArchive = () => {
    try {
      const text = `Notes in Frame - Offline Study Package\nStudent: Khushi Sharma\nUniversity: ${studySettings.university}\nBranch: ${studySettings.branch} (${studySettings.semester})\nExported: ${new Date().toLocaleString()}\nTotal Bookmarked Resources: ${bookmarks.length}\nStatus: Verified Offline Ready for Exam Preparation.`;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `notes-in-frame-offline-archive-${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast({
        title: 'Offline Study Package Exported 📦',
        description: `Exported verified archive with all ${bookmarks.length} saved study resources.`,
        type: 'success'
      });
    } catch (e) {
      showToast('Offline study bundle exported', 'info');
    }
  };

  // Industry-Grade Production Toast System with Rich Metadata Support
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showToast = (toastInput, defaultType = 'info') => {
    const id = Date.now() + Math.random();
    let toastObj;
    if (typeof toastInput === 'string') {
      toastObj = {
        id,
        title: toastInput,
        description: null,
        type: defaultType,
        action: null,
        duration: 4000
      };
    } else {
      toastObj = {
        id,
        title: toastInput.title || toastInput.message || 'Notification',
        description: toastInput.description || null,
        type: toastInput.type || defaultType,
        action: toastInput.action || null,
        duration: toastInput.duration || 4000
      };
    }

    setToasts(prev => [toastObj, ...prev.slice(0, 2)]); // Keep max 3 toasts to avoid UI clutter

    // Subtle tactile haptic impulse on supported mobile hardware
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } catch (_) {}

    return id;
  };

  // Navigation Handlers
  const navigateTo = (view, resourceId = null) => {
    if (view === 'detail' && resourceId) {
      setSelectedResourceId(resourceId);
    }
    setHistoryStack(prev => [...prev, view]);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // Remove current
      const prevView = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentView(prevView);
    } else {
      const fallbackView = isLoggedOut ? 'landing' : 'home';
      setCurrentView(fallbackView);
      setHistoryStack([fallbackView]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open note details while preserving navigation origin
  const openNoteDetail = (id) => {
    setSelectedResourceId(id);
    setHistoryStack(prev => [...prev, 'detail']);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark Handler (updates shared state across all views)
  const toggleBookmark = (id, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const isCurrentlySaved = bookmarks.includes(id);
    let updated;
    if (isCurrentlySaved) {
      updated = bookmarks.filter(bId => bId !== id);
      showToast({
        title: 'Removed from Bookmarks',
        description: 'Resource unpinned from your saved study frames.',
        type: 'info'
      });
    } else {
      updated = [...bookmarks, id];
      showToast({
        title: 'Frame Pinned to Bookmarks! 📌',
        description: 'Saved to your library for instant offline revision.',
        type: 'pink',
        action: {
          label: 'View',
          onClick: () => navigateTo('bookmarks')
        }
      });
    }
    setBookmarks(updated);
  };

  // Collection Handlers
  const createCollection = (name, description, tapeColor = 'blue') => {
    const newCol = {
      id: `col-${Date.now()}`,
      name: name.trim() || 'Untitled Collection',
      description: description.trim() || 'Custom study collection',
      resourceIds: [],
      tapeColor,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCollections(prev => [newCol, ...prev]);
    showToast({
      title: 'Study Collection Created! 📁',
      description: `"${newCol.name}" added to your curated study shelves.`,
      type: 'success',
      action: {
        label: 'Open',
        onClick: () => navigateTo('collections')
      }
    });
    return newCol;
  };

  const toggleResourceInCollection = (collectionId, resourceId) => {
    setCollections(prev =>
      prev.map(col => {
        if (col.id === collectionId) {
          const exists = col.resourceIds.includes(resourceId);
          const updatedIds = exists
            ? col.resourceIds.filter(id => id !== resourceId)
            : [...col.resourceIds, resourceId];
          showToast({
            title: exists ? `Removed from ${col.name}` : `Pinned to ${col.name}! 📑`,
            description: exists ? 'Resource removed from study collection.' : `Added note to "${col.name}".`,
            type: exists ? 'info' : 'pink'
          });
          return { ...col, resourceIds: updatedIds };
        }
        return col;
      })
    );
  };

  // Exam Rescue Handlers
  const generateExamPlan = (subject, examDate) => {
    // Deterministic checklist matching the selected subject
    const subjectResources = resources.filter(r => r.subject === subject || subject === 'All');
    const matchedResource1 = subjectResources[0]?.id || 'nif-01';
    const matchedResource2 = subjectResources[1]?.id || 'nif-02';

    const newChecklist = [
      { id: `task-${Date.now()}-1`, text: `Review ${subject} fundamental formulas & definitions`, completed: false, resourceId: matchedResource1 },
      { id: `task-${Date.now()}-2`, text: `Solve past 3-year ${subject} PYQ exam problems`, completed: false, resourceId: matchedResource2 },
      { id: `task-${Date.now()}-3`, text: `Practice core algorithmic derivations and numericals`, completed: false, resourceId: matchedResource1 },
      { id: `task-${Date.now()}-4`, text: `Cross-verify architecture diagrams and key notations`, completed: false, resourceId: matchedResource2 },
      { id: `task-${Date.now()}-5`, text: `Complete a 45-minute timed mock test before ${examDate}`, completed: false, resourceId: null }
    ];

    setExamState({
      selectedSubject: subject,
      examDate,
      isPlanGenerated: true,
      checklist: newChecklist
    });
    showToast(`Exam Rescue Plan generated for ${subject}!`, 'success');
  };

  const toggleChecklistTask = (taskId) => {
    setExamState(prev => {
      const updatedChecklist = prev.checklist.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return {
        ...prev,
        checklist: updatedChecklist
      };
    });
  };

  // Add Uploaded Resource to shared state
  const addNewResource = (resourceData) => {
    const newId = `upload-${Date.now()}`;
    const newResource = {
      id: newId,
      title: resourceData.title,
      subject: resourceData.subject,
      subjectCode: resourceData.subjectCode || "CAMPUS-101",
      academicYear: resourceData.academicYear,
      resourceType: resourceData.resourceType,
      unitOrTopic: resourceData.unitOrTopic || "General Topic",
      description: resourceData.description,
      rating: 5.0,
      reviewCount: 1,
      fileName: resourceData.fileName || "uploaded_campus_notes.pdf",
      fileSize: resourceData.fileSize || "3.2 MB",
      pages: resourceData.pages || "18 pages",
      uploadedBy: "Alex Carter (You - CSE '26)",
      createdAt: new Date().toISOString().split('T')[0],
      tags: resourceData.tags || ["Student Contribution", "Verified"],
      tapeColor: resourceData.tapeColor || "green",
      frameNumber: `EXP ${resources.length + 1}`,
      handwrittenCaption: resourceData.caption || "Freshly captured campus frame!",
      previewType: "code-math",
      svgContent: {
        accentColor: "#89BC62",
        diagramTitle: resourceData.title,
        subtitle: `${resourceData.subject} • ${resourceData.unitOrTopic || 'Notes'}`,
        codeSnippet: "// Newly contributed student resource\n// Verified local prototype storage"
      }
    };

    setResources(prev => [newResource, ...prev]);
    setMyUploads(prev => [newResource.id, ...prev]);
    showToast({
      title: 'Study Frame Uploaded to Campus! 🚀',
      description: `"${newResource.title}" is now discoverable by classmates.`,
      type: 'upload',
      action: {
        label: 'My Uploads',
        onClick: () => navigateTo('my-uploads')
      }
    });
    return newResource;
  };

  // Download simulation
  const downloadResource = (resource) => {
    try {
      const content = `================================================
NOTES IN FRAME — CAMPUS STUDY RESOURCE
Title: ${resource.title}
Subject: ${resource.subject} (${resource.subjectCode})
Year: ${resource.academicYear} | Type: ${resource.resourceType}
Unit/Topic: ${resource.unitOrTopic}
Rating: ${resource.rating} / 5.0 (${resource.reviewCount} reviews)
Uploaded by: ${resource.uploadedBy} on ${resource.createdAt}
================================================

DESCRIPTION:
${resource.description}

TAGS:
${resource.tags.join(', ')}

[NOTES IN FRAME — PROTOTYPE DOWNLOAD VERIFIED]
Downloaded at: ${new Date().toLocaleString()}
Campus Notes Hub Challenge - SASC PixelRush
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.fileName.replace('.pdf', '.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast({
        title: 'Downloading Study Resource 📥',
        description: `${resource.fileName} (${resource.fileSize}) · High-res scan ready for offline study.`,
        type: 'download'
      });
    } catch (err) {
      showToast('Download started (local prototype)', 'info');
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({
      title: 'All Alerts Marked as Read ✓',
      description: 'Your campus activity notifications are completely caught up.',
      type: 'info'
    });
  };

  const logoutUser = () => {
    try {
      localStorage.setItem('nif_auth_logged_out', 'true');
    } catch (e) {
      console.warn('LocalStorage error saving auth state', e);
    }
    setIsLoggedOut(true);
    setIsProfileDrawerOpen(false);
    setIsNotificationOpen(false);
    setIsFilterSheetOpen(false);
    setIsUploadOpen(false);
    setCurrentView('landing');
    setHistoryStack(['landing']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast({
      title: 'Logged Out Successfully 🔒',
      description: 'Session ended. Returned to welcome landing page.',
      type: 'info'
    });
  };

  const loginUser = () => {
    try {
      localStorage.removeItem('nif_auth_logged_out');
    } catch (e) {
      console.warn('LocalStorage error clearing auth state', e);
    }
    setIsLoggedOut(false);
    setCurrentView('home');
    setHistoryStack(['home']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast({
      title: 'Welcome Back, Khushi! 👋',
      description: 'Senior Contributor profile, 1,280 downloads & 12d streak restored.',
      type: 'success'
    });
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        resources,
        bookmarks,
        collections,
        myUploads,
        examState,
        currentView,
        selectedResourceId,
        historyStack,
        exploreFilters,
        isUploadOpen,
        isFilterSheetOpen,
        isProfileDrawerOpen,
        isNotificationOpen,
        notifications,
        unreadNotificationsCount,
        isLoggedOut,
        studySettings,
        updateStudySetting,
        clearCache,
        downloadAllOfflineArchive,
        toasts,
        removeToast,
        setExploreFilters,
        setIsUploadOpen,
        setIsFilterSheetOpen,
        setIsProfileDrawerOpen,
        setIsNotificationOpen,
        markAllNotificationsAsRead,
        logoutUser,
        loginUser,
        navigateTo,
        navigateBack,
        openNoteDetail,
        toggleBookmark,
        createCollection,
        toggleResourceInCollection,
        generateExamPlan,
        toggleChecklistTask,
        addNewResource,
        downloadResource,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
