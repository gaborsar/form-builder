export function getRelativePath(pathA: string, pathB: string): string {
  const p1 = pathA.split("/");
  const p2 = pathB.split("/");
  let i = 0;
  const l = Math.min(p1.length, p2.length);
  while (i < l && p1[i] === p2[i]) {
    i++;
  }
  return p1
    .slice(i, -1)
    .map(() => "..")
    .concat(p2.slice(i))
    .join("/");
}
