"use client";

import { ConfirmDialog } from "@/components/utils/ConfirmDialog";
import {
  CurrentDraw,
  DrawSession,
  ExportedData,
  LOTOQUINE_STORAGE_KEYS,
  Sheet,
  SheetColor,
  Summary,
} from "@/types/lotoquine";
import { Typography } from "@mui/material";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useLocalStorageState } from "../../../../utils/useLocalStorageState";
import { SheetCard } from "./cards/SheetCard";
import { SheetFormCardModalWrapper } from "./cards/SheetFormCard";
import {
  SummaryCardModalWrapper,
  SummaryCardWrapper,
} from "./cards/SummaryCard";
import { WinningNotificationCard } from "./cards/WinningNotificationCard";
import {
  matchedCount,
  newDraw,
  SHEET_MAX_NUMBER_LENGTH,
  SHEET_MAX_NUMBER_VALUE,
  SHEET_MIN_NUMBER_VALUE,
} from "./utils";

type ConfirmAction =
  | { type: "clearDraw" }
  | { type: "deleteSession"; id: string }
  | { type: "deleteAllSessions" }
  | { type: "deleteSheet"; id: string }
  | { type: "deleteAllSheets" }
  | { type: "importData" };

const confirmContent: Record<
  ConfirmAction["type"],
  { title: React.ReactElement; description: React.ReactElement }
> = {
  clearDraw: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.ClearDraw.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.ClearDraw.Description" />
    ),
  },
  deleteSession: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.DeleteSession.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.Default.Description" />
    ),
  },
  deleteAllSessions: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.DeleteAllSessions.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.Default.Description" />
    ),
  },
  deleteSheet: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.DeleteSheet.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.Default.Description" />
    ),
  },
  deleteAllSheets: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.DeleteAllSheets.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.Default.Description" />
    ),
  },
  importData: {
    title: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.ImportData.Title" />
    ),
    description: (
      <FormattedMessage id="Projects.Lotoquine.Confirmation.ImportData.Description" />
    ),
  },
};

export const LotoquinePage: React.FC = () => {
  const [currentDraw, setCurrentDraw] = useLocalStorageState<CurrentDraw>(
    LOTOQUINE_STORAGE_KEYS.currentDraw,
    newDraw(),
  );
  const [sessions, setSessions] = useLocalStorageState<DrawSession[]>(
    LOTOQUINE_STORAGE_KEYS.sessions,
    [],
  );
  const [sheets, setSheets] = useLocalStorageState<Sheet[]>(
    LOTOQUINE_STORAGE_KEYS.sheets,
    [],
  );

  const [drawInput, setDrawInput] = useState("");
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null,
  );
  const [showManualModal, setShowManualModal] = useState(false);
  const [winningQueue, setWinningQueue] = useState<Sheet[]>([]);
  const [pendingImport, setPendingImport] = useState<ExportedData | null>(null);
  const [importError, setImportError] = useState<React.ReactElement | null>(
    null,
  );
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const prevCompleteIdsRef = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const completeIds = new Set(
      sheets
        .filter(
          (sheet) =>
            matchedCount(sheet, currentDraw.numbers) ===
            SHEET_MAX_NUMBER_LENGTH,
        )
        .map((sheet) => sheet.id),
    );
    if (prevCompleteIdsRef.current === null) {
      prevCompleteIdsRef.current = completeIds;
      return;
    }
    const newlyCompleted = sheets.filter(
      (sheet) =>
        completeIds.has(sheet.id) && !prevCompleteIdsRef.current!.has(sheet.id),
    );
    if (newlyCompleted.length > 0) {
      setWinningQueue((q) => [...q, ...newlyCompleted]);
    }
    prevCompleteIdsRef.current = completeIds;
  }, [hydrated, currentDraw.numbers, sheets]);

  const summary: Summary = useMemo(() => {
    const colorCounts: Record<SheetColor, number> = {
      red: 0,
      blue: 0,
      green: 0,
      purple: 0,
      orange: 0,
    };
    const byMatch = new Map<number, number>();
    sheets.forEach((sheet) => {
      colorCounts[sheet.color]++;
      const count = matchedCount(sheet, currentDraw.numbers);
      byMatch.set(count, (byMatch.get(count) ?? 0) + 1);
    });
    const groups = Array.from(byMatch.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([count, total]) => ({ count, total }));
    return { total: sheets.length, colorCounts, groups };
  }, [sheets, currentDraw.numbers]);

  const sortedSheets = useMemo(() => {
    return sheets
      .map((sheet, index) => ({
        sheet,
        index,
        count: matchedCount(sheet, currentDraw.numbers),
      }))
      .sort((a, b) => b.count - a.count || a.index - b.index)
      .map((data) => data.sheet);
  }, [sheets, currentDraw.numbers]);

  function handleAddDrawNumber(e: FormEvent) {
    e.preventDefault();
    const number = parseInt(drawInput, 10);
    if (
      Number.isNaN(number) ||
      number < SHEET_MIN_NUMBER_VALUE ||
      number > SHEET_MAX_NUMBER_VALUE
    )
      return;
    if (currentDraw.numbers.includes(number)) {
      setDrawInput("");
      return;
    }
    setCurrentDraw((prev) => ({ ...prev, numbers: [...prev.numbers, number] }));
    setDrawInput("");
  }

  function removeDrawnNumber(number: number) {
    setCurrentDraw((prev) => ({
      ...prev,
      numbers: prev.numbers.filter((data) => data !== number),
    }));
  }

  function executeConfirm() {
    if (!confirmAction) return;
    switch (confirmAction.type) {
      case "clearDraw": {
        if (currentDraw.numbers.length > 0) {
          setSessions((prev) => [
            {
              id: currentDraw.id,
              numbers: currentDraw.numbers,
              endedAt: Date.now(),
            },
            ...prev,
          ]);
        }
        setCurrentDraw(newDraw());
        break;
      }
      case "deleteSession":
        setSessions((prev) =>
          prev.filter((session) => session.id !== confirmAction.id),
        );
        break;
      case "deleteAllSessions":
        setSessions([]);
        break;
      case "deleteSheet":
        setSheets((prev) =>
          prev.filter((sheet) => sheet.id !== confirmAction.id),
        );
        break;
      case "deleteAllSheets":
        setSheets([]);
        break;
      case "importData":
        if (pendingImport) {
          setCurrentDraw(pendingImport.currentDraw);
          setSessions(pendingImport.sessions);
          setSheets(pendingImport.sheets);
        }
        setPendingImport(null);
        break;
    }
    setConfirmAction(null);
  }

  function handleExport() {
    const data: ExportedData = {
      version: 1,
      currentDraw,
      sessions,
      sheets,
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `lotoquine-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (
          !parsed ||
          typeof parsed !== "object" ||
          !Array.isArray(parsed.sessions) ||
          !Array.isArray(parsed.sheets) ||
          !parsed.currentDraw ||
          !Array.isArray(parsed.currentDraw.numbers)
        ) {
          setImportError(
            <FormattedMessage id="Projects.Lotoquine.Import.Error.Invalid" />,
          );
          return;
        }
        setPendingImport(parsed as ExportedData);
        setConfirmAction({ type: "importData" });
      } catch {
        setImportError(
          <FormattedMessage id="Projects.Lotoquine.Import.Error.JSON" />,
        );
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col px-4 py-4 sm:px-6">
        <div className="flex flex-col items-start justify-between w-full gap-3 md:items-end md:flex-row">
          <div>
            <Typography
              component="h1"
              className="my-2 text-xl font-extrabold tracking-wider uppercase md:my-3 md:text-2xl text-stone-900"
            >
              <FormattedMessage id="Projects.Lotoquine.Title" />
            </Typography>
            <Typography className="text-sm font-medium text-stone-500">
              <FormattedMessage id="Projects.Lotoquine.Description" />
            </Typography>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleExport}
              className="rounded-md border border-stone-300 bg-stone-200 hover:bg-stone-300 px-3 py-1.5"
            >
              <Typography className="text-xs font-medium text-stone-600">
                <FormattedMessage id="Main.Lang.Export" />
              </Typography>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-md border border-stone-300 bg-stone-200 hover:bg-stone-300 px-3 py-1.5"
            >
              <Typography className="text-xs font-medium text-stone-600">
                <FormattedMessage id="Main.Lang.Import" />
              </Typography>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              hidden
              onChange={handleImportFileChange}
            />
          </div>
        </div>
        {importError && (
          <Typography
            onClick={() => setImportError(null)}
            className="p-2 mt-2 text-xs rounded-lg bg-rose-50 text-rose-600"
          >
            {importError}
          </Typography>
        )}
      </div>

      <div className="max-w-5xl px-4 py-6 mx-auto sm:px-6 md:flex md:items-start md:gap-6">
        <aside className="hidden shrink-0 md:block md:w-64">
          <SummaryCardWrapper summary={summary} />
        </aside>

        <main className="flex-1 max-w-2xl">
          <section>
            <Typography
              component="h2"
              className="text-sm font-semibold tracking-wide uppercase text-stone-400"
            >
              <FormattedMessage id="Projects.Lotoquine.Drawn.Title" />
            </Typography>
            <form onSubmit={handleAddDrawNumber} className="flex gap-2 mt-2">
              <input
                type="text"
                inputMode="numeric"
                value={drawInput}
                onChange={(e) =>
                  setDrawInput(e.target.value.replace(/\D/g, "").slice(0, 2))
                }
                placeholder="1 - 90"
                className="flex-1 w-6 px-6 py-3 text-lg bg-white border rounded-lg border-stone-200 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="min-w-20 rounded-lg bg-indigo-600 hover:bg-indigo-700 border border-indigo-500 px-5 py-3 active:scale-[0.98]"
              >
                <Typography className="text-sm font-medium text-stone-50">
                  <FormattedMessage id="Main.Lang.Add" />
                </Typography>
              </button>
            </form>
            {currentDraw.numbers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {[...currentDraw.numbers].map((number) => (
                  <Typography
                    key={number}
                    className="flex items-center gap-1.5 rounded-full bg-indigo-100 py-1 pl-3 pr-1.5 text-sm font-medium text-indigo-700 tracking-wider"
                  >
                    {number}
                    <button
                      onClick={() => removeDrawnNumber(number)}
                      className="flex items-center justify-center w-5 h-5 bg-indigo-200 border border-indigo-100 rounded-full hover:bg-indigo-300"
                    >
                      <Typography className="text-xs font-semibold text-indigo-700">
                        ✕
                      </Typography>
                    </button>
                  </Typography>
                ))}
              </div>
            )}
            {currentDraw.numbers.length > 0 && (
              <button
                onClick={() => setConfirmAction({ type: "clearDraw" })}
                className="px-2 py-0.5 border rounded-md border-rose-600 hover:bg-stone-200 bg-stone-100 mt-2"
              >
                <Typography className="text-xs font-medium text-rose-600">
                  <FormattedMessage id="Projects.Lotoquine.Drawn.Delete" />
                </Typography>
              </button>
            )}
          </section>

          {sessions.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center justify-between">
                <Typography
                  component="h2"
                  className="text-sm font-semibold tracking-wide uppercase text-stone-400"
                >
                  <FormattedMessage id="Projects.Lotoquine.Drawn.History" />
                </Typography>
                <button
                  onClick={() =>
                    setConfirmAction({ type: "deleteAllSessions" })
                  }
                  className="px-2 py-0.5 border rounded-md border-rose-600 hover:bg-stone-200 bg-stone-100"
                >
                  <Typography className="text-xs font-medium text-rose-600">
                    <FormattedMessage id="Main.Lang.Delete.All" />
                  </Typography>
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start justify-between gap-3 p-3 bg-white border rounded-xl border-stone-200"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {session.numbers.map((number) => (
                        <Typography
                          key={number}
                          className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600 font-semibold tracking-wider"
                        >
                          {number}
                        </Typography>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "deleteSession",
                          id: session.id,
                        })
                      }
                      className="px-2 py-0.5 border rounded-md border-rose-600 hover:bg-stone-200 bg-stone-100"
                    >
                      <Typography className="text-xs font-medium text-rose-600">
                        <FormattedMessage id="Main.Lang.Delete" />
                      </Typography>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          <hr className="my-8 border-stone-200" />

          <section>
            <Typography
              component="h2"
              className="text-sm font-semibold tracking-wide uppercase text-stone-400"
            >
              <FormattedMessage id="Projects.Lotoquine.Sheets.Title" />
            </Typography>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowManualModal(true)}
                className="flex-1 rounded-xl border border-indigo-300 bg-indigo-100 py-2.5 hover:bg-indigo-200"
              >
                <Typography className="text-sm font-medium text-indigo-700">
                  <FormattedMessage id="Projects.Lotoquine.Sheets.Add" />
                </Typography>
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              {sortedSheets.map((sheet) => (
                <SheetCard
                  key={sheet.id}
                  sheet={sheet}
                  drawnNumbers={currentDraw.numbers}
                  onDelete={() =>
                    setConfirmAction({ type: "deleteSheet", id: sheet.id })
                  }
                  onColorChange={(color) =>
                    setSheets((prev) =>
                      prev.map((s) =>
                        s.id === sheet.id ? { ...s, color } : s,
                      ),
                    )
                  }
                />
              ))}
              {sortedSheets.length === 0 && (
                <Typography className="text-sm text-stone-400">
                  <FormattedMessage id="Projects.Lotoquine.Sheets.Empty" />
                </Typography>
              )}
            </div>

            {sheets.length > 0 && (
              <button
                onClick={() => setConfirmAction({ type: "deleteAllSheets" })}
                className="mt-6 w-full px-4 py-2.5 border rounded-lg border-rose-600 hover:bg-stone-200 bg-stone-100"
              >
                <Typography className="text-sm font-medium text-rose-600">
                  <FormattedMessage id="Projects.Lotoquine.Sheets.Delete.All" />
                </Typography>
              </button>
            )}
          </section>
        </main>
      </div>
      <button
        onClick={() => setShowSummaryModal(true)}
        className="fixed z-40 px-4 py-3 border rounded-full shadow-lg border-stone-700 bottom-5 right-5 bg-stone-800 hover:bg-stone-900 md:hidden"
      >
        <Typography className="text-sm font-medium text-stone-50">
          <FormattedMessage
            id="Projects.Lotoquine.Summary.Button"
            values={{
              sheets: summary.total,
            }}
          />
        </Typography>
      </button>

      {showSummaryModal && (
        <SummaryCardModalWrapper
          summary={summary}
          onClose={() => setShowSummaryModal(false)}
        />
      )}

      {showManualModal && (
        <SheetFormCardModalWrapper
          existingNumeros={sheets.map((s) => s.numero)}
          onCancel={() => setShowManualModal(false)}
          onConfirm={({ numero, numbers, color }) => {
            setSheets((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                numero,
                numbers,
                color,
              },
            ]);
            setShowManualModal(false);
          }}
        />
      )}

      {confirmAction && (
        <ConfirmDialog
          title={confirmContent[confirmAction.type].title}
          description={confirmContent[confirmAction.type].description}
          onCancel={() => setConfirmAction(null)}
          onConfirm={executeConfirm}
        />
      )}

      <WinningNotificationCard
        queue={winningQueue}
        onDismissTop={() => setWinningQueue((q) => q.slice(1))}
      />
    </div>
  );
};
