import { motion } from "framer-motion";
import { Shuffle, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outfit } from "@/lib/types";
import OutfitDisplay from "./OutfitDisplay";

interface OutfitGeneratorProps {
  generatedOutfit: Outfit | null;
  canGenerate: boolean;
  onGenerate: () => void;
  onSave: () => void;
}

/** Section for generating and saving random outfits */
export default function OutfitGenerator({ generatedOutfit, canGenerate, onGenerate, onSave }: OutfitGeneratorProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-card">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-semibold text-foreground">Outfit Generator</h2>
      </div>

      {!canGenerate ? (
        <p className="mb-4 text-sm text-muted-foreground">
          Add at least one <strong>Top</strong>, one <strong>Bottom</strong>, and one pair of <strong>Shoes</strong> to generate outfits.
        </p>
      ) : null}

      <div className="flex gap-3">
        <Button onClick={onGenerate} disabled={!canGenerate} className="gap-2">
          <Shuffle className="h-4 w-4" />
          Generate Outfit
        </Button>
        {generatedOutfit && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Button onClick={onSave} variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save Outfit
            </Button>
          </motion.div>
        )}
      </div>

      {generatedOutfit && (
        <motion.div
          key={generatedOutfit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Today's Look</h3>
          <OutfitDisplay outfit={generatedOutfit} />
        </motion.div>
      )}
    </div>
  );
}
