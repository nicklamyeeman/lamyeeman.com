"use client";

import { SHEET_COLOR_OPTIONS, SheetColor, Summary } from "@/types/lotoquine";
import { Card, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { SHEET_MAX_NUMBER_LENGTH } from "../utils";

const COLOR_LABEL: Record<SheetColor, React.ReactElement> = {
  red: <FormattedMessage id="Main.Lang.Color.Red" />,
  blue: <FormattedMessage id="Main.Lang.Color.Blue" />,
  green: <FormattedMessage id="Main.Lang.Color.Green" />,
  purple: <FormattedMessage id="Main.Lang.Color.Purple" />,
  orange: <FormattedMessage id="Main.Lang.Color.Orange" />,
};

const SummaryCardContent: React.FC<{
  summary: Summary;
}> = ({ summary }) => {
  return (
    <div className="flex flex-col gap-5">
      <Typography
        component="h2"
        className="text-sm font-semibold tracking-wide uppercase text-stone-400"
      >
        <FormattedMessage id="Projects.Lotoquine.Summary.Title" />
      </Typography>
      <div className="flex flex-col">
        <Typography className="text-2xl font-bold text-stone-900">
          {summary.total}
        </Typography>
        <Typography className="text-sm text-stone-500">
          <FormattedMessage
            id="Projects.Lotoquine.Summary.Sheets.Number"
            values={{
              sheets: summary.total,
            }}
          />
        </Typography>
      </div>
      <div className="flex flex-col gap-1">
        <Typography
          component="h3"
          className="text-xs font-semibold tracking-wide uppercase text-stone-400"
        >
          <FormattedMessage id="Projects.Lotoquine.Summary.Category.Color" />
        </Typography>
        <div className="mt-2 flex flex-col gap-1.5">
          {SHEET_COLOR_OPTIONS.map((color) => (
            <div
              key={color.value}
              className="flex items-center gap-2 text-sm text-stone-600"
            >
              <Typography
                className={`h-3.5 w-3.5 shrink-0 rounded ${color.swatchClass}`}
              />
              <Typography className="text-sm font-medium">
                {COLOR_LABEL[color.value]}
              </Typography>
              <Typography className="ml-auto text-sm font-semibold text-stone-800">
                {summary.colorCounts[color.value]}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Typography
          component="h3"
          className="text-xs font-semibold tracking-wide uppercase text-stone-400"
        >
          <FormattedMessage id="Projects.Lotoquine.Summary.Category.Drawn" />
        </Typography>
        {summary.groups.length === 0 ? (
          <Typography className="mt-2 text-xs text-stone-400">
            <FormattedMessage id="Projects.Lotoquine.Summary.Category.Drawn.Empty" />
          </Typography>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            {summary.groups.map((group) => (
              <Typography
                key={group.count}
                className="text-sm tracking-wide text-stone-600"
              >
                <FormattedMessage
                  id="Projects.Lotoquine.Summary.Category.Drawn.Sheets"
                  values={{
                    sheetsSpan: (
                      <span className="font-semibold text-stone-800">
                        {group.total}
                      </span>
                    ) as any,
                    sheets: group.total,
                    drawnSpan: (
                      <span className="font-semibold text-stone-800">
                        {group.count}/{SHEET_MAX_NUMBER_LENGTH}
                      </span>
                    ) as any,
                  }}
                />
              </Typography>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const SummaryCardWrapper: React.FC<{
  summary: Summary;
}> = ({ summary }) => {
  return (
    <Card className="px-4 py-5 border rounded-xl border-stone-200">
      <SummaryCardContent summary={summary} />
    </Card>
  );
};

export const SummaryCardModalWrapper: React.FC<{
  summary: Summary;
  onClose: () => void;
}> = ({ summary, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[65] flex items-end justify-center bg-black/50 md:hidden"
      onClick={onClose}
    >
      <Card
        className="max-h-[80vh] w-full overflow-y-auto rounded-t-xl rounded-b-none bg-stone-50 px-4 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="border rounded-md bg-stone-200 hover:bg-stone-300 border-stone-100"
          >
            <Typography className="text-sm text-stone-400">✕</Typography>
          </button>
        </div>
        <SummaryCardContent summary={summary} />
      </Card>
    </div>
  );
};
