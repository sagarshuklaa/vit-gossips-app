'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
      if (!user) router.push('/auth')
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b7280' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => router.push('/feed')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Back</button>
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>My Profile</span>
      </div>

      <div style={{ maxWidth: '500px', margin: '32px auto', padding: '0 16px' }}>
        <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px' }}>
            👤
          </div>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
            {user?.email?.split('@')[0]}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>{user?.email}</p>

          <div style={{ background: '#0a0a0f', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e1e3a' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Email</span>
              <span style={{ color: '#a78bfa', fontSize: '13px' }}>{user?.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e1e3a' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Joined</span>
              <span style={{ color: '#f1f5f9', fontSize: '13px' }}>{new Date(user?.created_at).toLocaleDateString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Campus</span>
              <span style={{ color: '#f1f5f9', fontSize: '13px' }}>
                {user?.email?.includes('vitbhopal') ? 'VIT Bhopal' :
                 user?.email?.includes('vitchennai') ? 'VIT Chennai' :
                 user?.email?.includes('vitvellore') ? 'VIT Vellore' :
                 user?.email?.includes('vitap') ? 'VIT AP' : 'VIT'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{ width: '100%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  )
}
