
import React, { useState } from "react";
import { useGameContext } from "@/context/GameContext";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Gamepad2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { recommendedGames } = useGameContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  
  // Get unique genres across all games
  const allGenres = Array.from(
    new Set(
      recommendedGames.flatMap(game => game.genre)
    )
  ).sort();

  // Filter games based on search term and active genres
  const filteredGames = recommendedGames.filter(game => {
    const matchesSearch = searchTerm === "" || 
      game.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = activeGenres.length === 0 || 
      game.genre.some(genre => activeGenres.includes(genre));
    
    return matchesSearch && matchesGenre;
  });

  // Toggle genre filter
  const toggleGenre = (genre: string) => {
    setActiveGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Gamepad2 className="h-8 w-8" />
              Game Recommendations
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover new games that aren't in your lists yet
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[250px]"
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-card rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              
              <Separator className="mb-4" />
              
              <div>
                <h3 className="font-medium mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map(genre => (
                    <Badge
                      key={genre}
                      variant={activeGenres.includes(genre) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                {activeGenres.length > 0 && (
                  <Button
                    variant="link"
                    className="mt-2 p-0 h-auto text-sm"
                    onClick={() => setActiveGenres([])}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Game Grid */}
          <div className="flex-1">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <h2 className="text-2xl font-semibold mb-2">No games found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveGenres([]);
                  }}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
