/** Clothing category types */
export type Category = "tops" | "bottoms" | "shoes" | "outerwear" | "accessories";

/** A single clothing item in the closet */
export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  imageUrl: string; // base64 data URL
  createdAt: number;
}

/** A saved outfit consisting of clothing items */
export interface Outfit {
  id: string;
  top: ClothingItem;
  bottom: ClothingItem;
  shoes: ClothingItem;
  extra?: ClothingItem; // outerwear or accessory
  savedAt: number;
}

/** Category display configuration */
export const CATEGORY_CONFIG: Record<Category, { label: string; badgeClass: string }> = {
  tops: { label: "Tops", badgeClass: "category-badge-tops" },
  bottoms: { label: "Bottoms", badgeClass: "category-badge-bottoms" },
  shoes: { label: "Shoes", badgeClass: "category-badge-shoes" },
  outerwear: { label: "Outerwear", badgeClass: "category-badge-outerwear" },
  accessories: { label: "Accessories", badgeClass: "category-badge-accessories" },
};

export const ALL_CATEGORIES: Category[] = ["tops", "bottoms", "shoes", "outerwear", "accessories"];
