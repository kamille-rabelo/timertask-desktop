import { useAtom } from "jotai";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../layout/components/atoms/Button";
import { Input } from "../../../../../layout/components/atoms/Input";
import { useTasksState, type SubTask, type Task } from "../../../states/tasks";
import { indexTasksPageStateAtom } from "../shared-state";
import { getActiveTask } from "../utils";
import { IndexTaskAccordionSubtaskItem } from "./IndexTaskAccordionSubtaskItem";
import { IndexTaskNoteDialog } from "./IndexTaskNoteDialog";
import { IndexEditInput } from "./shared-components/IndexEditInput";

interface IndexTaskItemProps {
  task: Task;
  isActive: boolean;
  dragHandleProps?: Record<string, unknown>;
}

export function IndexTaskItem({
  task,
  isActive,
  dragHandleProps,
}: IndexTaskItemProps) {
  const [indexTasksPageState, setIndexTasksPageState] = useAtom(
    indexTasksPageStateAtom,
  );
  const isEditing = indexTasksPageState.editingTaskId === task?.id;
  const isExpanded = indexTasksPageState.nonActiveExpandedTaskId === task.id;
  const deleteTask = useTasksState((props) => props.actions.deleteTask);
  const addSubtask = useTasksState((props) => props.actions.addSubtask);
  const activeSubtask = getActiveTask(task.subtasks) as SubTask | undefined;
  const hasSubtaskBeenStarted = activeSubtask?.timeEvents.some(
    (event) => event.type === "start",
  );
  const lastSubtaskEvent = activeSubtask?.timeEvents.length
    ? activeSubtask.timeEvents[activeSubtask.timeEvents.length - 1]
    : undefined;
  const isSubtaskTimerActive = lastSubtaskEvent?.type === "start";
  const subtaskTitleState = useState("");

  function handleEditTask(taskId: string) {
    setIndexTasksPageState((prev) => ({
      ...prev,
      editingTaskId: taskId,
    }));
  }

  function handleEnterSubtasks(taskId: string) {
    setIndexTasksPageState((prev) => ({
      ...prev,
      inExecutionTaskId: taskId,
    }));
  }

  function handleToggleExpanded(taskId: string) {
    setIndexTasksPageState((prev) => {
      const isTaskExpanded = prev.nonActiveExpandedTaskId === taskId;
      return {
        ...prev,
        nonActiveExpandedTaskId: isTaskExpanded ? null : taskId,
      };
    });
  }

  function handleSubtaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    subtaskTitleState[1](e.target.value);
  }

  function handleAddSubtask() {
    if (!subtaskTitleState[0].trim()) {
      return;
    }

    addSubtask(task.id, subtaskTitleState[0]);
    subtaskTitleState[1]("");
  }

  function handleSubtaskKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddSubtask();
    }
  }

  return (
    <>
      <div
        className={`group flex items-center justify-between p-4 rounded-[12px] bg-[var(--theme-surface-current)] border transition-all shadow-sm hover:shadow-md ${
          isActive
            ? "border-[var(--theme-accent-current)] bg-[var(--theme-accent-current)]/5"
            : "border-[var(--theme-border-current)]/50 hover:border-[var(--theme-accent-current)]/50"
        }`}
      >
        {isEditing ? (
          <IndexEditInput initialValue={task.title} listingMode="tasks-group" />
        ) : (
          <>
            <div className="flex items-center gap-4 flex-1">
              {!task.isRunning && (
                <div
                  {...dragHandleProps}
                  className="cursor-grab active:cursor-grabbing text-[var(--theme-subtext-current)] hover:text-[var(--theme-text-current)] transition-colors"
                >
                  <GripVertical className="w-5 h-5" />
                </div>
              )}
              <span
                className={`text-sm font-medium transition-colors break-all ${
                  task.completed
                    ? "text-[var(--theme-subtext-current)] line-through"
                    : isActive
                      ? "text-[var(--theme-text-current)] font-semibold"
                      : "text-[var(--theme-subtext-current)]"
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all mr-2">
                <button
                  onClick={() => handleEditTask(task.id)}
                  className="text-Yellow-400 hover:text-Yellow-500 transition-all p-2"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                {!task.isRunning && (
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-Red-400 hover:text-Red-500 transition-all p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              {isActive ? (
                <button
                  onClick={() => handleEnterSubtasks(task.id)}
                  className="text-[var(--theme-secondary-current)] hover:opacity-75 transition-all p-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => handleToggleExpanded(task.id)}
                  className="text-[var(--theme-subtext-current)] hover:text-[var(--theme-text-current)] transition-all p-2"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {activeSubtask && hasSubtaskBeenStarted && (
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--theme-surface-current)] border border-[var(--theme-border-current)]/50 rounded-lg shadow-sm text-sm font-medium text-[var(--theme-text-current)] transition-all hover:border-[var(--theme-accent-current)] hover:text-[var(--theme-accent-current)]">
            {isSubtaskTimerActive ? (
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--theme-accent-current)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-accent-current)]"></span>
              </div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-Red-400"></div>
            )}
            <span className="tabular-nums tracking-wider font-mono">
              {isSubtaskTimerActive ? "Running" : "Paused"}
            </span>
          </div>
        </div>
      )}
      {!isActive && isExpanded && (
        <div className="mt-2 flex flex-col gap-3 rounded-xl border border-[var(--theme-border-current)]/30 bg-[var(--theme-surface-current)]/50 p-3">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                value={subtaskTitleState[0]}
                onChange={handleSubtaskChange}
                onKeyDown={handleSubtaskKeyDown}
                placeholder="Add a subtask..."
                className="flex-1 h-9"
              />
              <Button onClick={handleAddSubtask} className="w-auto px-4 h-9">
                Add
              </Button>
            </div>

            {task.subtasks.length > 0 ? (
              <div className="flex flex-col gap-2">
                {task.subtasks.map((subtask) => (
                  <IndexTaskAccordionSubtaskItem
                    key={subtask.id}
                    taskId={task.id}
                    subtask={subtask}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-[var(--theme-subtext-current)]">
                No subtasks yet.
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <IndexTaskNoteDialog taskId={task.id} label="Notes" />
          </div>
        </div>
      )}
    </>
  );
}
