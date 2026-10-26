import React from 'react';
import { UploadCloud, ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PolaroidCard } from '../components/PolaroidCard';

export const MyUploadsView = () => {
  const { resources, myUploads, navigateBack, setIsUploadOpen } = useApp();

  const uploadedResources = resources.filter(r => myUploads.includes(r.id));

  return (
    <div className="my-uploads-view">
      {/* Header with Back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn btn-secondary"
          onClick={navigateBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setIsUploadOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} />
          <span>Upload New Frame</span>
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UploadCloud size={28} color="var(--color-green)" />
          <span>My Uploaded Frames</span>
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Study notes and PYQs contributed by you to help campus classmates
        </p>
      </div>

      {uploadedResources.length > 0 ? (
        <div className="polaroid-grid">
          {uploadedResources.map(resource => (
            <PolaroidCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon" style={{ background: 'var(--color-green-light)', color: 'var(--color-green-dark)' }}>
            <UploadCloud size={32} />
          </div>
          <h2 className="empty-state-title">You haven't uploaded any notes yet</h2>
          <p className="empty-state-desc">
            Share your lecture notes, previous-year question solutions, or revision formula sheets with your fellow students.
          </p>
          <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
            <Plus size={16} />
            <span>Upload Your First Note</span>
          </button>
        </div>
      )}
    </div>
  );
};
