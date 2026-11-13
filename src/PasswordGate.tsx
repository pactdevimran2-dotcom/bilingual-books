import React, { useState } from 'react';

// NOTE: This is a lightweight gate to keep casual visitors out. It is NOT
// real security — the password lives in the client bundle and can be bypassed
// by anyone who opens DevTools. Do not store secrets you truly need protected.
const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD ?? 'changeme';
const UNLOCK_KEY = 'personal_journal_unlocked';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => sessionStorage.getItem(UNLOCK_KEY) === 'yes'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === APP_PASSWORD) {
      sessionStorage.setItem(UNLOCK_KEY, 'yes');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm w-full max-w-sm space-y-4"
      >
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Personal Journal</h1>
          <p className="text-xs text-slate-500">Enter your password to continue</p>
        </div>
        <input
          type="password"
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        {error && (
          <p className="text-xs text-red-600">Incorrect password. Try again.</p>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
