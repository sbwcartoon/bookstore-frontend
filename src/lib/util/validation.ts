export function isBlank(value?: string): boolean {
  return !value?.trim()
}

export function isNotBlank(value?: string): boolean {
  return !isBlank(value);
}

export function isPositiveNaturalNumber(value: number): boolean {
  return /^(0|[1-9][0-9]*)$/.test(String(value));
}
