'use client'
import { useRouter } from 'next/navigation'
export default function AgreementPage() {
  const router = useRouter()
  const sections = [
    { title: '1. Acceptance of Terms', body: 'By accessing VIT Gossips, you agree to be bound by these terms. If you do not agree, do not use this platform.' },
    { title: '2. Eligibility', body: 'You must be a current VIT student with a valid VIT email address to create an account and post content.' },
    { title: '3. User Content', body: 'You are solely responsible for all content you post. VIT Gossips does not verify the accuracy of user posts. We reserve the right to remove any content that violates our rules.' },
    { title: '4. Anonymity & Privacy', body: 'While anonymous posting is supported, your email address is stored securely. We will never sell your data to third parties.' },
    { title: '5. Prohibited Content', body: 'You may not post content that is defamatory, harassing, threatening, obscene, or violates any applicable law.' },
    { title: '6. Disclaimer', body: 'VIT Gossips is a student-run independent platform. It is not affiliated with, endorsed by, or connected to VIT University in any way.' },
    { title: '7. Limitation of Liability', body: 'VIT Gossips is provided as-is. We are not liable for any damages arising from your use of this platform or content posted by users.' },
    { title: '8. Changes to Terms', body: 'We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the new terms.' },
    { title: '9. Contact', body: 'For any concerns or reports, post in the r/vit-gossip board and tag it as "report".' },
  ]
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => router.push('/feed')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Back</button>
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>User Agreement</span>
      </div>
      <div style={{ maxWidth: '600px', margin: '32px auto', padding: '0 16px 40px' }}>
        <div style={{ background: '#111120', border: '1px solid #1e1e3a', borderRadius: '20px', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📋</div>
            <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '22px', marginBottom: '4px' }}>User Agreement</h1>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>Last updated: May 2026</p>
          </div>
          {sections.map(section => (
            <div key={section.title} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #1e1e3a' }}>
              <h3 style={{ color: '#a78bfa', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{section.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{section.body}</p>
            </div>
          ))}
          <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>⚠️ <strong>Important:</strong> VIT Gossips is NOT a personal chat platform. Do not use it to send private messages or share sensitive personal information. All posts are visible to all VIT students.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
