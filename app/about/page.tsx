'use client'
import { useRouter } from 'next/navigation'
export default function AboutPage() {
  const router = useRouter()
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => router.push('/feed')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Back</button>
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>About VIT Gossips</span>
      </div>
      <div style={{ maxWidth: '600px', margin: '32px auto', padding: '0 16px' }}>
        <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔥</div>
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '24px', marginBottom: '8px' }}>VIT <span style={{ color: '#fbbf24' }}>Gossips</span></h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>The unfiltered voice of VIT students</p>
          </div>
          {[
            { icon: '👥', title: 'What is VIT Gossips?', body: 'VIT Gossips is an anonymous community platform built exclusively for VIT students. Think of it as Reddit — but only for VIT Vellore, Bhopal, Chennai and AP campuses.' },
            { icon: '🔒', title: 'Who can join?', body: 'Only verified VIT students with official VIT email addresses (@vitbhopal.ac.in, @vitvellore.ac.in, @vitchennai.ac.in, @vitap.ac.in) can sign up.' },
            { icon: '👤', title: 'Anonymity', body: 'You can post and comment anonymously. When anonymous, your name shows as "VITian". Your identity is never revealed to other users.' },
            { icon: '📢', title: 'What can I post?', body: 'Gossip, placement updates, hostel complaints, professor reviews, memes, exam tips, food reviews — anything VIT related!' },
          ].map(item => (
            <div key={item.title} style={{ marginBottom: '20px', padding: '16px', background: '#0a0a0f', borderRadius: '12px' }}>
              <h3 style={{ color: '#a78bfa', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{item.icon} {item.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
          <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '12px', padding: '16px', marginTop: '8px' }}>
            <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>⚠️ <strong>Disclaimer:</strong> VIT Gossips is an independent student platform and is not affiliated with or endorsed by VIT University. Use responsibly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
