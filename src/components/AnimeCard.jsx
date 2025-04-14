"use client";

import Image from "next/image";
import Link from "next/link";

const AnimeCard = ({ anime }) => {
  return (
    <Link href={`/anime/${anime.mal_id}`} className="w-full sm:w-[160px] md:w-[200px]">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={anime.images.webp.image_url}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
        <div className="p-2 flex flex-col justify-between h-[100px]">
          <h3 className="text-base font-semibold line-clamp-2">{anime.title}</h3>
          <p className="text-sm text-gray-500 mt-1">⭐ {anime.score || "N/A"}</p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
