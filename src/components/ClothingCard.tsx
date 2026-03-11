import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { ClothingItem, CATEGORY_CONFIG } from "@/lib/types";

interface ClothingCardProps {
  item: ClothingItem;
  onDelete: (id: string) => void;
}

/** Card displaying a single clothing item */
export default function ClothingCard({ item, onDelete }: ClothingCardProps) {
  const config = CATEGORY_CONFIG[item.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative overflow-hidden rounded-lg border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-foreground">{item.name}</h3>
        <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(item.id)}
        className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
