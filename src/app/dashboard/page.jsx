'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

export default function Dashboard() {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      setUser(user)

      const { data, error } = await supabase
        .from('anime_lists')
        .select('*')
        .eq('user_id', user.id)

      if (error) console.error('Error loading list:', error)
      else setAnimeList(data)

      setLoading(false)
    }
    init()
  }, [router])

  const removeItem = async (rowId) => {
    const { error } = await supabase
      .from('anime_lists')
      .delete()
      .eq('id', rowId)

    if (error) console.error('Remove error:', error)
    else setAnimeList(animeList.filter(item => item.id !== rowId))
  }

  const moveItem = async (rowId, newStatus) => {
    const { error } = await supabase
      .from('anime_lists')
      .update({ status: newStatus })
      .eq('id', rowId)

    if (error) console.error('Update error:', error)
    else setAnimeList(animeList.map(item =>
      item.id === rowId ? { ...item, status: newStatus } : item
    ))
  }

  if (loading) return <p className="p-10 text-center">Loading…</p>

  const watchLater = animeList.filter(a => a.status === 'watch_later')
  const watched    = animeList.filter(a => a.status === 'watched')

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-purple-500 to-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-3xl font-bold mb-6">Your Anime Lists</h1>

          {/* Watch Later Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">📥 Watch Later</h2>
            {watchLater.length === 0
              ? <p className="text-gray-700">No anime in this list yet.</p>
              : (
                <div className="grid md:grid-cols-2 gap-6">
                  {watchLater.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex gap-4">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={100}
                          height={140}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{item.title}</h3>
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => moveItem(item.id, 'watched')}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                              ✅ Mark as Watched
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              🗑 Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </section>

          {/* Already Watched Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">✅ Already Watched</h2>
            {watched.length === 0
              ? <p className="text-gray-700">You haven’t marked anything as watched yet.</p>
              : (
                <div className="grid md:grid-cols-2 gap-6">
                  {watched.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex gap-4">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={100}
                          height={140}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{item.title}</h3>
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => moveItem(item.id, 'watch_later')}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              📥 Move to Watch Later
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              🗑 Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
