import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

const getAnimeDetails = async (id) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) throw new Error("Failed to fetch anime details");
  const data = await res.json();
  return data.data;
};

const AnimeDetailPage = async ({ params }) => {
  const anime = await getAnimeDetails(params.id);

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
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                  📥 Watch Later
                </button>
                <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition duration-200">
                  ✅ Already Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnimeDetailPage;
