"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type TouchButtonProps = {
  eventName: string;
  children: ReactNode;
  className?: string;
  href?: string;
  onPress?: () => void;
  disabled?: boolean;
  initialFocus?: boolean;
};

const baseClassName =
  "transition-[transform,filter,border-color,background-color] duration-100 ease-out data-pressed:scale-[0.97] data-pressed:brightness-90";

export default function TouchButton({
  eventName,
  children,
  className = "",
  href,
  onPress,
  disabled = false,
  initialFocus = false,
}: TouchButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    console.log({ eventName, timestamp: Date.now() });
    onPress?.();
  };

  const sharedProps = {
    className: `${baseClassName} ${className}`,
    "data-event": eventName,
    "data-pressed": pressed ? "" : undefined,
    ...(initialFocus ? { "data-autofocus": "" } : {}),
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onClick: handlePress,
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" disabled={disabled} {...sharedProps}>
      {children}
    </button>
  );
}
