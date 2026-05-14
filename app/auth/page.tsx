'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [campus, setCampus] = useState('Vellore')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const vitEmails = ['@vitbhopal.ac.in', '@vitchennai.ac.in', '@vitvellore.ac.in', '@vitap.ac.in']
  const isVitEmail = (email: string) => vitEmails.some(domain => email.endsWith(domain))

  const handleSubmit = async () => {
    setError('')
    if (!email) return setError('Email is required')
    if (!isVitEmail(email)) return setError('Only VIT email addresses allowed')
    if (mode === 'signup' && !username.trim()) return setError('Username is required')
    setLoading(true)

    if (mode === 'signup') {
      localStorage.setItem('vg_signup_username', username.trim())
      localStorage.setItem('vg_signup_campus', campus)
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/feed` }
    })

    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
        <h2 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '8px' }}>Check your email</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Magic link sent to <strong style={{ color: '#a78bfa' }}>{email}</strong></p>
        <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '8px' }}>Click the link to log in ✨</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '32px', maxWidth: '400px', width: '90%' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontWeight: 800, fontSize: '24px', color: 'white', marginBottom: '4px' }}>
            VIT <span style={{ color: '#fbbf24' }}>Gossips</span> 🔥
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>The unfiltered voice of VIT</p>
        </div>

        <div style={{ display: 'flex', background: '#0a0a0f', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', background: mode === m ? '#7C3AED' : 'transparent', color: mode === m ? 'white' : '#6b7280', textTransform: 'capitalize' }}>
              {m === 'login' ? '👤 Login' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="yourname@vitstudent.ac.in"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ background: '#0a0a0f', border: '1px solid #1e1e3a', borderRadius: '12px', padding: '12px 16px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />

          {mode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                style={{ background: '#0a0a0f', border: '1px solid #1e1e3a', borderRadius: '12px', padding: '12px 16px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
              <select
                value={campus}
                onChange={e => setCampus(e.target.value)}
                style={{ background: '#0a0a0f', border: '1px solid #1e1e3a', borderRadius: '12px', padding: '12px 16px', color: '#f1f5f9', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              >
                <option value="Vellore">VIT Vellore</option>
                <option value="Bhopal">VIT Bhopal</option>
                <option value="Chennai">VIT Chennai</option>
              </select>
            </>
          )}

          {error && <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Sending...' : mode === 'login' ? '🚀 Send Magic Link' : '✨ Create Account'}
          </button>

          <p style={{ color: '#4b5563', fontSize: '12px', textAlign: 'center', lineHeight: 1.5 }}>
            Only VIT email addresses allowed
          </p>
        </div>
      </div>
    </div>
  )
}
