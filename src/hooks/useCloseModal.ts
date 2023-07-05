import { RefObject, useEffect, useRef } from "react";

export const useCloseModal = (
  handler?: () => void,
  listenCapturing = true
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler?.();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler?.();
    };

    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [ref, handler]);

  return ref;
};
