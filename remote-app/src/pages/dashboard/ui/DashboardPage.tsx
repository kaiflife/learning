import { HeavyCalculator } from "@/features/heavy-calculation";

export function DashboardPage() {
  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-sky-400 mb-2">
        📊 Дашборд из Микрофронтенда
      </h2>
      <p className="text-slate-400">
        Эти стили Tailwind v4 полностью изолированы и долетают до
        Host-приложения!
      </p>
      <HeavyCalculator />
    </div>
  );
}
