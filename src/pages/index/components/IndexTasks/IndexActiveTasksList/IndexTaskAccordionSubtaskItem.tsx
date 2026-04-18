import { Check, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../../../../../layout/components/atoms/Input";
import { useTasksState, type SubTask } from "../../../states/tasks";

interface IndexTaskAccordionSubtaskItemProps {
  taskId: string;
  subtask: SubTask;
  className?: string;
}

interface IndexTaskAccordionSubtaskItemState {
  isEditing: boolean;
  title: string;
}

export function IndexTaskAccordionSubtaskItem({
  taskId,
  subtask,
  className,
}: IndexTaskAccordionSubtaskItemProps) {
  const deleteSubtask = useTasksState((store) => store.actions.deleteSubtask);
  const saveEditingSubtask = useTasksState(
    (store) => store.actions.saveEditingSubtask,
  );
  const [state, setState] = useState<IndexTaskAccordionSubtaskItemState>({
    isEditing: false,
    title: subtask.title,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, title: subtask.title }));
  }, [subtask.title]);

  function handleStartEditing() {
    setState((prev) => ({ ...prev, isEditing: true }));
  }

  function handleCancelEditing() {
    setState((prev) => ({ ...prev, isEditing: false, title: subtask.title }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setState((prev) => ({ ...prev, title: value }));
  }

  function handleSave() {
    if (!state.title.trim()) {
      return;
    }

    saveEditingSubtask(subtask.id, state.title, taskId);
    setState((prev) => ({ ...prev, isEditing: false }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave();
      return;
    }

    if (e.key === "Escape") {
      handleCancelEditing();
    }
  }

  function handleDelete() {
    deleteSubtask(subtask.id, taskId);
  }

  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-3 rounded-lg border border-[var(--theme-border-current)]/50 bg-[var(--theme-surface-current)] px-3 py-2",
        className,
      )}
    >
      {state.isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <Input
            value={state.title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="flex-1 h-9"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-2 text-[var(--theme-accent-current)]/70 hover:text-[var(--theme-accent-current)] transition-colors"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={handleCancelEditing}
            className="p-2 text-Red-400 hover:text-Red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={
              subtask.completed
                ? "text-[var(--theme-subtext-current)] line-through text-sm"
                : "text-[var(--theme-subtext-current)] text-sm"
            }
          >
            {subtask.title}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleStartEditing}
              className="text-Yellow-400 hover:text-Yellow-500 transition-all p-1"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-Red-400 hover:text-Red-500 transition-all p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
