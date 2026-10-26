import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_SUBJECTS, ACADEMIC_YEARS, RESOURCE_TYPES } from '../data/mockResources';

export const UploadModal = () => {
  const { isUploadOpen, setIsUploadOpen, addNewResource, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Machine Learning',
    subjectCode: 'CS502',
    academicYear: '3rd Year',
    resourceType: 'Lecture Notes',
    unitOrTopic: '',
    description: '',
    tapeColor: 'green'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [newlyCreatedId, setNewlyCreatedId] = useState(null);

  if (!isUploadOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'txt'];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!validExtensions.includes(ext)) {
        setErrors(prev => ({ ...prev, file: 'Supported file types: PDF, DOC, DOCX, PNG, JPG, TXT' }));
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

  const handleUseSampleFile = (e) => {
    if (e) e.stopPropagation();
    setSelectedFile({
      name: 'Lecture_Unit_Notes_Demo.pdf',
      size: 3.8 * 1024 * 1024,
      type: 'application/pdf'
    });
    setErrors(prev => ({ ...prev, file: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.unitOrTopic.trim()) errs.unitOrTopic = 'Unit or Topic is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!selectedFile) errs.file = 'Please select a file or click "Use Sample Demo File"';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Add to shared application state
    const created = addNewResource({
      title: formData.title.trim(),
      subject: formData.subject,
      subjectCode: formData.subjectCode,
      academicYear: formData.academicYear,
      resourceType: formData.resourceType,
      unitOrTopic: formData.unitOrTopic.trim(),
      description: formData.description.trim(),
      tapeColor: formData.tapeColor,
      fileName: selectedFile ? selectedFile.name : 'campus_note_upload.pdf',
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '3.8 MB',
      pages: '16 pages'
    });

    setNewlyCreatedId(created.id);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsUploadOpen(false);
    setIsSuccess(false);
    setSelectedFile(null);
    setFormData({
      title: '',
      subject: 'Machine Learning',
      subjectCode: 'CS502',
      academicYear: '3rd Year',
      resourceType: 'Lecture Notes',
      unitOrTopic: '',
      description: '',
      tapeColor: 'green'
    });
    setErrors({});
  };

  const handleViewNote = () => {
    const targetId = newlyCreatedId;
    handleClose();
    if (targetId) {
      navigateTo('detail', targetId);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header (Screen 9) */}
        <div className="modal-header" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-green-light)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UploadCloud size={20} />
            </div>
            <div>
              <h1 className="modal-title" id="upload-modal-title" style={{ fontSize: '1.25rem' }}>
                Share Your Notes
              </h1>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Help your peers by uploading quality notes and resources.
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={handleClose} aria-label="Close upload form">
            <X size={20} />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            {/* File Dropzone (Screen 9) */}
            <div className="form-group">
              <div
                className="file-dropzone"
                onClick={() => document.getElementById('file-upload-input')?.click()}
                style={{ padding: '1.5rem 1rem' }}
              >
                <input
                  id="file-upload-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
                />
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-blue-light)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <UploadCloud size={26} />
                </div>
                {selectedFile ? (
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {selectedFile.name}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for submission
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                      Drag and drop your file here or <span style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>Choose a file</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '8px' }}>
                      PDF, DOC, DOCX (Max 20 MB)
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleUseSampleFile}
                      style={{ fontSize: '0.75rem', padding: '3px 10px', minHeight: '30px', margin: '0 auto', background: '#FFFFFF' }}
                    >
                      <FileText size={14} color="var(--color-blue)" />
                      <span>Attach Sample Demo Document (PDF)</span>
                    </button>
                  </div>
                )}
              </div>
              {errors.file && <div className="form-error">{errors.file}</div>}
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="upload-title">Title</label>
              <input
                id="upload-title"
                type="text"
                className="form-input"
                placeholder="e.g. Machine Learning Unit 2 Notes"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            {/* Subject and Type Row (Screen 9) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="upload-subject">Subject</label>
                <select
                  id="upload-subject"
                  className="form-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  {ALL_SUBJECTS.filter(s => s !== 'All').map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="upload-type">Type</label>
                <select
                  id="upload-type"
                  className="form-select"
                  value={formData.resourceType}
                  onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                >
                  {RESOURCE_TYPES.filter(t => t !== 'All').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Academic Year and Unit / Topic Row (Screen 9) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="upload-year">Academic Year</label>
                <select
                  id="upload-year"
                  className="form-select"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                >
                  {ACADEMIC_YEARS.filter(y => y !== 'All').map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="upload-topic">Unit / Topic</label>
                <input
                  id="upload-topic"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Unit 2"
                  value={formData.unitOrTopic}
                  onChange={(e) => setFormData({ ...formData, unitOrTopic: e.target.value })}
                />
                {errors.unitOrTopic && <div className="form-error">{errors.unitOrTopic}</div>}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="upload-description">Description</label>
              <textarea
                id="upload-description"
                className="form-textarea"
                rows={2}
                placeholder="Add a short description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            {/* Green Upload Notes Button (Screen 9) */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
            >
              <span>Upload Notes</span>
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-green-light)', color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Resource Captured Successfully!
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Your note <strong>"{formData.title}"</strong> has been added to the library. It is immediately viewable in <strong>Explore Notes</strong> and your <strong>My Uploads</strong> section.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleViewNote}
              >
                <span>View Note Frame</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
