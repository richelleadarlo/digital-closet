import { useState } from "react";
import { motion } from "framer-motion";
import { Shirt, Grid3X3, Sparkles, Heart } from "lucide-react";
import { useCloset } from "@/hooks/useCloset";
import UploadItem from "@/components/UploadItem";
import ClosetGrid from "@/components/ClosetGrid";
import OutfitGenerator from "@/components/OutfitGenerator";
import SavedOutfits from "@/components/SavedOutfits";

type Tab = "upload" | "closet" | "generate" | "saved";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "upload", label: "Upload", icon: <Shirt className="h-4 w-4" /> },
  { id: "closet", label: "Closet", icon: <Grid3X3 className="h-4 w-4" /> },
  { id: "generate", label: "Generate", icon: <Sparkles className="h-4 w-4" /> },
  { id: "saved", label: "Saved", icon: <Heart className="h-4 w-4" /> },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("upload");
  const closet = useCloset();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Digital Closet
          </h1>
          <span className="text-sm text-muted-foreground">{closet.items.length} items</span>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur-sm">
        <div className="container flex gap-1 overflow-x-auto py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="container py-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "upload" && (
            <div className="mx-auto max-w-md">
              <UploadItem onAdd={closet.addItem} />
            </div>
          )}
          {activeTab === "closet" && (
            <ClosetGrid items={closet.items} onDelete={closet.deleteItem} />
          )}
          {activeTab === "generate" && (
            <div className="mx-auto max-w-2xl">
              <OutfitGenerator
                generatedOutfit={closet.generatedOutfit}
                canGenerate={closet.canGenerate}
                onGenerate={closet.generateOutfit}
                onSave={closet.saveOutfit}
              />
            </div>
          )}
          {activeTab === "saved" && (
            <SavedOutfits outfits={closet.outfits} onDelete={closet.deleteOutfit} />
          )}
        </motion.div>
      </main>
    </div>
  );
}
