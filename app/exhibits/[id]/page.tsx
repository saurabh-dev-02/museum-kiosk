import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { exhibitGradient } from "@/components/exhibitColors";
import { exhibits, getExhibit } from "@/data/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return exhibits.map(({ id }) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<"/exhibits/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  return { title: getExhibit(id)?.title };
}

export default async function ExhibitPage(props: PageProps<"/exhibits/[id]">) {
  const { id } = await props.params;
  const exhibit = getExhibit(id);
  if (!exhibit) notFound();

  return (
    <main className="flex h-full gap-[80px] p-[72px_96px]">
      <div
        aria-hidden
        className="w-[762px] shrink-0 rounded-[36px]"
        style={{ background: exhibitGradient(exhibit.id) }}
      />
      <article className="flex min-w-0 flex-1 flex-col">
        <div>
          <BackButton />
        </div>
        <h1 className="mt-[96px] text-[96px] font-bold leading-[1.05] tracking-[-0.01em]">
          {exhibit.title}
        </h1>
        <p className="mt-[48px] max-w-[880px] text-[36px] leading-[1.6] text-muted">
          {exhibit.body}
        </p>
      </article>
    </main>
  );
}
