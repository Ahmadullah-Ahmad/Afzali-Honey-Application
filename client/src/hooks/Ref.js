import { useEffect, useRef } from "react";

export function useOutSide({ Close }) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClose(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          Close?.();
        }
      }
      document.addEventListener("click", handleClose, true);

      return () => document.removeEventListener("click", handleClose, true);
    },
    [Close]
  );

  return { ref };
}
