import TouchButton from "@/components/TouchButton";
import { exhibitPage } from "@/data/content";

export default function BackButton() {
  return (
    <TouchButton
      href="/"
      eventName="back"
      className="inline-flex h-[84px] items-center gap-[14px] rounded-full border-2 border-foreground/70 px-[42px] text-[30px] font-semibold data-pressed:bg-foreground/10"
    >
      <span aria-hidden className="text-[38px] leading-none">
        &larr;
      </span>
      {exhibitPage.backLabel}
    </TouchButton>
  );
}
