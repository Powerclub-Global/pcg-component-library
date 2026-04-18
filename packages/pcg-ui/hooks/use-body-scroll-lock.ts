"use client";

import { useEffect } from "react";

/**
 * Lock or unlock body scroll. Useful for modals and mobile menus.
 * Pass `true` to lock, `false` to unlock.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (locked) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [locked]);
}

export default useBodyScrollLock;
