"use client";

import { Sheet } from "@/types/lotoquine";
import { Card, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const WinningNotificationCard: React.FC<{
  queue: Sheet[];
  onDismissTop: () => void;
}> = ({ queue, onDismissTop }) => {
  if (queue.length === 0) return null;
  const sheet = queue[0];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
      onClick={onDismissTop}
    >
      <Card
        className="flex flex-col w-full max-w-sm gap-4 px-4 py-5 text-center shadow-2xl rounded-xl bg-stone-50"
        onClick={(e) => e.stopPropagation()}
      >
        <Typography className="text-4xl">🎉</Typography>
        <Typography className="text-2xl font-bold text-stone-900">
          <FormattedMessage id="Projects.Lotoquine.WinningModal.Title" />{" "}
        </Typography>
        <Typography className="text-sm text-stone-500">
          <FormattedMessage
            id="Projects.Lotoquine.WinningModal.Sheet.Numero"
            values={{
              numero: (
                <span className="font-semibold">{sheet.numero}</span>
              ) as any,
            }}
          />
        </Typography>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {sheet.numbers.map((number, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-sm font-medium bg-teal-600 rounded-lg text-stone-50 h-9"
            >
              {number}
            </div>
          ))}
        </div>
        {queue.length > 1 && (
          <Typography className="text-xs text-stone-400">
            <FormattedMessage
              id="Projects.Lotoquine.WinningModal.Sheet.More"
              values={{
                queue: queue.length - 1,
              }}
            />
          </Typography>
        )}
        <button
          onClick={onDismissTop}
          className="border border-indigo-400 mt-5 w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 py-2.5 active:scale-[0.98]"
        >
          <Typography className="text-sm font-medium text-stone-50">
            <FormattedMessage id="Main.Lang.Close" />
          </Typography>
        </button>
      </Card>
    </div>
  );
};
