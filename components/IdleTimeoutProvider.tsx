"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import TimeoutModal from "@/components/TimeoutModal";
import type { TimeoutText } from "@/data/content";

const HOME = "/";
const ACTIVITY_EVENTS = ["pointerdown", "touchstart", "keydown"] as const;

type IdleTimeoutProviderProps = {
  idleTimeoutSeconds: number;
  warningSeconds: number;
  text: TimeoutText;
  children: ReactNode;
};

function resolveWarningSeconds(idleTimeoutSeconds: number, warningSeconds: number) {
  return warningSeconds < idleTimeoutSeconds ? warningSeconds : Math.floor(idleTimeoutSeconds / 2);
}

export default function IdleTimeoutProvider({
  idleTimeoutSeconds,
  warningSeconds: configuredWarningSeconds,
  text,
  children,
}: IdleTimeoutProviderProps) {
  const warningSeconds = resolveWarningSeconds(idleTimeoutSeconds, configuredWarningSeconds);
  const pathname = usePathname();
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const idleTimer = useRef<number | undefined>(undefined);
  const countdownTimer = useRef<number | undefined>(undefined);
  const modalOpen = secondsLeft !== null;

  const clearTimers = useCallback(() => {
    window.clearTimeout(idleTimer.current);
    window.clearInterval(countdownTimer.current);
  }, []);

  // Leaves the timer disarmed; on "/" it re-arms on the next interaction.
  const endSession = useCallback(() => {
    clearTimers();
    setSecondsLeft(null);
    if (pathname !== HOME) router.push(HOME);
  }, [clearTimers, pathname, router]);

  const startCountdown = useCallback(() => {
    const deadline = Date.now() + warningSeconds * 1000;
    setSecondsLeft(warningSeconds);
    countdownTimer.current = window.setInterval(() => {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      if (remaining <= 0) endSession();
      else setSecondsLeft(remaining);
    }, 250);
  }, [warningSeconds, endSession]);

  const resetIdleTimer = useCallback(() => {
    clearTimers();
    idleTimer.current = window.setTimeout(
      startCountdown,
      (idleTimeoutSeconds - warningSeconds) * 1000,
    );
  }, [clearTimers, startCountdown, idleTimeoutSeconds, warningSeconds]);

  const continueSession = useCallback(() => {
    setSecondsLeft(null);
    resetIdleTimer();
  }, [resetIdleTimer]);

  // While the modal is open only its buttons may change the session.
  const onActivity = useEffectEvent(() => {
    if (!modalOpen) resetIdleTimer();
  });

  const onRouteChange = useEffectEvent(() => {
    if (pathname !== HOME) resetIdleTimer();
  });

  useEffect(() => {
    if (warningSeconds !== configuredWarningSeconds) {
      console.warn(
        `settings.warningSeconds (${configuredWarningSeconds}) must be less than ` +
          `settings.idleTimeoutSeconds (${idleTimeoutSeconds}); using ${warningSeconds}.`,
      );
    }
  }, [warningSeconds, configuredWarningSeconds, idleTimeoutSeconds]);

  useEffect(() => {
    const handler = () => onActivity();
    for (const type of ACTIVITY_EVENTS) {
      window.addEventListener(type, handler, { capture: true, passive: true });
    }
    return () => {
      for (const type of ACTIVITY_EVENTS) {
        window.removeEventListener(type, handler, { capture: true });
      }
    };
  }, []);

  useEffect(() => {
    onRouteChange();
    return clearTimers;
  }, [pathname, clearTimers]);

  return (
    <>
      <div inert={modalOpen} className="h-full">
        {children}
      </div>
      {modalOpen && (
        <TimeoutModal
          seconds={secondsLeft}
          text={text}
          onConfirm={continueSession}
          onDismiss={endSession}
        />
      )}
    </>
  );
}
