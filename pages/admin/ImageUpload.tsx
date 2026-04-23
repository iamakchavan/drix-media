import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspect?: string; // e.g. 'aspect-video' or 'aspect-[3/4]'
  label?: string;
}

/**
 * Dual-mode image input: file upload (local blob preview) + URL paste.
 * When Supabase Storage is connected, swap the uploadByFile handler
 * to upload to the bucket and return the public URL.
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  value, onChange, placeholder = 'https://…', aspect = 'aspect-video', label
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    // TODO: replace with Supabase Storage upload when backend is connected
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clipSm = { clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' };
  const inputCls = "bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-white text-[13px] poppins-regular placeholder:text-white/15 focus:outline-none focus:border-[#AFFF00]/30 focus:bg-white/[0.05] transition-all duration-300 w-full";

  return (
    <div className="flex flex-col gap-2">
      {/* Drop zone / preview */}
      <div
        className={`relative w-full ${aspect} border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden
          ${dragging ? 'border-[#AFFF00]/50 bg-[#AFFF00]/5' : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'}`}
        style={clipSm}
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover opacity-75" onError={e => (e.currentTarget.style.opacity = '0')} />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Change Image</span>
            </div>
            {/* Remove button */}
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onChange(''); }}
              className="absolute top-2 right-2 bg-black/70 text-white/60 hover:text-white p-1.5 transition-colors z-10"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-[10px] text-white/20 uppercase tracking-widest">Click or drag to upload</span>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />

      {/* URL input */}
      <div className="flex gap-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputCls}
          style={clipSm}
          onClick={e => e.stopPropagation()}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="shrink-0 flex items-center gap-1.5 px-3 border border-white/[0.08] text-white/30 hover:text-white/60 hover:border-white/20 transition-all text-[10px] uppercase tracking-widest whitespace-nowrap"
          style={clipSm}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
