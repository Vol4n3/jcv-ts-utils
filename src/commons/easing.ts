import { NumberUtils } from "./number-utils";

const { PI } = NumberUtils;
export type EasingCallback = (
  onValue: (value: number) => void,
  onFinish: () => void
) => void;
export type EasingFunction = (n: number) => number;
export type EasingOption = {
  easing: EasingFunction;
  start: number;
  scale: number;
  time: number;
};
export const createEasing = ({
  easing,
  time,
  start,
  scale,
}: EasingOption): EasingCallback => {
  let currentTime = 0;
  return (onValue, onFinish) => {
    const ratio = ++currentTime / time;
    if (currentTime > time) {
      return onFinish();
    }
    return onValue(start + easing(ratio) * scale);
  };
};
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

function bounceOut(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

export const Easing = {
  easeShake(amount: number, inverse?: boolean): EasingFunction {
    return function (t: number) {
      return Math.sin(t * amount * PI) * (inverse ? -1 : 1);
    };
  },
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  easeInElastic: (x: number) =>
    x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4),
  easeOutElastic: (x: number) =>
    x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1,
  easeInOutElastic: function (x: number) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  easeInBounce: function (x: number) {
    return 1 - bounceOut(1 - x);
  },
  easeOutBounce: bounceOut,
  easeInOutBounce: function (x: number) {
    return x < 0.5
      ? (1 - bounceOut(1 - 2 * x)) / 2
      : (1 + bounceOut(2 * x - 1)) / 2;
  },
};
