export function toF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export function kmhToMph(v) {
  return v / 1.609;
}

export function mmToInch(mm) {
  return Math.round((mm / 25.4));
}
