'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Patient } from '@/app/admin/types';

type UploadResult = {
  url: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
};

const isAcceptedMimeType = (mimeType: string) => {
  if (!mimeType) return false;
  if (mimeType === 'application/pdf') return true;
  return mimeType.startsWith('image/');
};

export default function UploadDocumentModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.classList.add('lenis-stopped');

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.classList.remove('lenis-stopped');
    };
  }, []);

  const subtitle = useMemo(() => {
    return `Upload a PDF or image for ${patient.name}`;
  }, [patient.name]);

  const handleFileChange = (file: File | null) => {
    setError(null);
    setResult(null);
    setSelectedFile(null);

    if (!file) return;

    if (!isAcceptedMimeType(file.type)) {
      setError('Only PDF and image files are allowed.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append('file', selectedFile);

      const response = await fetch(`/api/admin/patients/${encodeURIComponent(patient.id)}/documents`, {
        method: 'POST',
        body: form,
      });

      const payload = (await response.json()) as UploadResult | { error?: string };

      if (!response.ok) {
        const message = 'error' in payload && payload.error ? payload.error : 'Upload failed.';
        setError(message);
        return;
      }

      setResult(payload as UploadResult);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
      <div data-lenis-prevent className="w-full max-w-xl bg-white rounded-4xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Upload Document</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{patient.name}</h2>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <span className="sr-only">Close upload</span>
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div data-lenis-prevent className="px-8 py-7 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/*"
              onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-xs file:font-black file:uppercase file:tracking-widest file:text-white hover:file:bg-slate-800"
            />

            {selectedFile && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900 break-all">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedFile.type || 'unknown type'} · {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setError(null);
                    setResult(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-3xl border border-teal-200 bg-teal-50 px-5 py-4">
              <p className="text-sm font-black text-teal-800">Upload successful</p>
              <p className="text-xs text-teal-700 mt-1 break-all">{result.originalName}</p>
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-3 text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                View uploaded file
              </a>
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 disabled:opacity-60 disabled:hover:bg-slate-900"
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
