export function toNumber(value, fallback = 0) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const cleaned = typeof value === "string" ? value.replace(/,/g, "") : value;
  const numeric = Number(cleaned);
  return Number.isNaN(numeric) ? fallback : numeric;
}

export function toCommas(value) {
  const numericValue = toNumber(value, 0);
  return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
