'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
export default function PostPage() {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id as string
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const dark = true
  useEffect(() => {
    if (!id) return
    fetchPost()
    fetchComments()
    supabase.auth.getUser().then(({ data: { user } }) => setCurrentUser(user))
  }, [id])
  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select('*, boards(name, slug)').eq('id', id).single()
    if (data) setPost(data)
    setLoading(false)
  }
  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: true })
    setComments(data || [])
  }
  const handleDeletePost = async () => {
    if (!confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', id)
    router.push('/feed')
  }
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return
    await supabase.from('comments').delete().eq('id', commentId)
    fetchComments()
  }
  const handleComment = async () => {
    if (!newComment.trim()) return
    setPosting(true)
    await supabase.from('comments').insert({ post_id: id, body: newComment.trim(), is_anonymous: isAnonymous, author_id: currentUser?.id || null })
    setNewComment('')
    fetchComments()
    setPosting(false)
  }
  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }
  const bg = '#0a0a0f'
  const card = '#111120'
  const text = '#f1f5f9'
  const muted = '#6b7280'
  const border = '#1e1e3a'
  if (loading) return <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: muted }}>Loading...</p></div>
  if (!post) return <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: muted }}>Post not found.</p></div>
  const isPostOwner = true
  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => router.push('/feed')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Back</button>
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>VIT <span style={{ color: '#fbbf24' }}>Gossips</span> 🔥</span>
      </div>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>r/{post.boards?.slug}</span>
            {post.is_anonymous && <span style={{ background: 'rgba(236,72,153,0.12)', color: '#EC4899', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>👤 VITian</span>}
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: muted }}>{timeAgo(post.created_at)}</span>
            {isPostOwner && (
              <button onClick={handleDeletePost} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>🗑️ Delete</button>
            )}
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '20px', color: text, marginBottom: '10px', lineHeight: 1.4 }}>{post.title}</h1>
          {post.body && <p style={{ fontSize: '14px', color: muted, lineHeight: 1.7, marginBottom: '12px' }}>{post.body}</p>}
          {post.media_url && post.media_type === 'image' && <img src={post.media_url} alt="media" style={{ width: '100%', borderRadius: '12px', maxHeight: '400px', objectFit: 'cover', marginBottom: '12px' }} />}
          {post.media_url && post.media_type === 'video' && <video src={post.media_url} controls style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }} />}
          <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: `1px solid ${border}` }}>
            <span style={{ background: '#1a1a2e', color: '#7C3AED', fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '20px' }}>▲ {post.vote_score}</span>
            <span style={{ background: '#1a1a2e', color: muted, fontSize: '12px', padding: '6px 12px', borderRadius: '20px' }}>💬 {comments.length} comments</span>
          </div>
        </div>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ color: text, fontWeight: 600, fontSize: '14px', margin: 0 }}>Leave a comment</p>
          <textarea placeholder="What do you think? 👀" value={newComment} onChange={e => setNewComment(e.target.value)} rows={3} style={{ background: '#0a0a0f', border: `1px solid ${border}`, borderRadius: '12px', padding: '12px', color: text, fontSize: '14px', resize: 'none', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} style={{ accentColor: '#7C3AED', width: '16px', height: '16px' }} />
              <span style={{ color: muted, fontSize: '13px' }}>Anonymous</span>
            </label>
            <button onClick={handleComment} disabled={posting || !newComment.trim()} style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', border: 'none', borderRadius: '10px', padding: '8px 18px', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', opacity: posting || !newComment.trim() ? 0.5 : 1 }}>
              {posting ? 'Posting...' : 'Comment'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {comments.length === 0 ? (
            <p style={{ textAlign: 'center', color: muted, padding: '24px', fontSize: '14px' }}>No comments yet. Start the conversation! 👀</p>
          ) : comments.map(c => (
            <div key={c.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '14px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 600 }}>{c.is_anonymous ? '👤 VITian' : 'User'}</span>
                <span style={{ color: muted, fontSize: '11px' }}>· {timeAgo(c.created_at)}</span>
                {currentUser && c.author_id === currentUser.id && (
                  <button onClick={() => handleDeleteComment(c.id)} style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>🗑️</button>
                )}
              </div>
              <p style={{ color: text, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
