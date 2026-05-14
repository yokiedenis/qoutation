export function toCommas(value) {
  if (value === null || value === undefined || value === "") {
    return "0";
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
