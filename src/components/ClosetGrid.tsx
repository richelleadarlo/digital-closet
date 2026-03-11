import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ClothingItem, Category, ALL_CATEGORIES, CATEGORY_CONFIG } from "@/lib/types";
import ClothingCard from "./ClothingCard";

interface ClosetGridProps {
  items: ClothingItem[];
  onDelete: (id: string) => void;
}

/** Grid display of all clothing items with category filters */
export default function ClosetGrid({ items, onDelete }: ClosetGridProps) {
  const [filter, setFilter] = useState<Category | "all">("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            filter === "all" ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          All ({items.length})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === cat ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {CATEGORY_CONFIG[cat].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          {items.length === 0 ? "Your closet is empty. Upload some items to get started!" : "No items in this category."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <ClothingCard key={item.id} item={item} onDelete={onDelete} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
