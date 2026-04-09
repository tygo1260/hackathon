import { useState, useRef, useCallback } from 'react';

export function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith('image/')) setFile(f);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setFile(f);
    },
    [],
  );

  return (
    <div className="upload-card">
      {/* Hero heading lives inside the card */}
      <h1 className="card-heading">
        See what <em>design books</em> see.
      </h1>

      <p className="card-subtitle">
        Add your website screenshot or URL
      </p>

      {/* Drop zone */}
      <div
        className={`drop-zone${isDragging ? ' dragging' : ''}${file ? ' has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleFileChange}
        />

        {file ? (
          <div className="file-preview">
            <span className="file-check">✓</span>
            <span className="file-name">{file.name}</span>
            <button
              className="file-remove"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <svg className="drop-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="drop-hint">Drop screenshot or click to browse</span>
          </>
        )}
      </div>

      {/* URL input */}
      <div className="url-row">
        <span className="url-or">or</span>
        <div className="url-input-wrapper">
          <input
            className="url-input"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      {/* CTA */}
      <button
        className="cta-button"
        disabled={!file && !url.trim()}
      >
        ⚡ Get Your Audit
      </button>
    </div>
  );
}
