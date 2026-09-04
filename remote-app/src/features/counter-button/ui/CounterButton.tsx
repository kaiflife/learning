import { useState } from "react";

export function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-3 font-medium text-white shadow-[0_4px_20px_rgba(99,102,241,0.2)] transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] active:scale-95 cursor-pointer"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />

        <span className="tracking-wide text-sm font-sans select-none">
          Компонент из Remote App
        </span>

        <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-black/20 px-1.5 text-xs font-bold font-mono text-indigo-200 transition-colors group-hover:bg-black/30 group-hover:text-white">
          {count}
        </span>
      </button>
    </div>
  );
}
