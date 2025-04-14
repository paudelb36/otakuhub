// app/anime/[id]/page.jsx
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <Image
        src={anime.images.webp.large_image_url}
        alt={anime.title}
        width={400}
        height={600}
        className="rounded shadow-lg mb-6"
      />
      <p className="text-gray-700 mb-4">{anime.synopsis}</p>
      <p>
        <strong>Episodes:</strong> {anime.episodes}
      </p>
      <p>
        <strong>Status:</strong> {anime.status}
      </p>
      <p>
        <strong>Rating:</strong> {anime.rating}
      </p>
      <p>
        <strong>Genres:</strong> {anime.genres.map((g) => g.name).join(", ")}
      </p>
    </div>
  );
};

export default AnimeDetailPage;
