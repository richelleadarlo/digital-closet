import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Heart } from "lucide-react";
import { Outfit } from "@/lib/types";
import OutfitDisplay from "./OutfitDisplay";

interface SavedOutfitsProps {
  outfits: Outfit[];
  onDelete: (id: string) => void;
}

/** Section displaying all saved outfits */
export default function SavedOutfits({ outfits, onDelete }: SavedOutfitsProps) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-semibold text-foreground">Saved Outfits</h2>
        <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {outfits.length}
        </span>
      </div>

      {outfits.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No saved outfits yet. Generate an outfit and save it!
        </p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {outfits.map((outfit, i) => (
              <motion.div
                key={outfit.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-lg border bg-card p-4 shadow-card"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(outfit.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <button
                    onClick={() => onDelete(outfit.id)}
                    className="rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                    aria-label="Delete outfit"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <OutfitDisplay outfit={outfit} compact />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
