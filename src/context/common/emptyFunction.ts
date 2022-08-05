export const emptyFunction = () => {};

export function emptyStateFunction<T>(val: T): readonly [T, typeof emptyFunction] {
  return [val, emptyFunction] as const;
}
