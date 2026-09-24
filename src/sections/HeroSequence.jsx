import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_COUNT, framePath } from "../utils/frames.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

const storyMoments = [
  {
    eyebrow: "HOTEL PUMERAI · NH-66 HONNAVAR",
    title: "A quiet boutique stay on the coast",
    copy: "Hotel Pumerai is a 3-star boutique hotel on NH-66 in Honnavar, Karnataka, ~5 km from Kasarkod Beach and ~2.8 km from the Sharavati River, with 40 rooms, an indoor pool, and two on-site restaurants.",
  },
  {
    eyebrow: "ARRIVE · COASTAL HIGHWAY",
    title: "Effortless highway access & calm",
    copy: "Conveniently situated near Ramateertha Cross on NH-66 with wide access, free secured parking, EV charging, and 24-hour reception.",
  },
  {
    eyebrow: "SWIMMING POOL & LEISURE",
    title: "Indoor glass-edge pool & retreat",
    copy: "Featuring an indoor temperature-balanced swimming pool and children's splash area open daily from 6:30 AM to 7:00 PM.",
  },
  {
    eyebrow: "KARAVALI & HONNAVAR",
    title: "Your gateway to beaches & backwaters",
    copy: "Explore Kasarkod Eco Beach, Sharavati River boat cruises, Mirjan Fort, and Murudeshwar from a serene, central base.",
  },
];

function drawContainedImage(ctx, image, canvas, fit = "cover") {
  const pixelWidth = canvas.width;
  const pixelHeight = canvas.height;
  const ratio =
    fit === "contain"
      ? Math.min(pixelWidth / image.naturalWidth, pixelHeight / image.naturalHeight)
      : Math.max(pixelWidth / image.naturalWidth, pixelHeight / image.naturalHeight);
  const width = image.naturalWidth * ratio;
  const height = image.naturalHeight * ratio;
  const x = (pixelWidth - width) / 2;
  const y = (pixelHeight - height) / 2;

  ctx.clearRect(0, 0, pixelWidth, pixelHeight);
  ctx.drawImage(image, x, y, width, height);
}

export default function HeroSequence({ onNavigate }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const pinRef = useRef(null);
  const imagesRef = useRef([]);
  const activeFrameRef = useRef(0);
  const rafRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const progress = useMemo(() => {
    return Math.round(((loadedCount + failedCount) / FRAME_COUNT) * 100);
  }, [loadedCount, failedCount]);

  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const images = imagesRef.current;
    const image =
      images[frameIndex] ||
      images.find((candidate, index) => index <= frameIndex && candidate) ||
      images.find(Boolean);

    if (!canvas || !context || !image) {
      return;
    }

    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => {
      drawContainedImage(context, image, canvas, "cover");
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = pinRef.current;
    if (!canvas || !wrapper) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, wrapper.clientWidth);
    const height = Math.max(1, wrapper.clientHeight);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    renderFrame(activeFrameRef.current);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true);
      return undefined;
    }

    let isCancelled = false;
    let nextIndex = 0;
    let loaded = 0;
    let failed = 0;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const concurrentLoads = isMobile ? 4 : 8;

    const loadFrame = (index) =>
      new Promise((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          imagesRef.current[index] = image;
          loaded += 1;
          if (!isCancelled) {
            setLoadedCount(loaded);
            if (index === 0) {
              resizeCanvas();
            }
            if (loaded >= 36 || loaded + failed === FRAME_COUNT) {
              setIsReady(true);
            }
          }
          resolve();
        };
        image.onerror = () => {
          failed += 1;
          if (!isCancelled) {
            setFailedCount(failed);
            if (loaded >= 1 || loaded + failed === FRAME_COUNT) {
              setIsReady(true);
            }
          }
          resolve();
        };
        image.src = framePath(index + 1);
      });

    const worker = async () => {
      while (!isCancelled && nextIndex < FRAME_COUNT) {
        const index = nextIndex;
        nextIndex += 1;
        await loadFrame(index);
      }
    };

    Array.from({ length: concurrentLoads }, worker);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  });

  useLayoutEffect(() => {
    if (!isReady || prefersReducedMotion || loadedCount === 0) {
      return undefined;
    }

    const isMobile = window.innerWidth <= 768;
    const scrollDistance = isMobile ? "+=220%" : "+=340%";

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        pin: pinRef.current,
        start: "top top",
        end: scrollDistance,
        scrub: isMobile ? 0.3 : 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextFrame = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1))),
          );
          const nextStoryIndex = Math.min(
            storyMoments.length - 1,
            Math.floor(self.progress * storyMoments.length),
          );

          if (nextFrame !== activeFrameRef.current) {
            activeFrameRef.current = nextFrame;
            renderFrame(nextFrame);
          }

          setStoryIndex((current) => (current === nextStoryIndex ? current : nextStoryIndex));
        },
      });
    }, heroRef);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isReady, loadedCount, prefersReducedMotion]);

  const activeStory = storyMoments[storyIndex];

  const handleOpenBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  const handleScrollTo = (event, targetId) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (prefersReducedMotion) {
    return (
      <section className="hero hero-static" id="home" aria-label="Hotel Pumerai Honnavar">
        <img
          src={framePath(1)}
          alt="Hotel Pumerai boutique 3-star property on NH-66 Honnavar Karnataka"
          className="hero-static-img"
        />
        <div className="hero-copy">
          <div className="hero-trust-badge">
            <span className="trust-star">&#9733; 10/10 Exceptional</span>
            <span className="trust-sep">&bull;</span>
            <span>Google Stays &bull; 40 Rooms</span>
          </div>
          <p className="hero-eyebrow">HOTEL PUMERAI &bull; NH-66 HONNAVAR</p>
          <h1 className="hero-heading">A quiet boutique hotel on Karnataka&apos;s coast</h1>
          <p className="hero-subtitle">
            Hotel Pumerai is a 3-star hotel on NH-66 near Ramateertha Cross in Honnavar, Karnataka,
            5 km from Kasarkod Beach and 2.8 km from Sharavati River, with 40 rooms, an indoor pool, and two on-site restaurants.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="button-primary hero-btn-primary"
              onClick={handleOpenBookingModal}
            >
              CHECK AVAILABILITY
            </button>
            <a
              href="#rooms"
              className="button-secondary hero-btn-secondary"
              onClick={(e) => handleScrollTo(e, "rooms")}
            >
              VIEW ROOMS &amp; RATES
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="home" ref={heroRef} aria-label="Hotel Pumerai Honnavar">
      <div className="hero-pin" ref={pinRef}>
        <canvas ref={canvasRef} aria-label="Interactive 240-frame sequence through Hotel Pumerai on NH-66" />

        {!isReady && (
          <div className="loading-screen" aria-live="polite">
            <p className="loading-logo">HOTEL PUMERAI</p>
            <span className="loading-caption">
              Honnavar, Karnataka &bull; NH-66 Near Ramateertha Cross
            </span>
            <div className="loading-track">
              <i style={{ width: `${progress}%` }} />
            </div>
            <small>{progress}%</small>
          </div>
        )}

        {isReady && loadedCount === 0 && (
          <div className="fallback-message">
            <p className="loading-logo">HOTEL PUMERAI</p>
            <span>Welcome to Hotel Pumerai, Honnavar. Explore rooms and dining below.</span>
          </div>
        )}

        <div className={`hero-copy ${isReady ? "is-visible" : ""}`} key={storyIndex}>
          {/* Trust Signal Badge directly in hero */}
          <div className="hero-trust-badge">
            <span className="trust-star">&#9733; 10/10 Exceptional</span>
            <span className="trust-sep">&bull;</span>
            <span>Google Stays &bull; 40 Rooms &bull; 3-Star Property</span>
          </div>

          <p className="hero-eyebrow">{activeStory.eyebrow}</p>
          <h1 className="hero-heading">{activeStory.title}</h1>
          <p className="hero-subtitle">{activeStory.copy}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="button-primary hero-btn-primary"
              onClick={handleOpenBookingModal}
              aria-label="Check Room Availability and Book Direct"
            >
              CHECK AVAILABILITY
            </button>
            <a
              href="#rooms"
              className="button-secondary hero-btn-secondary"
              onClick={(e) => handleScrollTo(e, "rooms")}
            >
              VIEW ROOMS &amp; RATES
            </a>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
