import BackButton from "@/components/BackButton";
import { exhibitPage } from "@/data/content";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-[48px]">
      <h1 className="text-[72px] font-bold">{exhibitPage.notFoundTitle}</h1>
      <BackButton />
    </main>
  );
}
