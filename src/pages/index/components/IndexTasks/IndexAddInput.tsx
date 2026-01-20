import { useState } from "react";
import { Button } from "../../../../layout/components/atoms/Button";
import { Input } from "../../../../layout/components/atoms/Input";
import { useTasksState } from "../../states/tasks";
import type { TaskListingMode } from "./utils";

interface IndexAddInputProps {
  listingMode: TaskListingMode;
  taskId?: string | null;
}

export function IndexAddInput({ listingMode, taskId }: IndexAddInputProps) {
  const [title, setTitle] = useState("");
  const addTask = useTasksState((props) => props.actions.addTask);
  const addSubtask = useTasksState((props) => props.actions.addSubtask);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleAdd() {
    if (title.trim()) {
      if (listingMode === "tasks-group") {
        addTask(title);
      } else if (taskId) {
        addSubtask(taskId, title);
      }
      setTitle("");
    }
  }

  return (
    <div className="flex gap-3">
      <Input
        placeholder={
          listingMode === "tasks-group"
            ? "Create task group..."
            : "Add a new task..."
        }
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button onClick={handleAdd} className="w-auto px-6 py-2">
        Add
      </Button>
    </div>
  );
}
