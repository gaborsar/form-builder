const ROW_SIZE = 12;

export function fixColumnWidths(cols: { grow: boolean; width: number }[]): void {
  // 1. calculate total width
  let totalWidth = 0;
  for (const col of cols) {
    totalWidth += col.width;
  }

  // 2. count growing columns
  let growCount = 0;
  for (const col of cols) {
    if (col.grow) {
      growCount += 1;
    }
  }

  // 3. calculate how much can columns grow equally
  const growWidth = growCount === 0 ? 0 : Math.floor((ROW_SIZE - totalWidth) / growCount);

  // 4. grow columns equally
  for (const col of cols) {
    if (col.grow) {
      col.width += growWidth;
    }
  }

  // 5. calculate empty space
  let remainingWidth = ROW_SIZE - totalWidth - growCount * growWidth;

  // 6. fill empty space
  for (let i = 0, l = cols.length; i < l && remainingWidth > 0; i++) {
    const col = cols[i];
    if (col.grow) {
      col.width += 1;
      remainingWidth -= 1;
    }
  }
}
