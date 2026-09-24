import { useState, useEffect } from "react";

/**
 * Responsive room image component that loads real photography from
 * /public/rooms/[slug]/[photo].jpg, with seamless fallback to property frames
 * if custom photos have not been added yet.
 */
export default function RoomImage({ src, fallback, alt, className = "", loading = "lazy" }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallback);
    setHasFailed(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasFailed && fallback && imgSrc !== fallback) {
      setHasFailed(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={handleError}
    />
  );
}
