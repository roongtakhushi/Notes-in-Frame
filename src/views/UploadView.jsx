import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_SUBJECTS, ACADEMIC_YEARS, RESOURCE_TYPES } from '../data/mockResources';

export const UploadView = () => {
  const { navigateBack, addNewResource, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Machine Learning',
    resourceType: 'Lecture Notes',
    academicYear: '3rd Year',
    unitOrTopic: '',
    description: '',
    tapeColor: 'pink'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSimulateDrop = () => {
    setSelectedFile({
      name: 'Machine_Learning_Unit2_Notes.pdf',
      size: 2.4 * 1024 * 1024
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addNewResource({
      title: formData.title || 'Machine Learning Unit 2 Notes',
      subject: formData.subject,
      subjectCode: 'CS502',
      academicYear: formData.academicYear,
      resourceType: formData.resourceType,
      unitOrTopic: formData.unitOrTopic || 'Unit 2: Loss & Derivations',
      description: formData.description || 'Verified student lecture notes with solved questions.',
      tapeColor: formData.tapeColor,
      fileName: selectedFile ? selectedFile.name : 'ML_Unit2_Uploaded_Notes.pdf',
      fileSize: '2.4 MB',
      pages: '12 pages'
    });
    setCreatedId(created.id);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="upload-screen-container" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--color-green-light)',
          color: 'var(--color-green-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <CheckCircle2 size={40} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Frame Uploaded!
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
          Your notes have been pinned to the campus Knowledge Wall and added to your uploads.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('detail', createdId)}
          >
            View Uploaded Note
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsSuccess(false);
              setSelectedFile(null);
              setFormData({
                title: '',
                subject: 'Machine Learning',
                resourceType: 'Lecture Notes',
                academicYear: '3rd Year',
                unitOrTopic: '',
                description: '',
                tapeColor: 'pink'
              });
            }}
          >
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-screen-container">
      {/* Top Header Bar (Screen 9) */}
      <div className="upload-top-bar">
        <button
          className="btn-back-round"
          onClick={navigateBack}
          aria-label="Back"
        >
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="upload-title-area">
          <h1 className="upload-header-title">Share Your Notes</h1>
          <p className="upload-header-subtitle">
            Help your peers by uploading quality notes and resources.
          </p>
        </div>

        {/* 3D Film Roll Canister Graphic */}
        <div className="upload-film-canister" aria-hidden="true">
          <div className="film-canister-cap" />
          <div className="film-canister-body">
            <span className="film-canister-label">35mm</span>
          </div>
          <div className="film-canister-tongue" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="upload-form-body">
        {/* Dashed Drag-and-Drop Zone */}
        <div
          className={`upload-dropzone ${selectedFile ? 'has-file' : ''}`}
          onClick={handleSimulateDrop}
        >
          <input
            type="file"
            id="file-upload-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <div className="dropzone-icon-circle">
            <UploadCloud size={28} color="#407ADD" />
          </div>
          <p className="dropzone-prompt">
            {selectedFile ? (
              <span style={{ color: 'var(--color-green-dark)', fontWeight: 700 }}>
                {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
              </span>
            ) : (
              <>
                Drag and drop your file here or{' '}
                <label htmlFor="file-upload-input" className="btn-choose-file" onClick={(e) => e.stopPropagation()}>
                  Choose a file
                </label>
              </>
            )}
          </p>
          <span className="dropzone-filetypes">PDF, DOC, DOCX (Max 20 MB)</span>
        </div>

        {/* Title Field */}
        <div className="upload-field-group">
          <label className="upload-field-label">Title</label>
          <input
            type="text"
            className="upload-text-input"
            placeholder="E.g. Machine Learning Unit 2 Notes"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        {/* 2-Column Row 1: Subject & Type */}
        <div className="upload-two-col-row">
          <div className="upload-field-group">
            <label className="upload-field-label">Subject</label>
            <select
              className="upload-select-input"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            >
              <option value="Machine Learning">Machine Learning</option>
              <option value="DBMS">DBMS</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="Engineering Maths">Engineering Maths</option>
            </select>
          </div>

          <div className="upload-field-group">
            <label className="upload-field-label">Type</label>
            <select
              className="upload-select-input"
              value={formData.resourceType}
              onChange={(e) => setFormData(prev => ({ ...prev, resourceType: e.target.value }))}
            >
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="PYQ">PYQ</option>
              <option value="Revision Guide">Revision Guide</option>
              <option value="Handwritten">Handwritten Notes</option>
              <option value="Formulas">Formulas & Cheatsheet</option>
            </select>
          </div>
        </div>

        {/* 2-Column Row 2: Academic Year & Unit / Topic */}
        <div className="upload-two-col-row">
          <div className="upload-field-group">
            <label className="upload-field-label">Academic Year</label>
            <select
              className="upload-select-input"
              value={formData.academicYear}
              onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="upload-field-group">
            <label className="upload-field-label">Unit / Topic</label>
            <input
              type="text"
              className="upload-text-input"
              placeholder="E.g. Unit 2"
              value={formData.unitOrTopic}
              onChange={(e) => setFormData(prev => ({ ...prev, unitOrTopic: e.target.value }))}
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="upload-field-group">
          <label className="upload-field-label">Description</label>
          <textarea
            className="upload-textarea-input"
            rows={3}
            placeholder="Add a short description..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        {/* Bottom Full-Width Green CTA Button */}
        <div className="upload-footer-cta-wrap">
          <button type="submit" className="btn-upload-submit">
            Upload Notes
          </button>
        </div>
      </form>
    </div>
  );
};
