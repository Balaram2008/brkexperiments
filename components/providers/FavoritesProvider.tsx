"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
  favorites: string[]; // project ids or slugs
  isFavorite: (idOrSlug: string) => boolean;
  toggleFavorite: (idOrSlug: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("brk_favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    } else {
      // initial sample favorites
      const sample = ["autonomous-web-research-agent", "realtime-collaborative-canvas-engine"];
      setFavorites(sample);
      localStorage.setItem("brk_favorites", JSON.stringify(sample));
    }
  }, []);

  const toggleFavorite = (idOrSlug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(idOrSlug)
        ? prev.filter((item) => item !== idOrSlug)
        : [...prev, idOrSlug];
      localStorage.setItem("brk_favorites", JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (idOrSlug: string) => favorites.includes(idOrSlug);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
