export function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomRange(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}
