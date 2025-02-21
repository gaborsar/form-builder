import cs from "classnames";
import React from "react";
import "./Slider.css";

// TODO breakup

interface SliderProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const Slider: React.FunctionComponent<SliderProps> = React.memo(
  ({ name, options, value, onFocus = noop, onBlur = noop, onChangeValue }) => {
    const [isFocused, setFocused] = React.useState(false);

    const index = React.useMemo(
      () =>
        Math.max(
          options.findIndex((option) => option.value === value),
          0,
        ),
      [options, value],
    );

    const containerRef = React.useRef<HTMLDivElement>(null);
    const isMouseDownRef = React.useRef(false);

    React.useEffect(() => {
      const handler = (event: Event) => {
        event.preventDefault();
        const { current: container } = containerRef;
        if (container !== null) {
          container.focus();
        }
      };
      const label = document.querySelector(`label[for="${name}"]`);
      if (label !== null) {
        label.addEventListener("mousedown", handler);
      }
      return () => {
        if (label !== null) {
          label.removeEventListener("mousedown", handler);
        }
      };
    }, [name]);

    const onFocusInner = React.useCallback(() => {
      setFocused(true);
      onFocus();
    }, [onFocus]);

    const onBlurInner = React.useCallback(() => {
      setFocused(false);
      onBlur();
    }, [onBlur]);

    const onChangeValueInner = React.useCallback(
      (nextValue: string) => {
        if (nextValue !== value) {
          onChangeValue(nextValue);
        }
      },
      [value, onChangeValue],
    );

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        event.stopPropagation();
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          const nextIndex = Math.max(index - 1, 0);
          onChangeValueInner(options[nextIndex].value);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          const nextIndex = Math.min(index + 1, options.length - 1);
          onChangeValueInner(options[nextIndex].value);
        }
      },
      [options, index, onChangeValueInner],
    );

    const onMouseMove = React.useCallback(
      ({ clientX }: React.MouseEvent | MouseEvent) => {
        const { current: container } = containerRef;
        if (container !== null) {
          const { x = 0, width } = container.getBoundingClientRect();
          const relativeClientX = clientX - x;
          const stepCount = options.length - 1;
          const stepSize = width / stepCount;
          const stepIndex = Math.max(
            Math.min(Math.floor((relativeClientX + stepSize / 2) / stepSize), stepCount),
            0,
          );
          onChangeValueInner(options[stepIndex].value);
        }
      },
      [options, onChangeValueInner],
    );

    const onMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        isMouseDownRef.current = true;
        onMouseMove(event);
        window.addEventListener("mousemove", onMouseMove);
      },
      [onMouseMove],
    );

    const onMouseUp = React.useCallback(() => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        window.removeEventListener("mousemove", onMouseMove);
      }
    }, [onMouseMove]);

    React.useEffect(() => {
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mouseup", onMouseUp);
      };
    });

    return (
      <div
        ref={containerRef}
        className={cs("dfrm-slider", {
          "dfrm-slider--focused": isFocused,
        })}
        tabIndex={0}
        onFocus={onFocusInner}
        onBlur={onBlurInner}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
      >
        <div className="dfrm-slider__rail" />
        <div className="dfrm-slider__tick-container">
          {options.map(({ value }, i) => (
            <div
              key={value}
              className="dfrm-slider__tick"
              style={{
                left: getLeftPosByIndex(options.length, i),
              }}
            />
          ))}
        </div>
        <div className="dfrm-slider__label-container">
          {options.map(({ value, label }, i) => (
            <div
              key={value}
              className="dfrm-slider__label"
              style={{
                left: getLeftPosByIndex(options.length, i),
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          className="dfrm-slider__thumb"
          style={{
            left: getLeftPosByIndex(options.length, index),
          }}
        />
      </div>
    );
  },
);

function getLeftPosByIndex(numberOfOptions: number, index: number): string {
  return `calc((100% - 12px) * ${index / (numberOfOptions - 1)} + 6px)`;
}
