// "YYYY-MM-DD" helpers shared by the date picker and booking pages
export const toKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const fromKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const daysBetween = (pickUp, dropOff) =>
  pickUp && dropOff ? Math.max(1, Math.round((fromKey(dropOff) - fromKey(pickUp)) / 86400000)) : 0;
