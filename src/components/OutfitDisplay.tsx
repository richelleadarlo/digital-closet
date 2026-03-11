import { motion } from "framer-motion";
import { Outfit, CATEGORY_CONFIG } from "@/lib/types";

interface OutfitDisplayProps {
  outfit: Outfit;
  compact?: boolean;
}

/** Visual display of an outfit (top, bottom, shoes, optional extra) */
export default function OutfitDisplay({ outfit, compact = false }: OutfitDisplayProps) {
  const pieces = [
    { label: "Top", item: outfit.top },
    { label: "Bottom", item: outfit.bottom },
    { label: "Shoes", item: outfit.shoes },
    ...(outfit.extra ? [{ label: CATEGORY_CONFIG[outfit.extra.category].label, item: outfit.extra }] : []),
  ];

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
      {pieces.map(({ label, item }, i) => (
        <motion.div
          key={item.id + i}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className={`overflow-hidden rounded-lg border bg-card shadow-card ${compact ? "h-24 w-24" : "h-32 w-32 sm:h-40 sm:w-40"}`}>
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <span className="mt-1.5 text-xs font-medium text-muted-foreground">{label}</span>
          <span className="truncate text-xs font-semibold text-foreground" style={{ maxWidth: compact ? 96 : 160 }}>
            {item.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
