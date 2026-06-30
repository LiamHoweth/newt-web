interface TrustStripProps {
  phone: string;
}

export default function TrustStrip({ phone }: TrustStripProps) {
  const items = [
    "Guaranteed clean on trash cans",
    "Same-day & scheduled service",
    "Free quotes — call, form, or DM",
  ];

  return (
    <section className="border-b border-gray-200 bg-white py-4">
      <div className="section-container">
        <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-snug text-charcoal-muted sm:items-center"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600 sm:mt-0"
                aria-hidden
              />
              {item}
            </li>
          ))}
          <li className="hidden sm:ml-auto sm:block">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              {phone}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
