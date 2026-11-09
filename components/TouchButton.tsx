"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TouchButtonProps = {
  eventName: string;
  children: ReactNode;
  className?: string;
  href?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function TouchButton({
  eventName,
  children,
  className = "",
  href,
  onPress,
  disabled = false,
}: TouchButtonProps) {
  if (href) {
    return (
      <Link href={href} onClick={onPress} data-event={eventName} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      data-event={eventName}
      className={className}
    >
      {children}
    </button>
  );
}
