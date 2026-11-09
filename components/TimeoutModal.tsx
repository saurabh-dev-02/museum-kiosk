"use client";

import { useEffect, useId, useRef } from "react";
import TouchButton from "@/components/TouchButton";
import { formatMessage, type TimeoutText } from "@/data/content";

type TimeoutModalProps = {
  seconds: number;
  text: TimeoutText;
  onConfirm: () => void;
  onDismiss: () => void;
};

export default function TimeoutModal({ seconds, text, onConfirm, onDismiss }: TimeoutModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-[6px]">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex w-[880px] flex-col items-center rounded-[40px] border-2 border-border bg-surface px-[80px] pt-[72px] pb-[64px] text-center shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
      >
        <div
          aria-hidden
          className="flex size-[200px] items-center justify-center rounded-full border-[6px] border-accent text-[96px] font-bold tabular-nums text-accent"
        >
          {seconds}
        </div>
        <p id={titleId} aria-live="polite" className="mt-[48px] text-[40px] font-semibold leading-[1.3]">
          {formatMessage(text.message, { seconds })}
        </p>
        <p className="mt-[16px] text-[32px] text-muted">{text.question}</p>
        <div className="mt-[56px] flex w-full gap-[32px]">
          <TouchButton
            eventName="timeout_confirm"
            onPress={onConfirm}
            initialFocus
            className="h-[104px] flex-1 rounded-full bg-accent text-[36px] font-bold text-background"
          >
            {text.confirmLabel}
          </TouchButton>
          <TouchButton
            eventName="timeout_dismiss"
            onPress={onDismiss}
            className="h-[104px] flex-1 rounded-full border-2 border-foreground/70 text-[36px] font-semibold"
          >
            {text.dismissLabel}
          </TouchButton>
        </div>
      </div>
    </div>
  );
}
