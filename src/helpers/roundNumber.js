export function round(value, precision) {
  if (Number.isInteger(precision)) {
    const shift = Math.pow(10, precision);
    // Limited preventing decimal issue
    return Math.round(value * shift + 0.00000000000001) / shift;
  }
  return Math.round(value);
}
