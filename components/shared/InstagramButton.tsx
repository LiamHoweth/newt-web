import { Instagram } from "lucide-react";
import { INSTAGRAM_DM_URL, INSTAGRAM_USERNAME } from "@/lib/instagram";

type InstagramButtonVariant = "primary" | "secondary" | "link" | "ghost";

interface InstagramButtonProps {
  variant?: InstagramButtonVariant;
  label?: string;
  className?: string;
}

export default function InstagramButton({
  variant = "secondary",
  label = "Message on Instagram",
  className = "",
}: InstagramButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors";

  const styles: Record<InstagramButtonVariant, string> = {
    primary: `${base} btn-primary`,
    secondary: `${base} btn-secondary`,
    link: `${base} text-sm font-medium text-brand-700 hover:underline`,
    ghost: `${base} touch-target rounded-md border border-gray-600 px-5 py-3.5 text-base text-white hover:border-gray-500 hover:bg-white/5 sm:py-2.5 sm:text-sm`,
  };

  return (
    <a
      href={INSTAGRAM_DM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles[variant]} ${className}`}
      aria-label={`Message ${INSTAGRAM_USERNAME} on Instagram`}
    >
      <Instagram className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </a>
  );
}
