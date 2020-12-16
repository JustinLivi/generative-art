export const dist = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const constrain = (val: number, low: number, high: number) => {
  if (val < low) return low;
  if (val > high) return high;
  return val;
};

export const random = (low: number, high: number) => Math.random() * (high - low) + low;
