import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "light";
}

export default function Logo({ variant = "default" }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className="group flex min-w-0 max-w-[72%] items-center gap-2.5 sm:max-w-none"
    >
      <Image
        src="/branding/logo.svg"
        alt="All4One Exterior Solutions logo"
        width={44}
        height={44}
        className={`h-10 w-10 shrink-0 rounded-full xs:h-11 xs:w-11 ${
          light ? "ring-1 ring-white/30" : "ring-1 ring-gray-200"
        }`}
        priority
      />
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate text-base font-bold tracking-tight transition-colors xs:text-lg sm:text-xl ${
            light
              ? "text-white group-hover:text-brand-200"
              : "text-brand-800 group-hover:text-brand-900"
          }`}
        >
          ALL4ONE
        </span>
        <span
          className={`mt-0.5 block truncate text-[0.625rem] font-semibold uppercase tracking-[0.1em] xs:text-[0.6875rem] sm:text-xs ${
            light ? "text-gray-300" : "text-charcoal-muted"
          }`}
        >
          Exterior Solutions
        </span>
      </span>
    </Link>
  );
}
