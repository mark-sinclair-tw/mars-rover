export function arraysEqual<T>(left: T[], right: T[]) {
  if (left === right) return true;
  if (left == null || right == null) return false;
  if (left.length !== right.length) return false;

  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) return false;
  }
  return true;
}
