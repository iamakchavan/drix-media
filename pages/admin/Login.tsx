import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { supabase } from '../../lib/supabase';

const ADMIN_EMAIL = 'drixbackoffice@gmail.com';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: password,
    });

    if (!authError) {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 selection:bg-[#AFFF00] selection:text-black">

      {/* Background aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(175,255,0,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(9,75,40,0.2) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 85" className="h-[20px] w-auto mb-8">
            <path fill="white" d="M98.4,42.5c0,27-18,39.7-38.6,39.7H2.2V2.8h57.6c20.5,0,38.6,12.7,38.6,39.7ZM78,42.5c0-19.3-10.4-22.6-25.9-22.6h-29.5v45.2h29.5c15.4,0,25.9-3.3,25.9-22.6Z"/>
            <path fill="white" d="M181.3,58.6l14.6,23.6h-24.1l-12.8-21.2h-32.9v21.2h-20.4V2.8h62.4c18,0,30.4,11.5,30.4,29.2s-6.6,22.5-17.2,26.7ZM126.2,43.9h36.3c6.1,0,15.7,0,15.7-11.9s-9.5-12-15.7-12h-36.3v23.9Z"/>
            <path fill="white" d="M225.7,82.2h-20.4V25.5h20.4v56.7Z"/>
            <path fill="white" d="M276.4,42.5L231.7,2.8h28.1l30.4,27.2,30.3-27.2h28.3l-44.7,39.7,44.7,39.7h-28.3l-30.3-27.2-30.4,27.2h-28.1l44.7-39.7Z"/>
            <path fill="#afff00" d="M225.7,19.9l-20.4-17.1h20.4v17.1Z"/>
            <path fill="white" d="M428.3,82.2h-10.2v-27.2l-16.5,27.2h-7.4l-16.5-27.2v27.2h-10.2v-39.7h13.8l16.6,28,16.6-28h13.8v39.7Z"/>
            <path fill="white" d="M443.1,50.6v8.1h31.8v7.4h-31.8v8.1h31.8v8.1h-42v-39.7h42v8.1h-31.8Z"/>
            <path fill="white" d="M526.7,62.4c0,13.5-9,19.9-19.3,19.9h-28.8v-39.7h28.8c10.3,0,19.3,6.4,19.3,19.9ZM516.5,62.4c0-9.6-5.2-11.3-12.9-11.3h-14.8v22.6h14.8c7.7,0,12.9-1.6,12.9-11.3Z"/>
            <path fill="white" d="M540.6,82.2h-10.2v-39.7h10.2v39.7Z"/>
            <path fill="white" d="M582.3,73.8h-23.8l-4.3,8.5h-11.2l20.5-39.7h13.8l20.5,39.7h-11.3l-4.3-8.5ZM578.5,66.2l-8.1-16.1-8.1,16.1h16.2Z"/>
          </svg>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#AFFF00]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#AFFF00] uppercase poppins-regular">Admin Portal</span>
          </div>
          <h1 className="text-[2rem] text-white mona-sans-condensed-medium tracking-tight leading-none">
            Welcome back.
          </h1>
          <p className="text-white/30 text-[13px] poppins-regular mt-2">Enter your password to continue.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full bg-white/[0.03] border px-5 py-4 text-white text-[14px] poppins-regular placeholder:text-white/20 focus:outline-none transition-all duration-300 pr-12
                ${error ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-[#AFFF00]/40 focus:bg-white/[0.05]'}`}
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
            >
              {showPassword
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400/80 text-[12px] poppins-regular flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-red-400/80 rounded-full"></span>
                Incorrect password. Try again.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading || !password}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center justify-center gap-3 bg-[#AFFF00] text-black h-[52px] text-[12px] tracking-[0.25em] uppercase poppins-regular font-bold transition-all duration-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            ) : (
              <>
                Enter Dashboard
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </>
            )}
          </motion.button>
        </form>

        <p className="text-white/10 text-[10px] poppins-regular text-center mt-8 tracking-widest uppercase">
          Drix Media © {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
