self.onmessage = (event) => {
  const operationsCount = event.data;
  let result = 0;

  for (let i = 0; i < operationsCount; i++) {
    result += Math.sin(i) * Math.cos(i);
  }

  self.postMessage(result);
};
