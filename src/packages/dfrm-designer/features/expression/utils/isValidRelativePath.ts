export function isValidRelativePath(path: string): boolean {
  return (
    path !== "" &&
    !path.startsWith("/") &&
    !path.includes("//") &&
    !path.endsWith("..") &&
    !path.endsWith("/")
  );
}
