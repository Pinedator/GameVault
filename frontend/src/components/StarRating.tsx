import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (rating: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="text-xl transition-colors duration-100"
        >
          <span
            className={
              (hovered ?? value ?? 0) >= star
                ? "text-purple-400"
                : "text-gray-600"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}