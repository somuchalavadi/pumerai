/**
 * Hotel Pumerai — Homepage Hero Scroll Animation Frame Sequence
 * Exclusively supplies JPG frame assets for HeroSequence.jsx.
 */

const heroFrameModules = import.meta.glob("../../frames/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

export const HERO_FRAME_PATHS = Object.entries(heroFrameModules)
  .map(([path, source]) => {
    const match = path.match(/(\d+)(?=\.jpg$)/i);
    return { frameNumber: match ? Number(match[1]) : Number.NaN, source };
  })
  .filter(({ frameNumber }) => Number.isFinite(frameNumber))
  .sort((first, second) => first.frameNumber - second.frameNumber)
  .map(({ source }) => source);

export const HERO_FRAME_COUNT = HERO_FRAME_PATHS.length;

export function heroFramePath(frameNumber) {
  const frameIndex = Math.max(0, Math.min(HERO_FRAME_COUNT - 1, Math.round(frameNumber) - 1));
  return HERO_FRAME_PATHS[frameIndex];
}
