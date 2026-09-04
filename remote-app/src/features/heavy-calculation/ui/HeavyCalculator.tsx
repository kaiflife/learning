// remote-app/src/features/heavy-calculation/ui/HeavyCalculator.tsx
import { useState, useEffect, useRef } from "react";

// Импортируем исходный код воркера как чистую строку (Vite подхватит это через ?raw)
// @ts-ignore
import workerCode from "../model/heavy.worker.js?raw";

export function HeavyCalculator() {
  const [status, setStatus] = useState<"idle" | "calculating" | "done">("idle");
  const [result, setResult] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    try {
      // Превращаем строку кода воркера в безопасный локальный Blob URL
      const blob = new Blob([workerCode], { type: "application/javascript" });
      const blobUrl = URL.createObjectURL(blob);

      // Создаем воркер — теперь он гарантированно запустится на любом порту без CORS и MIME ошибок!
      workerRef.current = new Worker(blobUrl);

      workerRef.current.onmessage = (event: MessageEvent<number>) => {
        setResult(event.data);
        setStatus("done");
      };
    } catch (err) {
      console.error("💥 Не удалось запустить инлайн-воркер:", err);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
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
