export function toF(c: number) {
  return Math.round((c * 9) / 5 + 32);
}

export function kmhToMph(v: number) {
  return v / 1.609;
}

export function mmToInch(mm: number) {
  return Math.round((mm / 25.4));
}
