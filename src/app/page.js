'use client'
import AnimeCard from "@/components/sections/AnimeCard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
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
    <div className="container mx-auto px-4 py-8 ">
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
