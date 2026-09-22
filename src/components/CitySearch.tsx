import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationSearch } from "@/hooks/useWeather";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavorites } from "@/hooks/useFavorite";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "./ui/alert";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query);
  const trimmedQuery = query.trim();
  const hasSearchQuery = trimmedQuery.length >= 3;

  const { data: locations, isLoading, error } = useLocationSearch(debouncedQuery);
  const { favorites } = useFavorites();
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    // Add to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  // use keyboard Navigation
  const { selectedIndex, handleKeyDown, resetSelection } =
    useKeyboardNavigation({
      results: locations,
      isOpen: open,
      onSelect: handleSelect,
      onClose: () => setOpen(false),
    });

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            {hasSearchQuery && !isLoading && !error && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {error && (
              <Alert variant="destructive" className="m-2">
                <AlertDescription>
                  We couldn’t fetch city suggestions right now. Please try again.
                </AlertDescription>
              </Alert>
            )}

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>{city.name}</span>
                    {city.state && (
                      <span className="text-sm text-muted-foreground">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Search History Section */}
            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between px-2 my-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                    >
                      <XCircle className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                  {history.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {item.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(item.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </div>
            )}

            {/* Search Results */}
            {hasSearchQuery && <CommandSeparator />}
            {hasSearchQuery && locations && locations.length > 0 && (
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {locations?.map((location, index) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className={cn(selectedIndex === index && "bg-accent")}
                    onMouseEnter={() => resetSelection(index)}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
