const fadeIn: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
const fadeOut: Keyframe[] = [{ opacity: 1 }, { opacity: 0 }];
const slideInFrom: (x?: string, y?: string) => Keyframe[] = (
  x: string = "0",
  y: string = "0"
) => {
  return [
    {
      opacity: 0,
      transform: `translate3d(${x},${y},0)`,
      transformOrigin: "top",
    },
    {
      opacity: 1,
      transform: "translate3d(0,0,0)",
      transformOrigin: "top",
    },
  ];
};
const slideOutFrom: (x?: string, y?: string) => Keyframe[] = (
  x: string = "0",
  y: string = "0"
) => {
  return [
    {
      opacity: 1,
      pointerEvents: "none",
      transform: "translate3d(0,0,0)",
      transformOrigin: "top",
    },
    {
      opacity: 0,
      pointerEvents: "none",
      transform: `translate3d(${x},${y},0)`,
      transformOrigin: "top",
    },
  ];
};

const increaseHeight: (maxHeight: string) => Keyframe[] = (
  maxHeight: string
) => {
  return [
    {
      maxHeight: "0px",
      overflow: "hidden",
    },
    {
      maxHeight,
      overflow: "hidden",
    },
  ];
};
const increaseWidth: (maxWidth: string) => Keyframe[] = (maxWidth: string) => {
  return [
    {
      maxWidth: "0px",
      overflow: "hidden",
    },
    {
      maxWidth,
      overflow: "hidden",
    },
  ];
};
const decreaseWidth: (maxWidth: string) => Keyframe[] = (maxWidth: string) => {
  return [
    {
      maxWidth,
      overflow: "hidden",
    },
    {
      maxWidth: "0px",
      overflow: "hidden",
    },
  ];
};
const decreaseHeight: (maxHeight: string) => Keyframe[] = (
  maxHeight: string
) => {
  return [
    {
      maxHeight,
      overflow: "hidden",
    },
    {
      maxHeight: "0px",
      overflow: "hidden",
    },
  ];
};
export const KeyframesUtils = {
  fadeIn,
  fadeOut,
  increaseWidth,
  increaseHeight,
  decreaseHeight,
  decreaseWidth,
  slideInFrom,
  slideOutFrom,
};
