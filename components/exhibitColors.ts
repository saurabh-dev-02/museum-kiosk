import { exhibits } from "@/data/content";

// Placeholder artwork, assigned by position so any exhibit list gets a colour.
const gradients = [
  "linear-gradient(160deg, #1f4e79 0%, #0b2140 100%)",
  "linear-gradient(160deg, #c4552c 0%, #3e1510 100%)",
  "radial-gradient(circle at 30% 30%, #5d4b93 0%, #1b1531 75%)",
  "linear-gradient(160deg, #6c8b36 0%, #243414 100%)",
];

export function exhibitGradient(id: string): string {
  const index = Math.max(
    0,
    exhibits.findIndex((exhibit) => exhibit.id === id),
  );
  return gradients[index % gradients.length];
}
