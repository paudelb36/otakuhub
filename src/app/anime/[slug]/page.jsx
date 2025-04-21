"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

const AnimeDetailPage = () => {
  const [anime, setAnime] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const id = slug.split("-")[0];
  // Fetch anime details
  const fetchAnime = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    } catch (err) {
      console.error("Failed to fetch anime", err);
    } finally {
      setLoading(false);
    }
  };

  // Check for logged in user
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user || null);
  };

  useEffect(() => {
    checkUser();
    fetchAnime();
  }, []);

  // Save to list
  const handleSave = async (status) => {
    if (!user) {
      alert("⚠️ Please log in to save anime to your list.");
      return;
    }

    if (!anime) return;

    try {
      // Optional: prevent duplicate
      const { data: existing, error: fetchError } = await supabase
        .from("anime_lists")
        .select("*")
        .eq("user_id", user.id)
        .eq("anime_id", anime.mal_id)
        .single();

      if (existing) {
        alert("⚠️ This anime is already in your list!");
        return;
      }

      const { error } = await supabase.from("anime_lists").insert([
        {
          user_id: user.id,
          anime_id: anime.mal_id,
          title: anime.title,
          image_url: anime.images.webp.large_image_url,
          status: status,
        },
      ]);

      if (error) {
        console.error("Insert Error:", error);
        alert("❌ Failed to save anime. Check console.");
      } else {
        alert(
          `✅ Anime marked as ${
            status === "watch_later" ? "Watch Later" : "Watched"
          }!`
        );
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("❌ Something went wrong.");
    }
  };

  if (loading || !anime) return <p className="p-10">Loading...</p>;

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
                <p>
                  <strong>📺 Episodes:</strong> {anime.episodes}
                </p>
                <p>
                  <strong>📌 Status:</strong> {anime.status}
                </p>
                <p>
                  <strong>🎯 Rating:</strong> {anime.rating}
                </p>
                <p>
                  <strong>🎭 Genres:</strong>{" "}
                  {anime.genres.map((g) => g.name).join(", ")}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleSave("watch_later")}
                >
                  📥 Watch Later
                </button>
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => handleSave("watched")}
                >
                  ✅ Already Watched
                </button>
              </div>

              {!user && (
                <p className="text-red-600 mt-4 text-sm italic">
                  * You must be logged in to save anime to your list.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnimeDetailPage;
