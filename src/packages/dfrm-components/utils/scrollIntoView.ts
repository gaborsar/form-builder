export function scrollIntoView(el: Element, smooth: boolean): void {
  const pEl = findScrollParent(el);

  if (pEl === null) {
    return;
  }

  const { top: pElTop, bottom: pElBottom } = pEl.getBoundingClientRect();
  const { top: elTop, bottom: elBottom } = el.getBoundingClientRect();

  const pElPaddingTop = Number.parseInt(
    window.getComputedStyle(pEl, null).getPropertyValue("padding-top").replace("px", ""),
    10,
  );

  if (pElTop + pElPaddingTop < elTop && pElBottom > elBottom) {
    return;
  }

  const scrollToTarget =
    pElTop + pElPaddingTop > elTop
      ? pEl.scrollTop + elTop - pElTop - pElPaddingTop
      : pEl.scrollTop + elBottom - pElBottom;

  if (pEl.scrollTo !== undefined && smooth) {
    pEl.scrollTo({ top: scrollToTarget, behavior: "smooth" });
  } else {
    pEl.scrollTop = scrollToTarget;
  }
}

function findScrollParent(el: Element): Element | null {
  const pEl = el.parentElement;

  if (pEl === null) {
    return null;
  }

  if (isScrollable(pEl)) {
    return pEl;
  }

  return findScrollParent(pEl);
}

function isScrollable(el: Element): boolean {
  const style = window.getComputedStyle(el);

  if (style.overflowX === "scroll" || style.overflowY === "scroll") {
    return true;
  }

  if (el.scrollTop !== 0) {
    return true;
  }

  el.scrollTop = 1;

  if (el.scrollTop === 0) {
    return false;
  }

  el.scrollTop = 0;

  return true;
}
