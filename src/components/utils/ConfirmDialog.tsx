"use client";

import { Card, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const ConfirmDialog: React.FC<{
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  danger = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-950/50 p-4"
      onClick={onCancel}
    >
      <Card
        className="flex flex-col w-full max-w-sm gap-4 px-4 py-5 bg-white shadow-xl rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Typography component="h3" className="text-lg font-semibold">
          {title}
        </Typography>
        {description && (
          <Typography className="text-sm text-stone-500">
            {description}
          </Typography>
        )}
        <div className="flex gap-3 mt-2">
          <button
            onClick={onCancel}
            className="cursor-pointer flex-1 rounded-lg border bg-stone-200 hover:bg-stone-300 border-stone-200 py-2.5 active:scale-[0.98]"
          >
            <Typography className="text-sm font-medium text-stone-600">
              {cancelLabel || <FormattedMessage id="Main.Lang.Cancel" />}
            </Typography>
          </button>
          <button
            onClick={onConfirm}
            className={`border cursor-pointer flex-1 rounded-lg py-2.5 active:scale-[0.98] ${
              danger
                ? "border-rose-500 bg-rose-600 hover:bg-rose-700"
                : "border-emerald-500 bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            <Typography className="text-sm font-medium text-stone-50">
              {confirmLabel || <FormattedMessage id="Main.Lang.Confirm" />}
            </Typography>
          </button>
        </div>
      </Card>
    </div>
  );
};
