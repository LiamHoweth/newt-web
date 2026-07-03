import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "light";
  /** Compact circular mark only (e.g. admin). */
  compact?: boolean;
}

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Logo({ variant = "default", compact = false }: LogoProps) {
  const light = variant === "light";
  const useEmblem = compact || light;

  const src = useEmblem
    ? `${publicBasePath}/branding/logo-emblem.png`
    : `${publicBasePath}/branding/logo-mark.png`;

  const image = (
    <Image
      src={src}
      alt=""
      width={useEmblem ? 48 : 180}
      height={useEmblem ? 48 : 48}
      className={`w-auto object-contain ${
        useEmblem ? "h-9 xs:h-10" : "h-10 xs:h-11 sm:h-12"
      }`}
      priority
      aria-hidden
    />
  );

  return (
    <Link
      href="/"
      className="group flex min-w-0 max-w-[min(100%,18rem)] items-center sm:max-w-none"
      aria-label="All4One Exterior Solutions — home"
    >
      {light ? (
        <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 p-1 ring-1 ring-brand-200/70">
          {image}
        </span>
      ) : (
        <span className="inline-flex shrink-0 items-center justify-center">{image}</span>
      )}
    </Link>
  );
}
