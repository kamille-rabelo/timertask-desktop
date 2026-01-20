import { atom } from "jotai";

interface IndexTasksPageState {
  editingTaskId: string | null;
  inExecutionTaskId: string | null;
  nonActiveExpandedTaskId: string | null;
}

export const indexTasksPageStateAtom = atom<IndexTasksPageState>({
  editingTaskId: null,
  inExecutionTaskId: null,
  nonActiveExpandedTaskId: null,
});

export const errorMessageAtom = atom("");
