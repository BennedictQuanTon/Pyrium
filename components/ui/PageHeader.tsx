import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  children?: ReactNode;
};

/**
 * Opening block for every sub-page: eyebrow, display title and lede over a quiet field — a
 * plain fog ground — entering with the same focus pull as the home hero.
 */
export function PageHeader({ eyebrow, title, body, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-blueprint">
      <div className="page-width relative flex flex-col gap-6 pt-40 pb-12 md:pt-48 md:pb-14">
        <p
          className="hero-in eyebrow flex items-center gap-2"
          style={{ ["--hero-i" as string]: 0 }}
        >
          <span aria-hidden="true" className="h-px w-6 bg-signal" />
          {eyebrow}
        </p>
        <h1
          className="hero-in max-w-[20ch] text-[40px] leading-[1.1] tracking-[-0.8px] md:text-[60px] md:tracking-[-1.2px]"
          style={{ ["--hero-i" as string]: 1 }}
        >
          {title}
        </h1>
        {body ? (
          <p
            className="hero-in max-w-[58ch] text-body text-stone md:text-subheading"
            style={{ ["--hero-i" as string]: 2 }}
          >
            {body}
          </p>
        ) : null}
        {children ? (
          <div className="hero-in" style={{ ["--hero-i" as string]: 3 }}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
