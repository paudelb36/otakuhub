"use client";

import Image from "next/image";
import Link from "next/link";

const AnimeCard = ({ anime }) => {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src={anime.images.webp.image_url}
          alt={anime.title}
          width={250}
          height={350}
          className="w-full h-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{anime.title}</h3>
          <p className="text-sm text-gray-500">Score: {anime.score}</p>
        </div>
      </div>
    </Link>
  );
};
export default AnimeCard;
