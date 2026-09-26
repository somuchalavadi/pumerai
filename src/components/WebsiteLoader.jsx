import { useEffect, useState } from "react";

// Module-level guard so the loader only runs once per page session
let hasInitialLoaderRun = false;

export default function WebsiteLoader() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(hasInitialLoaderRun);

  useEffect(() => {
    // If already run in this session, immediately exit
    if (hasInitialLoaderRun) {
      setIsDone(true);
      document.body.style.overflow = "";
      document.body.style.removeProperty("overflow");
      return;
    }

    const restoreBody = () => {
      document.body.style.overflow = "";
      document.body.style.removeProperty("overflow");
    };

    // Temporarily lock body scrolling while opening animation plays
    document.body.style.overflow = "hidden";

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fadeDelay = prefersReducedMotion ? 250 : 1000;
    const finishDelay = prefersReducedMotion ? 500 : 1500;
    const maxFailsafeDelay = 2000; // Well within 2.5s maximum limit

    // Step 1: Smooth fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, fadeDelay);

    // Step 2: Unmount & restore interaction
    const finishTimer = setTimeout(() => {
      setIsFadingOut(true);
      setIsDone(true);
      hasInitialLoaderRun = true;
      restoreBody();
    }, finishDelay);

    // Step 3: Absolute Hard Failsafe (guaranteed cleanup under 2.5s regardless of anything)
    const failsafeTimer = setTimeout(() => {
      setIsFadingOut(true);
      setIsDone(true);
      hasInitialLoaderRun = true;
      restoreBody();
    }, maxFailsafeDelay);

    // Window visibility change failsafe (e.g. user switched tabs during load)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          setIsFadingOut(true);
          setIsDone(true);
          hasInitialLoaderRun = true;
          restoreBody();
        }, 500);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      clearTimeout(failsafeTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      restoreBody();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`website-loader ${isFadingOut ? "is-fading-out" : ""}`}
      aria-hidden={isFadingOut ? "true" : "false"}
      role="status"
      aria-live="polite"
      aria-label="Loading Hotel Pumerai"
    >
      <div className="website-loader-inner">
        <img
          src="/Untitled%20design%20(22)_result.webp"
          alt="Hotel Pumerai"
          className="website-loader-logo"
          width="340"
          height="340"
          loading="eager"
          decoding="async"
          onError={(e) => {
            // Failsafe: if image fails, trigger finish immediately
            e.currentTarget.style.opacity = "0";
            setTimeout(() => {
              setIsFadingOut(true);
              setIsDone(true);
              hasInitialLoaderRun = true;
              document.body.style.overflow = "";
              document.body.style.removeProperty("overflow");
            }, 300);
          }}
        />
      </div>
    </div>
  );
}
