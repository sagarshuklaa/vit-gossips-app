import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-2">VIT Gossips</h1>
        <p className="text-gray-500 mb-8">The Reddit for VIT students. Anonymous. Unfiltered.</p>
        <Link
          href="/auth"
          className="block w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Login with VIT Email
        </Link>
      </div>
    </div>
  )
}