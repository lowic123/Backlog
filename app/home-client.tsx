"use client";

import { useState, useEffect, useCallback } from "react";
import { useTina, tinaField } from "tinacms/dist/react"
import GameCard from "@/components/game-card";
import type { RawgGame } from "@/lib/rawg";
import type { HomePageQuery, HomePageQueryVariables } from "@/tina/__generated__/types"

type Props ={
    data: HomePageQuery;
    variables: HomePageQueryVariables;
    query: string;
}

export default function HomeClient({data,variables, query} : Props) {
    
    const {data: tinaData} = useTina({data, variables, query});
    const page = tinaData?.homePage;

  

  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState<RawgGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setGames([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/games/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setGames(data);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if(
          document.activeElement instanceof HTMLInputElement || 
          document.activeElement instanceof HTMLTextAreaElement
        ){
          return;
        }
        if(event.key.toLowerCase() === 't'){
          document.documentElement.classList.toggle('dark');
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => search(searchQuery), 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, search]);

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 data-tina-field={tinaField(page, "title")} className='mt-8 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl'>
          {page.title}
        </h1>
        <p data-tina-field={tinaField(page, "subtitle")} className='text-primary mb-6'>
          {page.subtitle}
        </p>
        <div className='w-1/2 mx-auto'>
          <input
            data-tina-field={tinaField(page,"searchPlaceholder")}
            type="text"
            placeholder={page.searchPlaceholder ?? "Search games..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", fontSize: "15px", padding: "0 16px" }}
            autoFocus
          />
        </div>
      </div>

      {loading && (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Searching...</p>
      )}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      )}
      {!loading && !error && searchQuery && games.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No games found for "{searchQuery}"</p>
      )}
      {!loading && games.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      {!searchQuery && (
        <p data-tina-field={tinaField(page,"emptyPrompt")} style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "4rem" }}>
          {page.emptyPrompt}
        </p>
      )}
    </main>
  );
}