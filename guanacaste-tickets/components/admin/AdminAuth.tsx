'use client';

import { useState, useEffect } from 'react';

const KEY = 'admin_pw';

export function useAdminAuth() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved) { setPassword(saved); setAuthed(true); }
  }, []);

  const login = (pw: string) => {
    sessionStorage.setItem(KEY, pw);
    setPassword(pw);
    setAuthed(true);
  };

  const logout = () => {
    sessionStorage.removeItem(KEY);
    setPassword('');
    setAuthed(false);
  };

  return { password, authed, login, logout };
}

export default function AdminAuth({ children }: { children: (password: string) => React.ReactNode }) {
  const { password, authed, login, logout } = useAdminAuth();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/verify', { method: 'POST', headers: { 'x-admin-password': input } });
    if (res.status === 401) { setError('Wrong password'); return; }
    login(input);
  };

  if (!authed) {
    return (
      <div className="flex items-center justify-center py-24">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm flex flex-col gap-4">
          <h2 className="font-heading font-bold text-xl text-gray-900 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="bg-[#0077B6] text-white font-semibold py-2.5 rounded-md hover:bg-[#005f8e] transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
          Logout
        </button>
      </div>
      {children(password)}
    </div>
  );
}
