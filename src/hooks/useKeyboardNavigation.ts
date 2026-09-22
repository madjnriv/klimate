import type { GeocodingResponse } from "@/api/types";
import { type KeyboardEvent, useCallback, useEffect, useState } from "react";

interface UseKeyboardNavigationProps {
  results: GeocodingResponse[] | undefined;
  isOpen: boolean;
  onSelect: (cityData: string) => void;
  onClose: () => void;
}

export function useKeyboardNavigation({
  results,
  isOpen,
  onSelect,
  onClose,
}: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  const resetSelection = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const totalResults = results?.length ?? 0;

      if (!isOpen || totalResults === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0));
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1));
          break;
        }

        case "Enter": {
          e.preventDefault();

          const selected = results?.[selectedIndex];

          if (!selected) break;

          onSelect(
            `${selected.lat}|${selected.lon}|${selected.name}|${selected.country}`,
          );
          break;
        }

        case "Escape": {
          e.preventDefault();
          onClose();

          break;
        }

        default:
          break;
      }
    },
    [isOpen, results, selectedIndex, onSelect, onClose, resetSelection],
  );

  return { selectedIndex, handleKeyDown, resetSelection };
}
