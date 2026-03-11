import { ClothingItem, Outfit } from "./types";

const ITEMS_KEY = "digital-closet-items";
const OUTFITS_KEY = "digital-closet-outfits";

/** Load clothing items from localStorage */
export function loadItems(): ClothingItem[] {
  try {
    const data = localStorage.getItem(ITEMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Save clothing items to localStorage */
export function saveItems(items: ClothingItem[]) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

/** Load saved outfits from localStorage */
export function loadOutfits(): Outfit[] {
  try {
    const data = localStorage.getItem(OUTFITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/** Save outfits to localStorage */
export function saveOutfits(outfits: Outfit[]) {
  localStorage.setItem(OUTFITS_KEY, JSON.stringify(outfits));
}

/** Convert a File to a base64 data URL */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
