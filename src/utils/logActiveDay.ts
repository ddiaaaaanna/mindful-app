export function logActiveDay() {
  const activeDays = JSON.parse(localStorage.getItem("activeDays") ?? "[]");
  const today = new Date().toLocaleDateString();

  if (!activeDays.includes(today)) {
    activeDays.push(today);
    localStorage.setItem("activeDays", JSON.stringify(activeDays));
  }
}
