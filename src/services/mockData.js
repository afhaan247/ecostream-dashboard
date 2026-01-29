export function generateEmissionData() {
  const pm25 = Math.floor(Math.random() * (150 - 30 + 1)) + 30;

  let status = "safe";
  if (pm25 > 100) status = "critical";
  else if (pm25 > 50) status = "warning";

  return {
    pm25,
    so2: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
    status,
    timestamp: new Date().toLocaleTimeString(),
  };
}
