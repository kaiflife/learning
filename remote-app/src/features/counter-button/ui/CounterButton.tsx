import { useState } from "react";

export function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Кнопка из Remote App (Кликов: {count})
    </button>
  );
}
