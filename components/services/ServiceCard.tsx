import Link from "next/link";

export interface ServiceDetail {
  id: string;
  title: string;
  problem: string;
  result: string;
  highlights: string[];
}

interface ServiceCardProps {
  service: ServiceDetail;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="rounded-lg border border-brand-100 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-bold text-charcoal">{service.title}</h2>

      <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
        {service.problem}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-charcoal">
        {service.result}
      </p>

      <ul className="mt-4 space-y-1 text-sm text-charcoal-muted">
        {service.highlights.map((item) => (
          <li key={item}>— {item}</li>
        ))}
      </ul>

      <Link
        href={`/quote?service=${encodeURIComponent(service.title)}`}
        className="mt-5 inline-block text-sm font-medium text-brand-700 hover:underline"
      >
        Get a quote →
      </Link>
    </article>
  );
}
