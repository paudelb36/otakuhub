'use client'

import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

const AnimeDetailPage = () => {
  const [anime, setAnime] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = useParams()

  // Fetch Anime
  const fetchAnime = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    const data = await res.json()
    setAnime(data.data)
    setLoading(false)
  }

  // Check auth
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) router.push("/login")
    else setUser(user)
  }

  useEffect(() => {
    checkUser()
    fetchAnime()
  }, [])

  // Add to Supabase
  const handleSave = async (status) => {
    if (!user || !anime) return

    const { error } = await supabase.from("anime_lists").insert([
      {
        user_id: user.id,
        anime_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.webp.large_image_url,
        status: status,
      }
    ])

    if (error) {
      console.error(error)
      alert("Failed to save.")
    } else {
      alert(`Anime marked as ${status === 'watch_later' ? 'Watch Later' : 'Watched'}!`)
    }
  }

  if (loading || !anime) return <p className="p-10">Loading...</p>

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-purple-500 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg shadow-purple-300">
            <div className="w-full h-auto">
              <Image
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                width={400}
                height={600}
                className="rounded-xl object-cover w-full"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
                <p className="text-gray-700 mb-4">{anime.synopsis}</p>
              </div>

              <div className="space-y-2 mt-4">
                <p><strong>📺 Episodes:</strong> {anime.episodes}</p>
                <p><strong>📌 Status:</strong> {anime.status}</p>
                <p><strong>🎯 Rating:</strong> {anime.rating}</p>
                <p><strong>🎭 Genres:</strong> {anime.genres.map((g) => g.name).join(", ")}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleSave('watch_later')}
                >
                  📥 Watch Later
                </button>
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => handleSave('watched')}
                >
                  ✅ Already Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AnimeDetailPage
