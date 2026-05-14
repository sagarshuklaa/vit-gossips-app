'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
type Post = {
  id: string
  title: string
  body: string
  vote_score: number
  comment_count: number
  is_anonymous: boolean
  created_at: string
  flair: string
  media_url: string | null
  media_type: string | null
  boards: { name: string; slug: string }
}
export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'hot' | 'new' | 'top'>('hot')
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [search, setSearch] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>(['mess food', 'placement', 'exam cancel', 'prof reviews'])
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetchPosts()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [tab])
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])
  const fetchPosts = async () => {
    setLoading(true)
    let query = supabase.from('posts').select('*, boards(name, slug)')
    if (tab === 'new') query = query.order('created_at', { ascending: false })
    if (tab === 'top') query = query.order('vote_score', { ascending: false })
    if (tab === 'hot') query = query.order('vote_score', { ascending: false }).order('created_at', { ascending: false })
    const { data } = await query.limit(50)
    setPosts(data || [])
    setLoading(false)
  }
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      setRecentSearches(prev => [search.trim(), ...prev.filter(s => s !== search.trim())].slice(0, 5))
    }
  }
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMenuOpen(false)
  }
  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }
  const bg = dark ? '#0a0a0f' : '#f8f7ff'
  const card = dark ? '#111120' : '#ffffff'
  const text = dark ? '#f1f5f9' : '#111111'
  const muted = dark ? '#6b7280' : '#9ca3af'
  const border = dark ? '#1e1e3a' : '#e5e7eb'
  const sidebar = dark ? '#0d0d1a' : '#fafafa'
  const filteredPosts = posts.filter(p => search ? p.title.toLowerCase().includes(search.toLowerCase()) : true)
  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '34px', height: '34px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>☰</button>
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'white', letterSpacing: '-0.5px' }}>VIT <span style={{ color: '#fbbf24' }}>Gossips</span> 🔥</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '6px 14px', color: 'white', fontSize: '13px', outline: 'none', width: '130px' }} />
          <a href="/create" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>+ spill</a>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '34px', height: '34px', borderRadius: '8px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⋮</button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: '42px', background: card, border: `1px solid ${border}`, borderRadius: '14px', padding: '8px', minWidth: '200px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                {user ? (
                  <>
                    <div style={{ padding: '10px 12px', borderBottom: `1px solid ${border}`, marginBottom: '4px' }}>
                      <p style={{ color: text, fontSize: '13px', fontWeight: 600, margin: 0 }}>👤 {user.email?.split('@')[0]}</p>
                      <p style={{ color: muted, fontSize: '11px', margin: '2px 0 0' }}>{user.email}</p>
                    </div>
                    <button onClick={() => { router.push('/profile'); setMenuOpen(false) }} style={{ width: '100%', background: 'none', border: 'none', color: text, padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>👤 My Profile</button>
                    <button onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', color: '#f87171', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>🚪 Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { router.push('/auth'); setMenuOpen(false) }} style={{ width: '100%', background: 'none', border: 'none', color: text, padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>👤 Login</button>
                    <button onClick={() => { router.push('/auth'); setMenuOpen(false) }} style={{ width: '100%', background: 'none', border: 'none', color: text, padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>✨ Sign Up</button>
                  </>
                )}
                <div style={{ height: '1px', background: border, margin: '4px 0' }} />
                <button onClick={() => { setDark(!dark); setMenuOpen(false) }} style={{ width: '100%', background: 'none', border: 'none', color: text, padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>
                  {dark ? '☀️ Light mode' : '🌙 Dark mode'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto' }}>
        {sidebarOpen && (
          <div style={{ width: '220px', background: sidebar, borderRight: `1px solid ${border}`, minHeight: 'calc(100vh - 56px)', padding: '16px', flexShrink: 0, position: 'sticky', top: '56px', height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px' }}>Navigate</p>
              {[
                { icon: '🏠', label: 'Home', action: () => { setTab('hot'); setSidebarOpen(false) } },
                { icon: '🔥', label: 'Popular', action: () => { setTab('top'); setSidebarOpen(false) } },
                { icon: '✨', label: 'New', action: () => { setTab('new'); setSidebarOpen(false) } },
              ].map(item => (
                <button key={item.label} onClick={item.action} style={{ width: '100%', background: 'none', border: 'none', color: text, padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                  <span>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px' }}>🕐 Recent Searches</p>
              {recentSearches.map(s => (
                <div key={s} onClick={() => setSearch(s)} style={{ padding: '8px 12px', color: muted, fontSize: '13px', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>🔍 {s}</div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: '16px' }}>
              <p style={{ fontSize: '11px', color: muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px' }}>Resources</p>
              {[
                { label: '📖 About VIT Gossips', path: '/about' },
                { label: '📜 Rules', path: '/rules' },
                { label: '📋 User Agreement', path: '/agreement' },
              ].map(item => (
                <button key={item.label} onClick={() => router.push(item.path)} style={{ width: '100%', background: 'none', border: 'none', color: muted, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '13px' }}>
                  {item.label}
                </button>
              ))}
              <div style={{ marginTop: '12px', padding: '10px 12px', background: dark ? '#1a1a2e' : '#fef3c7', borderRadius: '10px', fontSize: '11px', color: dark ? '#fbbf24' : '#92400e', lineHeight: 1.6 }}>
                ⚠️ Not a personal chat. All posts are public. Don't share private info.
              </div>
            </div>
          </div>
        )}
        <div style={{ flex: 1, padding: '16px', maxWidth: '680px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {(['hot', 'new', 'top'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === t ? '#7C3AED' : card, color: tab === t ? 'white' : muted }}>
                {t === 'hot' ? '🔥' : t === 'new' ? '✨' : '👑'} {t}
              </button>
            ))}
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: muted, padding: '40px' }}>Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p style={{ textAlign: 'center', color: muted, padding: '40px' }}>No posts found 👀</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredPosts.map(post => (
                <div key={post.id} onClick={() => router.push(`/post/${post.id}`)} style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>r/{post.boards?.slug}</span>
                    {post.is_anonymous && <span style={{ background: 'rgba(236,72,153,0.12)', color: '#EC4899', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>👤 VITian</span>}
                    {post.flair && <span style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>{post.flair}</span>}
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: muted }}>{timeAgo(post.created_at)}</span>
                  </div>
                  <h2 style={{ fontWeight: 700, fontSize: '15px', color: text, marginBottom: '6px', lineHeight: 1.4 }}>{post.title}</h2>
                  {post.body && <p style={{ fontSize: '13px', color: muted, marginBottom: '8px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as any}>{post.body}</p>}
                  {post.media_url && post.media_type === 'image' && <img src={post.media_url} alt="media" style={{ width: '100%', borderRadius: '10px', maxHeight: '200px', objectFit: 'cover', marginBottom: '8px' }} />}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <span style={{ background: dark ? '#1a1a2e' : '#f3f4f6', color: '#7C3AED', fontSize: '12px', fontWeight: 600, padding: '5px 10px', borderRadius: '20px' }}>▲ {post.vote_score}</span>
                    <span style={{ background: dark ? '#1a1a2e' : '#f3f4f6', color: muted, fontSize: '12px', padding: '5px 10px', borderRadius: '20px' }}>💬 {post.comment_count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
