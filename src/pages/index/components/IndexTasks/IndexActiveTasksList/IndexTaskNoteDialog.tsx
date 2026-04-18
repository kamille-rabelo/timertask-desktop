import { NotebookPen, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../../../layout/components/atoms/Button";
import { Dialog } from "../../../../../layout/components/atoms/Dialog";
import { useTasksState } from "../../../states/tasks";

function getDialogTitle(taskTitle?: string) {
  return taskTitle ? `Notes for ${taskTitle}` : "Task Notes";
}

interface IndexTaskNoteDialogProps {
  taskId: string;
  className?: string;
  label?: string;
  note?: string;
  buttonClassName?: string;
}

interface IndexTaskNoteDialogState {
  isOpen: boolean;
  note: string;
}

export function IndexTaskNoteDialog({
  taskId,
  className,
  label,
  note,
  buttonClassName,
}: IndexTaskNoteDialogProps) {
  const task = useTasksState((store) =>
    store.state.tasks.find((item) => item.id === taskId),
  );
  const saveTaskNote = useTasksState((store) => store.actions.saveTaskNote);
  const [dialogState, setDialogState] = useState<IndexTaskNoteDialogState>({
    isOpen: false,
    note: note ?? task?.note ?? "",
  });

  const isDirty = dialogState.note !== (task?.note ?? "");

  useEffect(() => {
    if (!dialogState.isOpen) return;

    setDialogState((prev) => ({
      ...prev,
      note: note ?? task?.note ?? "",
    }));
  }, [dialogState.isOpen, note, task?.note]);

  function handleOpenChange(isOpen: boolean) {
    setDialogState((prev) => ({ ...prev, isOpen }));
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setDialogState((prev) => ({ ...prev, note: value }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isDirty) handleSave();
    }
  }

  function handleSave() {
    saveTaskNote(taskId, dialogState.note);
  }

  if (!task) {
    return null;
  }

  return (
    <div className={className}>
      <Dialog.Root isOpen={dialogState.isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger>
          <Button
            variant="secondary"
            className={
              buttonClassName ?? "flex items-center gap-2 p-1.5 text-xs"
            }
          >
            <NotebookPen className="w-3.5 h-3.5 text-white" />
            {label ?? ""}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content
          title={getDialogTitle(task.title)}
          description="Write a note for this task"
          className="w-[550px] max-h-[80vh] overflow-auto"
        >
          <div className="flex flex-col gap-3 max-h-[60vh] overflow-auto">
            <textarea
              autoFocus
              value={dialogState.note}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your notes here..."
              className="w-full min-h-[200px] p-4 text-sm text-[var(--theme-text-current)] placeholder:text-[var(--theme-subtext-current)] bg-[var(--theme-surface-current)] border border-[var(--theme-border-current)] rounded-xl outline-none focus:border-[var(--theme-accent-current)] focus:ring-1 focus:ring-[var(--theme-accent-current)] transition-all resize-none field-sizing-content"
            />
          </div>
          <Dialog.Footer>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={!isDirty}
                className="flex items-center gap-2 h-9 px-4 text-sm w-auto"
              >
                <Save className="w-4 h-4" />
                {isDirty ? "Save Note" : "Saved"}
              </Button>
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
