import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../../../../../../layout/components/atoms/Input";
import { useWorkflowsState } from "../../../../states/workflows";

interface IndexWorkflowListItemProps {
  workflowId: string;
  workflowTitle: string;
  isDeleteDisabled: boolean;
}

interface IndexWorkflowListItemState {
  isEditing: boolean;
  editingTitle: string;
}

export function IndexWorkflowListItem({
  workflowId,
  workflowTitle,
  isDeleteDisabled,
}: IndexWorkflowListItemProps) {
  const workflowActions = useWorkflowsState((props) => props.actions);
  const [state, setState] = useState<IndexWorkflowListItemState>({
    isEditing: false,
    editingTitle: "",
  });

  function handleStartEditing() {
    setState((prev) => ({
      ...prev,
      isEditing: true,
      editingTitle: workflowTitle,
    }));
  }

  function handleCancelEditing() {
    setState((prev) => ({
      ...prev,
      isEditing: false,
      editingTitle: "",
    }));
  }

  function handleSaveEditing() {
    workflowActions.editWorkflow(workflowId, state.editingTitle);
    handleCancelEditing();
  }

  function handleDelete() {
    workflowActions.deleteWorkflow(workflowId);
  }

  function handleEditingTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setState((prev) => ({
      ...prev,
      editingTitle: event.target.value,
    }));
  }

  function handleEditingKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSaveEditing();
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-Black-100 bg-White px-4 py-3 dark:bg-Black-700 dark:border-Black-600">
      {state.isEditing ? (
        <Input
          value={state.editingTitle}
          onChange={handleEditingTitleChange}
          onKeyDown={handleEditingKeyDown}
          className="h-9 text-xs"
        />
      ) : (
        <span className="text-sm font-medium text-Black-700 dark:text-White truncate">
          {workflowTitle}
        </span>
      )}
      <div className="flex items-center gap-1">
        {state.isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSaveEditing}
              className="flex h-8 w-8 items-center justify-center rounded-full text-Green-400 transition-colors hover:bg-Green-100"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleCancelEditing}
              className="flex h-8 w-8 items-center justify-center rounded-full text-Black-300 transition-colors hover:bg-Black-100 dark:hover:bg-Black-600"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleStartEditing}
              className="flex h-8 w-8 items-center justify-center rounded-full text-Yellow-500 transition-colors hover:bg-Yellow-100 dark:hover:bg-Yellow-400/20"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleteDisabled}
              className="flex h-8 w-8 items-center justify-center rounded-full text-Red-400 transition-colors hover:bg-Red-100 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-Red-400/20"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
