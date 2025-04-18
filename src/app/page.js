'use client'
import AnimeCard from "@/components/AnimeCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { useEffect, useState } from "react";

export default function Home() {

  const [animeList, setAnimeList] = useState([])

  useEffect(()=>{
    const fetchAnime = async () => {
      try{
        const res = await fetch('https://api.jikan.moe/v4/top/anime')
        const data = await res.json()
        setAnimeList(data.data)
      }catch(err){
        console.log("error fetching anime.",err)
      }
    }
    fetchAnime()
  },[])
  return (
    <>
    <Header/>
    <HeroSection/>
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-white to-purple-500">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Top Anime</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {animeList.slice(0,10).map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
