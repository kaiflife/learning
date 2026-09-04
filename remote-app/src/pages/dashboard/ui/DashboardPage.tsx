import { HeavyCalculator } from "@/features/heavy-calculation/ui/HeavyCalculator";
import { useUserStore } from "@/shared/lib/store/externalStore";

export function DashboardPage() {
  const { name, isPremium, changeName, togglePremium } = useUserStore() as any;

  return (
    <div className="p-6 bg-slate-950 text-slate-100 rounded-xl shadow-lg border border-slate-800 space-y-6">
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-xl font-bold text-sky-400 mb-2">
          👤 Zustand Стор в Микрофронтенде
        </h2>
        <p className="text-slate-300">
          Текущий пользователь:{" "}
          <span className="font-bold text-white text-lg">{name}</span>
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Статус: {isPremium ? "🌟 Premium Аккаунт" : "Обычный пользователь"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => changeName("Новое Имя из Микрофронтенда!")}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Изменить имя
          </button>
          <button
            onClick={togglePremium}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer"
          >
            Переключить статус
          </button>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6">
        <HeavyCalculator />
      </div>
    </div>
  );
}
