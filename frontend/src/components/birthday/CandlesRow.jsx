import React, { useEffect, useState } from "react";

// Simple inline candles with sequential lighting used in hero area
export const CandlesRow = ({ triggerKey }) => {
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!triggerKey) return undefined;
    let index = 0;
    const id = setInterval(() => {
      index += 1;
      setLitCount(index);
      if (index >= 3) clearInterval(id);
    }, 320);
    return () => {
      clearInterval(id);
      setLitCount(0);
    };
  }, [triggerKey]);

  return (
    <div className="mt-4 flex items-end justify-center gap-2" aria-hidden="true">
      {[0, 1, 2].map((i) => {
        const isLit = i < litCount;
        return (
          <div key={i} className="flex flex-col items-center">
            <div className="h-6 w-2 rounded-sm bg-muted">
              <div className="mx-auto mt-[-6px] h-1 w-0.5 rounded-full bg-muted-foreground" />
            </div>
            <div
              className={
                "mt-[-10px] h-3 w-3 rounded-full bg-accent transition-opacity duration-200 " +
                (isLit ? "opacity-100 shadow-glow-secondary" : "opacity-20")
              }
            />
          </div>
        );
      })}
    </div>
  );
};
