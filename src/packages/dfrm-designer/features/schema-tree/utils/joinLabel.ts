export function joinLabel(left: string, right: string): string {
  if (left === "") {
    return right;
  }
  if (right === "") {
    return left;
  }
  if (/^\d+\.$/.test(left)) {
    return `${left} ${right}`;
  }
  return `${left} - ${right}`;
}
