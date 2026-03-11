import { useState, useCallback, useEffect } from "react";
import { ClothingItem, Outfit, Category } from "@/lib/types";
import { loadItems, saveItems, loadOutfits, saveOutfits, fileToDataUrl } from "@/lib/storage";

/** Main hook managing all closet state */
export function useCloset() {
  const [items, setItems] = useState<ClothingItem[]>(() => loadItems());
  const [outfits, setOutfits] = useState<Outfit[]>(() => loadOutfits());
  const [generatedOutfit, setGeneratedOutfit] = useState<Outfit | null>(null);

  // Persist on change
  useEffect(() => saveItems(items), [items]);
  useEffect(() => saveOutfits(outfits), [outfits]);

  /** Add a new clothing item */
  const addItem = useCallback(async (name: string, category: Category, file: File) => {
    const imageUrl = await fileToDataUrl(file);
    const newItem: ClothingItem = {
      id: crypto.randomUUID(),
      name,
      category,
      imageUrl,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
  }, []);

  /** Delete a clothing item by id */
  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /** Generate a random outfit from available items */
  const generateOutfit = useCallback(() => {
    const tops = items.filter((i) => i.category === "tops");
    const bottoms = items.filter((i) => i.category === "bottoms");
    const shoes = items.filter((i) => i.category === "shoes");
    const extras = items.filter((i) => i.category === "outerwear" || i.category === "accessories");

    if (!tops.length || !bottoms.length || !shoes.length) return null;

    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const outfit: Outfit = {
      id: crypto.randomUUID(),
      top: pick(tops),
      bottom: pick(bottoms),
      shoes: pick(shoes),
      extra: extras.length ? pick(extras) : undefined,
      savedAt: Date.now(),
    };
    setGeneratedOutfit(outfit);
    return outfit;
  }, [items]);

  /** Save the currently generated outfit */
  const saveOutfit = useCallback(() => {
    if (!generatedOutfit) return;
    setOutfits((prev) => [generatedOutfit, ...prev]);
    setGeneratedOutfit(null);
  }, [generatedOutfit]);

  /** Delete a saved outfit */
  const deleteOutfit = useCallback((id: string) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
  }, []);

  /** Check if we can generate (need at least 1 top, 1 bottom, 1 shoes) */
  const canGenerate = items.some((i) => i.category === "tops") &&
    items.some((i) => i.category === "bottoms") &&
    items.some((i) => i.category === "shoes");

  return {
    items,
    outfits,
    generatedOutfit,
    canGenerate,
    addItem,
    deleteItem,
    generateOutfit,
    saveOutfit,
    deleteOutfit,
  };
}
