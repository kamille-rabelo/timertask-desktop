import { ChevronDown, ChevronUp, NotebookPen, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../../../layout/components/atoms/Button";
import { useTasksState } from "../../../states/tasks";
import { IndexTaskNoteDialog } from "../IndexActiveTasksList/IndexTaskNoteDialog";

function getHeaderLabel() {
  return "Notes";
}

interface IndexTaskNoteProps {
  taskId: string;
  className?: string;
}

interface IndexTaskNoteState {
  isOpen: boolean;
  note: string;
}

export function IndexTaskNote({ taskId, className }: IndexTaskNoteProps) {
  const task = useTasksState((store) =>
    store.state.tasks.find((t) => t.id === taskId),
  );
  const saveTaskNote = useTasksState((store) => store.actions.saveTaskNote);
  const [state, setState] = useState<IndexTaskNoteState>({
    isOpen: false,
    note: task?.note ?? "",
  });

  const isDirty = state.note !== (task?.note ?? "");

  useEffect(() => {
    setState((prev) => ({ ...prev, note: task?.note ?? "" }));
  }, [task?.note]);

  function handleToggleOpen() {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setState((prev) => ({ ...prev, note: value }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isDirty) handleSave();
    }
  }

  function handleSave() {
    saveTaskNote(taskId, state.note);
  }

  if (!task) return null;

  return (
    <div
      className={twMerge(
        "mt-4 border border-[var(--theme-border-current)]/30 rounded-xl overflow-hidden",
        className,
      )}
    >
      <button
        onClick={handleToggleOpen}
        className="w-full flex items-center justify-between p-4 bg-[var(--theme-surface-current)] hover:bg-[var(--theme-border-current)]/30 transition-colors"
      >
        <div className="flex items-center gap-2 text-[var(--theme-text-current)]">
          <NotebookPen className="w-5 h-5 text-[var(--theme-accent-current)]" />
          <span className="font-semibold text-sm">{getHeaderLabel()}</span>
        </div>
        {state.isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--theme-subtext-current)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--theme-subtext-current)]" />
        )}
      </button>

      {state.isOpen && (
        <div className="p-4 bg-[var(--theme-surface-current)] border-t border-[var(--theme-border-current)]/30 flex flex-col gap-3">
          <textarea
            value={state.note}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Write your notes here..."
            className="w-full min-h-[200px] p-4 text-sm text-[var(--theme-text-current)] placeholder:text-[var(--theme-subtext-current)] bg-[var(--theme-surface-current)] border border-[var(--theme-border-current)] rounded-xl outline-none focus:border-[var(--theme-accent-current)] focus:ring-1 focus:ring-[var(--theme-accent-current)] transition-all resize-none field-sizing-content"
          />
          <div className="flex justify-end gap-2">
            <IndexTaskNoteDialog
              taskId={taskId}
              label="View"
              note={state.note}
              buttonClassName="flex items-center gap-2 h-9 px-4 text-sm w-auto"
            />
            <Button
              onClick={handleSave}
              disabled={!isDirty}
              className="flex items-center gap-2 h-9 px-4 text-sm w-auto"
            >
              <Save className="w-4 h-4" />
              {isDirty ? "Save Note" : "Saved"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
