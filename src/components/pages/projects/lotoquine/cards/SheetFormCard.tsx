"use client";

import { SHEET_COLOR_OPTIONS, SheetColor, SheetData } from "@/types/lotoquine";
import { Card, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  SHEET_MAX_NUMBER_LENGTH,
  SHEET_MAX_NUMBER_VALUE,
  SHEET_MIN_NUMBER_VALUE,
} from "../utils";

const EMPTY_NUMBERS = Array.from({ length: SHEET_MAX_NUMBER_LENGTH }, () => "");

const SheetFormCard: React.FC<{
  title: string | React.ReactElement;
  existingNumeros: string[];
  initial?: SheetData;
  onCancel: () => void;
  onConfirm: (data: {
    numero: string;
    numbers: number[];
    color: SheetColor;
  }) => void;
}> = ({ title, existingNumeros, initial, onCancel, onConfirm }) => {
  const [numero, setNumero] = useState(initial?.numero ?? "");
  const [numbers, setNumbers] = useState<string[]>(
    initial ? initial.numbers.map((number) => String(number)) : EMPTY_NUMBERS,
  );
  const [color, setColor] = useState<SheetColor>(initial?.color ?? "red");
  const [error, setError] = useState<React.ReactElement | null>(null);

  const updateNumber = useCallback(
    (index: number, value: string) => {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 2);
      setNumbers((prev) =>
        prev.map((number, prevIdx) =>
          prevIdx === index ? digitsOnly : number,
        ),
      );
    },
    [setNumbers],
  );

  const handleSubmit = useCallback(() => {
    const trimmedNumero = numero.trim();
    if (!trimmedNumero) {
      setError(
        <FormattedMessage id="Projects.Lotoquine.Sheet.Form.Error.Numero.Missing" />,
      );
      return;
    }
    if (
      trimmedNumero !== initial?.numero &&
      existingNumeros.some((n) => n === trimmedNumero)
    ) {
      setError(
        <FormattedMessage id="Projects.Lotoquine.Sheet.Form.Error.Numero.Existing" />,
      );
      return;
    }
    const parsed = numbers.map((number) => parseInt(number, 10));
    if (parsed.some((number) => Number.isNaN(number))) {
      setError(
        <FormattedMessage
          id="Projects.Lotoquine.Sheet.Form.Error.Numbers.Missing"
          values={{ max: SHEET_MAX_NUMBER_LENGTH }}
        />,
      );
      return;
    }
    if (
      parsed.some(
        (number) =>
          number < SHEET_MIN_NUMBER_VALUE || number > SHEET_MAX_NUMBER_VALUE,
      )
    ) {
      setError(
        <FormattedMessage
          id="Projects.Lotoquine.Sheet.Form.Error.Numbers.Range"
          values={{ min: SHEET_MIN_NUMBER_VALUE, max: SHEET_MAX_NUMBER_VALUE }}
        />,
      );
      return;
    }
    if (new Set(parsed).size !== SHEET_MAX_NUMBER_LENGTH) {
      setError(
        <FormattedMessage
          id="Projects.Lotoquine.Sheet.Form.Error.Numbers.Duplicate"
          values={{ max: SHEET_MAX_NUMBER_LENGTH }}
        />,
      );
      return;
    }
    setError(null);
    onConfirm({ numero: trimmedNumero, numbers: parsed, color });
  }, [numero, numbers, color]);

  return (
    <Card className="w-full gap-4 flex flex-col sm:max-w-md max-h-[90vh] overflow-y-auto rounded-b-none md:rounded-b-xl rounded-t-xl bg-stone-50 px-4 py-5 shadow-xl">
      <Typography component="h3" className="text-xl font-bold text-stone-900">
        {title}
      </Typography>
      <div className="flex flex-col gap-1.5">
        <Typography className="text-sm font-medium text-stone-600">
          <FormattedMessage id="Projects.Lotoquine.Sheet.Form.Numero" />
        </Typography>
        <input
          type="text"
          inputMode="numeric"
          value={numero}
          onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
          placeholder="ex:11505"
          className="px-3 py-2 text-sm border rounded-lg border-stone-200 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography className="text-sm font-medium text-stone-600">
          <FormattedMessage
            id="Projects.Lotoquine.Sheet.Form.Numbers"
            values={{
              maxNumbers: SHEET_MAX_NUMBER_LENGTH,
              min: SHEET_MIN_NUMBER_VALUE,
              max: SHEET_MAX_NUMBER_VALUE,
            }}
          />
        </Typography>
        <div className="grid grid-cols-5 gap-2">
          {numbers.map((number, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              value={number}
              onChange={(e) => updateNumber(index, e.target.value)}
              className="py-2 text-sm text-center border rounded-lg border-stone-200 focus:border-indigo-500 focus:outline-none"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography className="text-sm font-medium text-stone-600">
          <FormattedMessage id="Projects.Lotoquine.Sheet.Form.Color" />
        </Typography>
        <div className="flex gap-2">
          {SHEET_COLOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setColor(option.value)}
              aria-label={option.value}
              className={`h-8 w-8 rounded-lg ${option.swatchClass} ${
                color === option.value
                  ? "ring-2 ring-offset-2 ring-stone-900"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
      {error && (
        <Typography className="my-2 text-sm font-medium text-rose-600">
          {error}
        </Typography>
      )}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onCancel}
          className="cursor-pointer flex-1 rounded-lg border bg-stone-200 hover:bg-stone-300 border-stone-200 py-2.5 active:scale-[0.98]"
        >
          <Typography className="text-sm font-medium text-stone-600">
            <FormattedMessage id="Main.Lang.Cancel" />
          </Typography>
        </button>
        <button
          onClick={handleSubmit}
          className="border cursor-pointer flex-1 rounded-lg py-2.5 active:scale-[0.98] border-emerald-500 bg-emerald-600 hover:bg-emerald-700"
        >
          <Typography className="text-sm font-medium text-stone-50">
            <FormattedMessage id="Main.Lang.Confirm" />
          </Typography>
        </button>
      </div>
    </Card>
  );
};

export const SheetFormCardModalWrapper: React.FC<{
  title?: string;
  initial?: SheetData;
  existingNumeros?: string[];
  onCancel: () => void;
  onConfirm: (data: {
    numero: string;
    numbers: number[];
    color: SheetColor;
  }) => void;
}> = ({ title, initial, existingNumeros = [], onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <SheetFormCard
        title={
          title || <FormattedMessage id="Projects.Lotoquine.Sheet.Form.Title" />
        }
        initial={initial}
        existingNumeros={existingNumeros}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};
