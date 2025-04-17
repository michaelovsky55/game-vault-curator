
import React from "react";
import { Game } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Star, Star as StarIcon } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGameContext } from "@/context/GameContext";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { lists, addToList } = useGameContext();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white font-bold">
            {game.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {game.genre.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {game.genre.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{game.genre.length - 2}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2 text-sm text-muted-foreground flex-grow">
        <p className="line-clamp-2">{game.description}</p>
        <p className="mt-1 text-sm">Released: {game.releaseYear}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="default" 
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to List
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Add to List</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {lists.map((list) => (
              <DropdownMenuItem 
                key={list.id} 
                onClick={() => addToList(game.id, list.id)}
                className="cursor-pointer"
              >
                {list.name}
                {list.id === "favorites" && <Star className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
