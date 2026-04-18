"use client";

import { useState } from "react";

export interface Variant {
  id?: string;
  sku: string;
  price: number;
  attributes: Record<string, string>;
  inventory?: number;
}

export interface VariantAttribute {
  name: string;
  key: string;
  placeholder?: string;
}

export interface VariantManagerProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  onSave?: (variant: Variant, index: number) => Promise<void>;
  attributes?: VariantAttribute[];
  priceInCents?: boolean;
  addLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

const defaultAttributes: VariantAttribute[] = [
  { name: "Size", key: "size", placeholder: "S, M, L, XL" },
  { name: "Color", key: "color", placeholder: "Red, Blue, Black" },
];

export function VariantManager({
  variants,
  onChange,
  onSave,
  attributes = defaultAttributes,
  priceInCents = true,
  addLabel = "Add Variant",
  emptyTitle = "No variants created",
  emptyDescription = "Add product variants with different sizes, colors, or configurations",
  className = "",
}: VariantManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function addVariant() {
    const attrs: Record<string, string> = {};
    attributes.forEach((a) => (attrs[a.key] = ""));

    const newVariant: Variant = {
      sku: `SKU-${Date.now()}`,
      price: 0,
      attributes: attrs,
    };
    onChange([...variants, newVariant]);
    setEditingIndex(variants.length);
  }

  function updateVariant(index: number, field: string, value: string | number) {
    const updated = variants.map((v, i) => {
      if (i !== index) return v;
      if (field === "sku" || field === "price" || field === "inventory") {
        return { ...v, [field]: value };
      }
      return { ...v, attributes: { ...v.attributes, [field]: value as string } };
    });
    onChange(updated);
  }

  function removeVariant(index: number) {
    if (typeof window !== "undefined" && !window.confirm("Remove this variant?")) return;
    onChange(variants.filter((_, i) => i !== index));
    setEditingIndex(null);
  }

  async function saveVariant(index: number) {
    if (onSave) {
      try {
        await onSave(variants[index], index);
      } catch {
        return;
      }
    }
    setEditingIndex(null);
  }

  const displayPrice = (price: number) =>
    priceInCents ? `$${(price / 100).toFixed(2)}` : `$${price.toFixed(2)}`;

  const parsePrice = (input: string) => {
    const num = parseFloat(input) || 0;
    return priceInCents ? Math.round(num * 100) : num;
  };

  const inputPrice = (price: number) =>
    priceInCents ? (price / 100).toFixed(2) : price.toFixed(2);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[var(--color-text,#1a1a1a)]">
          Product Variants
        </h3>
        <button
          type="button"
          onClick={addVariant}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover,var(--color-accent))] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          {addLabel}
        </button>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[var(--color-border,#e5e5e5)] rounded-xl">
          <div className="font-semibold text-[var(--color-text,#1a1a1a)] mb-2">{emptyTitle}</div>
          <div className="text-[var(--color-text-muted,#666)] mb-4 text-sm">{emptyDescription}</div>
          <button
            type="button"
            onClick={addVariant}
            className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Add First Variant
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={variant.id || index}
              className="p-6 border border-[var(--color-border,#e5e5e5)] rounded-xl"
            >
              {editingIndex === index ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* SKU */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text,#1a1a1a)] mb-1">
                        SKU *
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, "sku", e.target.value)}
                        className="w-full px-3 py-2 border border-[var(--color-border,#e5e5e5)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--color-text,#1a1a1a)] mb-1">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputPrice(variant.price)}
                        onChange={(e) => updateVariant(index, "price", parsePrice(e.target.value))}
                        className="w-full px-3 py-2 border border-[var(--color-border,#e5e5e5)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Dynamic attributes */}
                    {attributes.map((attr) => (
                      <div key={attr.key}>
                        <label className="block text-sm font-semibold text-[var(--color-text,#1a1a1a)] mb-1">
                          {attr.name}
                        </label>
                        <input
                          type="text"
                          value={variant.attributes[attr.key] || ""}
                          onChange={(e) => updateVariant(index, attr.key, e.target.value)}
                          placeholder={attr.placeholder}
                          className="w-full px-3 py-2 border border-[var(--color-border,#e5e5e5)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="px-4 py-2 border border-[var(--color-border,#e5e5e5)] rounded-lg hover:bg-[var(--color-surface,#f5f5f5)] transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveVariant(index)}
                      className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg transition-colors text-sm font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-semibold text-[var(--color-text,#1a1a1a)]">{variant.sku}</div>
                      <div className="text-xs text-[var(--color-text-muted,#666)]">SKU</div>
                    </div>
                    <div>
                      <div className="font-semibold">{displayPrice(variant.price)}</div>
                      <div className="text-xs text-[var(--color-text-muted,#666)]">Price</div>
                    </div>
                    {attributes.slice(0, 2).map((attr) => (
                      <div key={attr.key}>
                        <div className="font-semibold">{variant.attributes[attr.key] || "N/A"}</div>
                        <div className="text-xs text-[var(--color-text-muted,#666)]">{attr.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(index)}
                      className="text-[var(--color-accent)] hover:underline font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:underline font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VariantManager;
