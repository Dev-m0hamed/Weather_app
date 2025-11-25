export function toF(c) {
  return (c * 9) / 5 + 32;
}

export function toC(f) {
  return ((f - 32) * 5) / 9;
}

export function kmhToMph(v) {
  return v / 1.609;
}

export function mmToInch(mm) {
  return mm / 25.4;
}
