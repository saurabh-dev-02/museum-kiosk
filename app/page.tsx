import TouchButton from "@/components/TouchButton";
import { exhibitGradient } from "@/components/exhibitColors";
import { exhibits, home } from "@/data/content";

export default function Home() {
  return (
    <main className="flex h-full flex-col px-[96px] pt-[76px] pb-[64px]">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-[24px] font-medium uppercase tracking-[0.18em] text-accent">
            {home.eyebrow}
          </p>
          <h1 className="mt-[12px] text-[72px] font-bold leading-none tracking-[-0.01em]">
            {home.title}
          </h1>
        </div>
        <p className="pt-[4px] text-[26px] text-muted">{home.hint}</p>
      </header>

      <ul className="mt-[84px] grid flex-1 grid-cols-4 gap-[40px]">
        {exhibits.map((exhibit) => (
          <li key={exhibit.id} className="min-h-0">
            <TouchButton
              href={`/exhibits/${exhibit.id}`}
              eventName={`exhibit_card_${exhibit.id}`}
              className="flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-border bg-surface text-left"
            >
              <div
                aria-hidden
                className="h-[380px] shrink-0"
                style={{ background: exhibitGradient(exhibit.id) }}
              />
              <div className="px-[38px] pt-[38px]">
                <h2 className="line-clamp-2 text-[40px] font-bold leading-[1.2]">
                  {exhibit.title}
                </h2>
                <p className="mt-[14px] line-clamp-3 text-[26px] leading-[1.45] text-muted">
                  {exhibit.summary}
                </p>
              </div>
            </TouchButton>
          </li>
        ))}
      </ul>

      <footer className="mt-[52px] flex justify-between text-[20px] text-subtle">
        <span>{home.museumName}</span>
        <span>{home.footerHint}</span>
      </footer>
    </main>
  );
}
