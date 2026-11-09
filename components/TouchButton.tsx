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
  initialFocus?: boolean;
};

export default function TouchButton({
  eventName,
  children,
  className = "",
  href,
  onPress,
  disabled = false,
  initialFocus = false,
}: TouchButtonProps) {
  const focusProps = initialFocus ? { "data-autofocus": "" } : {};

  if (href) {
    return (
      <Link
        href={href}
        onClick={onPress}
        data-event={eventName}
        className={className}
        {...focusProps}
      >
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
      {...focusProps}
    >
      {children}
    </button>
  );
}
