'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Board = {
  id: string
  name: string
  slug: string
  description: string
}

export default function CreatePost() {
  const router = useRouter()
  const [boards, setBoards] = useState<Board[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [boardId, setBoardId] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<string>('')

  useEffect(() => {
    supabase.from('boards').select('*').then(({ data }) => {
      setBoards(data || [])
      if (data && data.length > 0) setBoardId(data[0].id)
    })
  }, [])

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Max 50MB.')
      return
    }
    setMediaFile(file)
    setMediaType(file.type.startsWith('video') ? 'video' : 'image')
    setMediaPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!title.trim()) return setError('Title is required')
    if (!boardId) return setError('Select a board')
    setLoading(true)
    setError('')

    let mediaUrl = null

    if (mediaFile) {
      const fileName = `${Date.now()}-${mediaFile.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('posts-media')
        .upload(fileName, mediaFile)

      if (uploadError) {
        setError('Media upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('posts-media')
        .getPublicUrl(fileName)

      mediaUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('posts').insert({
      title: title.trim(),
      body: body.trim(),
      board_id: boardId,
      is_anonymous: isAnonymous,
      author_id: null,
      media_url: mediaUrl,
      media_type: mediaType || null,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/feed')
    }
    setLoading(false)
  }

  const selectedBoard = boards.find(b => b.id === boardId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => router.push('/feed')} className="text-white hover:text-purple-200 transition text-sm">← Back</button>
        <h1 className="text-lg font-bold">Create Post</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Post to</label>
          <select
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            style={{ color: '#111111', backgroundColor: '#ffffff', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', border: '1px solid #e5e7eb' }}
          >
            {boards.map(b => (
              <option key={b.id} value={b.id}>r/{b.slug} — {b.name}</option>
            ))}
          </select>
          {selectedBoard && <p className="text-xs text-gray-400 mt-2 pl-1">{selectedBoard.description}</p>}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Title *</label>
            <input
              type="text"
              placeholder="Make it spicy, make it count..."
              value={title}
              maxLength={200}
              onChange={(e) => setTitle(e.target.value)}
              style={{ color: '#111111' }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            />
            <p className="text-xs text-gray-300 mt-1 text-right">{title.length}/200</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Body <span className="text-gray-300 font-normal">(optional)</span></label>
            <textarea
              placeholder="Share the details... or keep it mysterious."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              style={{ color: '#111111' }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <label className="block text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Photo / Video</label>
          {mediaPreview ? (
            <div className="relative">
              {mediaType === 'video' ? (
                <video src={mediaPreview} controls className="w-full rounded-lg max-h-64 object-cover" />
              ) : (
                <img src={mediaPreview} alt="preview" className="w-full rounded-lg max-h-64 object-cover" />
              )}
              <button
                onClick={() => { setMediaFile(null); setMediaPreview(null); setMediaType('') }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >✕</button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-purple-300 transition">
              <span className="text-2xl mb-2">📸</span>
              <span className="text-sm text-gray-500">Click to upload photo or video</span>
              <span className="text-xs text-gray-300 mt-1">Max 50MB</span>
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="hidden" />
            </label>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-gray-800">Post anonymously</p>
              <p className="text-xs text-gray-400 mt-0.5">Your name shows as "VITian"</p>
            </div>
            <div onClick={() => setIsAnonymous(!isAnonymous)} className={`relative w-12 h-6 rounded-full transition-colors ${isAnonymous ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isAnonymous ? 'translate-x-7' : 'translate-x-1'}`} />
            </div>
          </label>
        </div>

        {title && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-xs text-purple-400 mb-1 uppercase tracking-wide font-medium">Preview</p>
            <p className="text-sm font-medium text-gray-800">{title}</p>
            <p className="text-xs text-purple-500 mt-1">{isAnonymous ? 'VITian' : 'you'} · r/{selectedBoard?.slug}</p>
          </div>
        )}

        {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"><p className="text-red-600 text-sm">{error}</p></div>}

        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
          className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-medium hover:bg-purple-700 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {loading ? 'Posting...' : '🔥 Post it'}
        </button>

        <p className="text-xs text-center text-gray-300">Be respectful. No personal attacks. Keep it VIT.</p>
      </div>
    </div>
  )
}
