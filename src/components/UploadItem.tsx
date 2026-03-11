import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, ALL_CATEGORIES, CATEGORY_CONFIG } from "@/lib/types";

interface UploadItemProps {
  onAdd: (name: string, category: Category, file: File) => Promise<void>;
}

/** Form component for uploading a new clothing item */
export default function UploadItem({ onAdd }: UploadItemProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category || !file) return;
    setLoading(true);
    await onAdd(name.trim(), category as Category, file);
    setName("");
    setCategory("");
    clearFile();
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-6 shadow-card"
    >
      <h2 className="mb-5 font-display text-xl font-semibold text-foreground">
        Add to Closet
      </h2>

      {/* Drag-and-drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
              <img src={preview} alt="Preview" className="h-40 w-40 rounded-md object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 text-muted-foreground">
              {dragOver ? <ImageIcon className="h-10 w-10" /> : <Upload className="h-10 w-10" />}
              <span className="text-sm font-medium">
                {dragOver ? "Drop it here!" : "Drag & drop or click to upload"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {/* Name input */}
      <div className="mb-4">
        <Label htmlFor="item-name" className="mb-1.5 text-sm font-medium">Item Name</Label>
        <Input
          id="item-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Blue Oxford Shirt"
        />
      </div>

      {/* Category select */}
      <div className="mb-5">
        <Label className="mb-1.5 text-sm font-medium">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {ALL_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {CATEGORY_CONFIG[cat].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={!name.trim() || !category || !file || loading}
        className="w-full"
      >
        {loading ? "Adding…" : "Add Item"}
      </Button>
    </motion.form>
  );
}
