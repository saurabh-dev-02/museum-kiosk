"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type ScaledStageProps = {
  width: number;
  height: number;
  children: ReactNode;
};

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export default function ScaledStage({ width, height, children }: ScaledStageProps) {
  const scale = useSyncExternalStore(
    subscribe,
    () => Math.min(window.innerWidth / width, window.innerHeight / height),
    () => null,
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-letterbox">
      <div
        className="absolute top-1/2 left-1/2 overflow-hidden bg-background"
        style={{
          width,
          height,
          transform: `translate(-50%, -50%) scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
