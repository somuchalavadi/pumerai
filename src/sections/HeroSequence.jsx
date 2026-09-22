import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_COUNT, framePath } from "../utils/frames.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

const storyMoments = [
  {
    eyebrow: "PUMERAI",
    title: "A quiet place to stay",
    copy: "Contemporary hospitality on the coastal road of Honnavar.",
  },
  {
    eyebrow: "ARRIVE · NH-66",
    title: "A coastal stopover",
    copy: "The highway softens into sun-washed courtyard spaces, open air, and calm.",
  },
  {
    eyebrow: "LEISURE & POOL",
    title: "Resort-style comfort",
    copy: "An outdoor glass-edge swimming pool framed by western coastal breezes.",
  },
  {
    eyebrow: "HONNAVAR",
    title: "A base for exploring",
    copy: "Thoughtful spaces designed for travellers discovering Karnataka's coast.",
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

function HeroSequence({ onNavigate }) {
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
    const scrollDistance = isMobile ? "+=230%" : "+=380%";

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

  const handleScrollTo = (event, targetId) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (prefersReducedMotion) {
    return (
      <section className="hero hero-static" id="home" aria-label="Hotel Pumerai">
        <img
          src={framePath(1)}
          alt="Hotel Pumerai exterior on NH-66 Honnavar"
          className="hero-static-img"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-eyebrow">PUMERAI</p>
          <h1 className="hero-heading">A quiet place to stay</h1>
          <span className="hero-subtitle">
            Contemporary hospitality on the coastal road of Honnavar.
          </span>
          <div className="hero-actions">
            <a
              href="#about"
              className="hero-btn-primary"
              onClick={(e) => handleScrollTo(e, "about")}
            >
              EXPLORE PUMERAI
            </a>
            <a
              href="#rooms"
              className="hero-btn-secondary"
              onClick={(e) => handleScrollTo(e, "rooms")}
            >
              VIEW ROOMS
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="home" ref={heroRef} aria-label="Hotel Pumerai">
      <div className="hero-pin" ref={pinRef}>
        <canvas ref={canvasRef} aria-label="Cinematic 240-frame sequence through Hotel Pumerai" />
        <div className="hero-shade" />

        {!isReady && (
          <div className="loading-screen" aria-live="polite">
            <p className="loading-logo">PUMERAI</p>
            <span className="loading-caption">
              Contemporary hospitality on the coastal road of Honnavar
            </span>
            <div className="loading-track">
              <i style={{ width: `${progress}%` }} />
            </div>
            <small>{progress}%</small>
          </div>
        )}

        {isReady && loadedCount === 0 && (
          <div className="fallback-message">
            <p className="loading-logo">PUMERAI</p>
            <span>The hotel story is available below while the visual sequence connects.</span>
          </div>
        )}

        <div className={`hero-copy ${isReady ? "is-visible" : ""}`} key={storyIndex}>
          <p className="hero-eyebrow">{activeStory.eyebrow}</p>
          <h1 className="hero-heading">{activeStory.title}</h1>
          <span className="hero-subtitle">{activeStory.copy}</span>
          <div className="hero-actions">
            <a
              href="#about"
              className="hero-btn-primary"
              onClick={(e) => handleScrollTo(e, "about")}
            >
              EXPLORE PUMERAI
            </a>
            <a
              href="#rooms"
              className="hero-btn-secondary"
              onClick={(e) => handleScrollTo(e, "rooms")}
            >
              VIEW ROOMS
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

export default HeroSequence;
