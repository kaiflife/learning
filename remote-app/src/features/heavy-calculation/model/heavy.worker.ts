self.onmessage = (event: MessageEvent<number>) => {
  const operationsCount = event.data;
  let result = 0;

  // Симулируем очень тяжелое математическое вычисление (например, 50 млн итераций)
  for (let i = 0; i < operationsCount; i++) {
    result += Math.sin(i) * Math.cos(i);
  }

  // Отправляем результат вычислений обратно в React
  self.postMessage(result);
};
