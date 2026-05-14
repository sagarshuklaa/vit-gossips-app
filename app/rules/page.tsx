'use client'
import { useRouter } from 'next/navigation'
export default function RulesPage() {
  const router = useRouter()
  const rules = [
    { num: '1', title: 'VIT Students Only', body: 'Only verified VIT email holders can post. No outsiders, no fake accounts.' },
    { num: '2', title: 'No Personal Attacks', body: 'Roast the situation, not the person. Targeting individuals with hate, threats, or harassment will result in immediate ban.' },
    { num: '3', title: 'No Private Information', body: 'Do not share phone numbers, home addresses, or any private data of any person — including yourself.' },
    { num: '4', title: 'No Fake News', body: 'Do not spread misinformation about VIT, professors, or students. If you are not sure, do not post it.' },
    { num: '5', title: 'Keep it VIT Related', body: 'Posts must be relevant to VIT student life. Off-topic spam will be removed.' },
    { num: '6', title: 'No NSFW Content', body: 'No explicit, sexual, or graphic content of any kind.' },
    { num: '7', title: 'Respect Anonymity', body: 'Do not attempt to reveal or guess the identity of anonymous posters.' },
    { num: '8', title: 'No Self Promotion', body: 'No ads, referral links, or promotional content without moderator approval.' },
  ]
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => router.push('/feed')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Back</button>
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>Community Rules</span>
      </div>
      <div style={{ maxWidth: '600px', margin: '32px auto', padding: '0 16px' }}>
        <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📜</div>
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '22px', marginBottom: '4px' }}>VIT Gossips Rules</h1>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Breaking these rules = permanent ban. No appeals.</p>
          </div>
          {rules.map(rule => (
            <div key={rule.num} style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '16px', background: '#0a0a0f', borderRadius: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{rule.num}</div>
              <div>
                <h3 style={{ color: '#a78bfa', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{rule.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{rule.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
