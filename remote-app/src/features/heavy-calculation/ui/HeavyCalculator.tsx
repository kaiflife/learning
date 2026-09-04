import { useState, useEffect, useRef } from "react";

export function HeavyCalculator() {
  const [status, setStatus] = useState<"idle" | "calculating" | "done">("idle");
  const [result, setResult] = useState<number | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Магия Vite: собираем и инициализируем worker как нативный ESM-модуль
    workerRef.current = new Worker(
      new URL("../model/heavy.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (event: MessageEvent<number>) => {
      setResult(event.data);
      setStatus("done");
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const startCalculation = () => {
    if (!workerRef.current) return;

    setStatus("calculating");
    workerRef.current.postMessage(50000000);
  };

  return (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-md max-w-md">
      <h3 className="text-lg font-semibold text-slate-200 mb-3">
        Фоновые вычисления (Web Worker)
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        При клике запустится цикл на 50 млн итераций. Основной поток интерфейса
        останется полностью свободным.
      </p>

      <button
        onClick={startCalculation}
        disabled={status === "calculating"}
        className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
      >
        {status === "calculating"
          ? "Считаю в фоне..."
          : "Запустить тяжелый расчет"}
      </button>

      {status === "done" && (
        <div className="mt-4 text-emerald-400 font-medium bg-emerald-500/10 p-3 border border-emerald-500/20 rounded-lg">
          Результат расчетов:{" "}
          <span className="font-bold text-white">{result?.toFixed(4)}</span>
        </div>
      )}
    </div>
  );
}
