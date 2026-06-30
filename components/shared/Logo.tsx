import Image from "next/image";
import Link from "next/link";

export default function Logo() {
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
        className="h-10 w-10 shrink-0 rounded-full ring-1 ring-gray-200 xs:h-11 xs:w-11"
        priority
      />
      <span className="min-w-0 leading-none">
        <span className="block truncate text-base font-bold tracking-tight text-brand-800 transition-colors group-hover:text-brand-900 xs:text-lg sm:text-xl">
          ALL4ONE
        </span>
        <span className="mt-0.5 block truncate text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-charcoal-muted xs:text-[0.6875rem] sm:text-xs">
          Exterior Solutions
        </span>
      </span>
    </Link>
  );
}
