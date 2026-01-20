import { useState } from "react";
import { Button } from "../../../../../../layout/components/atoms/Button";
import { Input } from "../../../../../../layout/components/atoms/Input";
import { useWorkflowsState } from "../../../../states/workflows";

export function IndexWorkflowFooter() {
  const [newWorkflowTitle, setNewWorkflowTitle] = useState("");
  const workflowActions = useWorkflowsState((props) => props.actions);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewWorkflowTitle(event.target.value);
  }

  function handleAdd() {
    if (newWorkflowTitle.trim()) {
      workflowActions.addWorkflow(newWorkflowTitle);
      setNewWorkflowTitle("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={newWorkflowTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="New workflow"
        className="h-9 text-xs"
      />
      <Button
        type="button"
        onClick={handleAdd}
        className="h-9 px-4 py-2 text-xs"
      >
        Add
      </Button>
    </div>
  );
}
