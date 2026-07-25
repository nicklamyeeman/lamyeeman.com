export type SheetColor = "red" | "blue" | "green" | "purple" | "orange";

export interface Sheet {
  id: string;
  numero: string;
  numbers: number[];
  color: SheetColor;
}

export interface SheetData {
  numero: string;
  numbers: number[];
  color: SheetColor;
}

export interface DrawSession {
  id: string;
  numbers: number[];
}

export interface CurrentDraw {
  id: string;
  numbers: number[];
}

export interface ExportedData {
  version: 1;
  currentDraw: CurrentDraw;
  sessions: DrawSession[];
  sheets: Sheet[];
}

export interface Summary {
  total: number;
  colorCounts: Record<SheetColor, number>;
  groups: { count: number; total: number }[];
}

export const LOTOQUINE_STORAGE_KEYS = {
  currentDraw: "lotoquine_current_draw_v1",
  sessions: "lotoquine_sessions_v1",
  sheets: "lotoquine_sheets_v1",
} as const;

export const SHEET_COLOR_OPTIONS: { value: SheetColor; swatchClass: string }[] =
  [
    { value: "red", swatchClass: "bg-red-500" },
    { value: "blue", swatchClass: "bg-blue-500" },
    { value: "green", swatchClass: "bg-green-500" },
    { value: "orange", swatchClass: "bg-orange-500" },
    { value: "purple", swatchClass: "bg-purple-500" },
  ];
