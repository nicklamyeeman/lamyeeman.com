import { CurrentDraw, Sheet } from "@/types/lotoquine";

export const SHEET_MIN_NUMBER_VALUE = 1;
export const SHEET_MAX_NUMBER_VALUE = 90;
export const SHEET_MAX_NUMBER_LENGTH = 15;

export function newDraw(): CurrentDraw {
  return { id: crypto.randomUUID(), numbers: [] };
}

export function matchedCount(sheet: Sheet, drawn: number[]) {
  return sheet.numbers.filter((n) => drawn.includes(n)).length;
}
