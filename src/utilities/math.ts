export const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const constrain = (val: number, low: number, high: number) => {
  if (val < low) return low;
  if (val > high) return high;
  return val;
};

/**
 * based on lodash random
 * https://github.com/lodash/lodash/blob/master/random.js
 */
export function random(lower: number, upper: number, floating: boolean): number;
export function random(lower: number, floating: boolean): number;
export function random(lower: number, upper: number): number;
export function random(upper: number): number;
export function random(lower?: number, upper?: number | boolean, floating?: boolean): number {
  let u: number = typeof upper === 'number' ? upper : 1;
  let l: number = lower ?? 0;
  const f: boolean = (() => {
    if (typeof floating !== 'boolean') {
      if (typeof upper === 'boolean') {
        return upper ?? 0;
      }
      if (typeof lower === 'boolean') {
        return lower ?? 0;
      }
    }
    return floating as boolean;
  })();
  if (upper === undefined && lower !== undefined) {
    u = lower ?? 0;
    l = 0;
  }
  if (l > u) {
    const temp = l;
    l = u;
    u = temp;
  }
  if (f || l % 1 || u % 1) {
    const rand = Math.random();
    const randLength = `${rand}`.length - 1;
    return Math.min(l + rand * (u - l + parseFloat(`1e-${randLength}`)), u);
  }
  return l + Math.floor(Math.random() * (u - l + 1));
}
