export module Colors {
  /**
   *
   * @param red 0 - 255
   * @param green 0 - 255
   * @param blue 0 - 255
   * @param alpha 0 - 1
   * @return [0 - 1] values r g b alpha
   */
  export function toVec4(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): Float32Array {
    return new Float32Array([red / 255, green / 255, blue / 255, alpha]);
  }

  /**
   *
   * @param h hue 0 - 255
   * @param s saturation 0 -1
   * @param v value 0 -1
   */
  export function hsvToRgb(
    h: number,
    s: number,
    v: number
  ): [number, number, number] {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let rgb;
    if (h < 60) {
      rgb = [c, x, 0];
    } else if (h < 120) {
      rgb = [x, c, 0];
    } else if (h < 180) {
      rgb = [0, c, x];
    } else if (h < 240) {
      rgb = [0, x, c];
    } else if (h < 300) {
      rgb = [x, 0, c];
    } else {
      rgb = [c, 0, x];
    }
    const [r, g, b] = rgb;
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }

  /**
   *
   * @param r red 0-255
   * @param g green 0-255
   * @param b red 0-255
   */
  export function rgbToHsv(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    if (d === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / d + 6) % 6;
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h *= 60;

    const s = max === 0 ? 0 : d / max;

    const v = max / 255;

    return [h, s, v];
  }
  export function rgbInvert(r: number, g: number, b: number) {
    return [r ^ 255, g ^ 255, b ^ 255];
  }
  /**
   *
   * @param r red 0-255
   * @param g green 0-255
   * @param b red 0-255
   * @param angle in radians
   */
  export function rgbRotate(r: number, g: number, b: number, angle: number) {
    return rgbMatriceRotation(r, g, b, angleToMatriceArgument(angle));
  }
  export type MatriceArgument = [number, number, number];
  export function angleToMatriceArgument(angle: number): MatriceArgument {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const sinSqrt = Math.sqrt(1 / 3) * sin;
    const cosTierce = (1 - cos) / 3;
    return [cos + cosTierce, cosTierce - sinSqrt, cosTierce + sinSqrt];
  }
  /**
   *
   * @param r red 0-255
   * @param g green 0-255
   * @param b red 0-255
   * @param A MatriceRotate
   * @param B MatriceRotate
   * @param C MatriceRotate
   */
  export function rgbMatriceRotation(
    r: number,
    g: number,
    b: number,
    [A, B, C]: MatriceArgument
  ) {
    return [
      A * r + B * g + C * b,
      C * r + A * g + B * b,
      B * r + C * g + A * b,
    ];
  }
}
