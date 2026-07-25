"use client";

import { Sheet, SHEET_COLOR_OPTIONS, SheetColor } from "@/types/lotoquine";
import { Typography } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { SHEET_MAX_NUMBER_LENGTH } from "../utils";

const COLOR_BG: Record<SheetColor, string> = {
  red: "border-red-200 bg-red-50",
  blue: "border-blue-200 bg-blue-50",
  green: "border-green-200 bg-green-50",
  purple: "border-pruple-200 bg-purple-50",
  orange: "border-orange-200 bg-orange-50",
};

export const SheetCard: React.FC<{
  sheet: Sheet;
  drawnNumbers: number[];
  onDelete: () => void;
  onColorChange: (color: SheetColor) => void;
}> = ({ sheet, drawnNumbers, onColorChange, onDelete }) => {
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  const drawnCount = sheet.numbers.filter((n) =>
    drawnNumbers.includes(n),
  ).length;
  const isWinner = drawnCount === SHEET_MAX_NUMBER_LENGTH;

  return (
    <div
      className={`relative rounded-2xl border p-4 shadow-sm ${
        isWinner ? "border-amber-400 bg-amber-50" : COLOR_BG[sheet.color]
      }`}
    >
      <button
        onClick={onDelete}
        className="absolute flex items-center justify-center border rounded-full shadow-md shadow-stone-400 w-7 h-7 text-stone-50 border-rose-500 hover:bg-rose-700 -right-2 -top-2 bg-rose-600 active:scale-95"
      >
        ✕
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setColorMenuOpen((o) => !o)}
              className={`h-5 w-5 rounded ${
                SHEET_COLOR_OPTIONS.find((o) => o.value === sheet.color)
                  ?.swatchClass
              }`}
            />
            {colorMenuOpen && (
              <div className="absolute left-0 top-7 z-10 flex gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 shadow-md shadow-stone-400">
                {SHEET_COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onColorChange(option.value);
                      setColorMenuOpen(false);
                    }}
                    aria-label={option.value}
                    className={`h-6 w-6 rounded ${option.swatchClass}`}
                  />
                ))}
              </div>
            )}
          </div>
          <Typography className="text-sm font-semibold text-stone-800">
            <FormattedMessage
              id="Projects.Lotoquine.Sheet.Card.Title"
              values={{
                numero: sheet.numero,
              }}
            />
          </Typography>
        </div>
        <Typography
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isWinner ? "bg-amber-400 text-amber-950" : "bg-white text-stone-500"
          }`}
        >
          {drawnCount} / {SHEET_MAX_NUMBER_LENGTH}
        </Typography>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {sheet.numbers.map((number, index) => {
          const checked = drawnNumbers.includes(number);
          return (
            <Typography
              key={index}
              className={`flex h-9 items-center justify-center rounded-lg text-sm font-medium ${
                checked
                  ? "bg-teal-600 text-stone-50"
                  : "bg-white text-stone-600 outline outline-offset-0 outline-1 outline-stone-500"
              }`}
            >
              {number}
            </Typography>
          );
        })}
      </div>
    </div>
  );
};
