import { useState, type FormEvent, type ReactNode } from 'react';
import { supabase } from './supabase';

export type Item = Record<string, unknown>;

const hiddenKeys = ['id', 'accent'];
const longKeys = ['description', 'detail', 'tagline', 'aboutText'];
const fieldClass =
  'w-full rounded-xl border border-[#101114]/15 bg-white/70 px-3 py-2.5 text-sm outline-none focus:border-[#ff6b35]';

const toLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

async function uploadImage(file: File) {
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, '_')}`;
  const bucket = supabase!.storage.from('portfolio');
  const { error } = await bucket.upload(path, file);
  if (error) throw error;
  return bucket.getPublicUrl(path).data.publicUrl;
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101114]/50 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-label={title} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-[#eef0f2] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-[-.04em]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full px-3 py-1 text-xl hover:bg-[#101114]/10">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return setError('Supabase is not configured. Fill in .env first.');
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
    else onClose();
  };

  return (
    <Modal title="Admin login" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">
          Email
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${fieldClass} mt-1.5`} />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${fieldClass} mt-1.5`} />
        </label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-[#101114] px-6 py-3 text-sm font-bold text-[#eef0f2] disabled:opacity-50">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </Modal>
  );
}

// Renders a form from the item's own shape: strings, string lists (one per line), booleans and images.
export function EditModal({ title, value, onSave, onClose }: { title: string; value: Item; onSave: (item: Item) => Promise<void>; onClose: () => void }) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (key: string, v: unknown) => setDraft((d) => ({ ...d, [key]: v }));

  const upload = async (key: string, files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError('');
    try {
      const urls = await Promise.all([...files].map(uploadImage));
      setDraft((d) => ({ ...d, [key]: Array.isArray(d[key]) ? [...(d[key] as string[]), ...urls] : urls[0] }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const cleaned = Object.fromEntries(
      Object.entries(draft).map(([k, v]) => [k, Array.isArray(v) ? v.map((s: string) => s.trim()).filter(Boolean) : v]),
    );
    try {
      await onSave(cleaned);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        {Object.entries(draft)
          .filter(([key]) => !hiddenKeys.includes(key))
          .map(([key, v]) => {
            const label = toLabel(key);
            if (key === 'image' || key === 'photo' || key === 'images') {
              const urls = (Array.isArray(v) ? v : v ? [v] : []) as string[];
              return (
                <fieldset key={key} className="text-sm font-semibold">
                  <legend>{label}</legend>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {urls.map((url) => (
                      <div key={url} className="relative">
                        <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                        <button
                          type="button"
                          aria-label="Remove image"
                          onClick={() => set(key, Array.isArray(v) ? urls.filter((u) => u !== url) : '')}
                          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-[#101114] text-xs text-[#eef0f2]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <input type="file" accept="image/*" multiple={Array.isArray(v)} disabled={busy} onChange={(e) => upload(key, e.target.files)} className="mt-2 block text-xs font-normal" />
                </fieldset>
              );
            }
            if (typeof v === 'boolean') {
              return (
                <label key={key} className="flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={v} onChange={(e) => set(key, e.target.checked)} />
                  {label}
                </label>
              );
            }
            if (Array.isArray(v)) {
              return (
                <label key={key} className="block text-sm font-semibold">
                  {label} <span className="font-normal text-[#101114]/45">(one per line)</span>
                  <textarea rows={4} value={v.join('\n')} onChange={(e) => set(key, e.target.value.split('\n'))} className={`${fieldClass} mt-1.5`} />
                </label>
              );
            }
            return (
              <label key={key} className="block text-sm font-semibold">
                {label}
                {longKeys.includes(key) ? (
                  <textarea rows={4} value={String(v)} onChange={(e) => set(key, e.target.value)} className={`${fieldClass} mt-1.5`} />
                ) : (
                  <input value={String(v)} onChange={(e) => set(key, e.target.value)} className={`${fieldClass} mt-1.5`} />
                )}
              </label>
            );
          })}
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-full border border-[#101114]/15 px-5 py-3 text-sm font-bold">
            Cancel
          </button>
          <button type="submit" disabled={busy} className="rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-bold disabled:opacity-50">
            {busy ? 'Saving…' : 'Post'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

const pill = 'rounded-full bg-[#101114] px-3 py-1.5 text-xs font-bold text-[#eef0f2] shadow-lg transition hover:bg-[#ff6b35] hover:text-[#101114]';

export function ItemActions({ onEdit, onDelete }: { onEdit: () => void; onDelete?: () => void }) {
  return (
    <div className="absolute right-3 top-3 z-20 flex gap-2">
      <button type="button" onClick={onEdit} className={pill}>Edit</button>
      {onDelete && (
        <button type="button" onClick={() => window.confirm('Delete this item?') && onDelete()} className={pill}>
          Delete
        </button>
      )}
    </div>
  );
}

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mx-auto mt-6 flex rounded-full border-2 border-dashed border-[#101114]/25 px-6 py-3 text-sm font-bold hover:border-[#ff6b35]">
      + Add new
    </button>
  );
}
