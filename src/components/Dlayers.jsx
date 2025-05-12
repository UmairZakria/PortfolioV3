import { useEffect, useState } from "react";

function getTopmostLayerId(layerIds) {
  const { innerWidth, innerHeight } = window;
  const x = innerWidth / 2;
  const y = innerHeight / 2;

  const elementAtPoint = document.elementFromPoint(x, y);
  if (!elementAtPoint) return null;

  for (const id of layerIds) {
    const el = document.getElementById(id);
    if (el && el.contains(elementAtPoint)) {
      return id;
    }
  }

  return null;
}

export function useTopLayer(layerIds) {
  const [topLayerId, setTopLayerId] = useState(null);

  useEffect(() => {
    const checkTopLayer = () => {
      const topId = getTopmostLayerId(layerIds);
      setTopLayerId(prev => (prev !== topId ? topId : prev));
    };

    checkTopLayer();

    const interval = setInterval(checkTopLayer, 50); // Poll every 100ms

    // Observe DOM changes
    const observer = new MutationObserver(checkTopLayer);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also listen to scroll/resize
    window.addEventListener("scroll", checkTopLayer);
    window.addEventListener("resize", checkTopLayer);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener("scroll", checkTopLayer);
      window.removeEventListener("resize", checkTopLayer);
    };
  }, [layerIds]);

  return topLayerId;
}
