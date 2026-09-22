export const FRAME_COUNT = 240;

export function framePath(frameNumber) {
  return `/frames/pumerai_${String(frameNumber).padStart(4, "0")}.webp`;
}

export const editorialFrames = {
  exteriorWide: framePath(1),
  arrival: framePath(64),
  pool: framePath(96),
  lobby: framePath(120),
  dining: framePath(142),
  matsya: framePath(142),
  madhura: framePath(136),
  madira: framePath(148),
  detail: framePath(154),
  passage: framePath(178),
  roomOne: framePath(198),
  roomTwo: framePath(206),
  roomThree: framePath(218),
  roomFour: framePath(232),
  coast: framePath(32),
  scenic: framePath(48),
};
