import Link from "next/link";
import { MessageSquare, Sparkles, ThumbsUp } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Tell us what needs cleaned",
    description:
      "Call, fill out the quote form, or DM us on Instagram. Trash cans, siding, driveways — you name it.",
  },
  {
    icon: Sparkles,
    title: "We show up & spray it",
    description:
      "Same-day often available in Purcell & Norman. Professional equipment, guaranteed clean on trash cans.",
  },
  {
    icon: ThumbsUp,
    title: "Enjoy the results",
    description:
      "Fresh-smelling cans, brighter siding, cleaner walkways. Regular maintenance keeps it that way.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-50/60 py-14 sm:py-16">
      <div className="section-container">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
            Simple process
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-charcoal-muted sm:text-base">
            Three steps from quote to clean — no hassle, no surprises.
          </p>
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-xl border border-brand-100 bg-white p-6 shadow-soft"
            >
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                {index + 1}
              </span>
              <step.icon
                className="mt-2 h-8 w-8 text-brand-600"
                aria-hidden
              />
              <h3 className="mt-4 font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 sm:text-center">
          <Link
            href="/quote"
            className="btn-primary inline-flex w-full px-8 py-3.5 sm:w-auto sm:py-3"
          >
            Start with a free quote
          </Link>
        </div>
      </div>
    </section>
  );
}
