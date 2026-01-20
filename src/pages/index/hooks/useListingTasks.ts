import type { ListingTask } from "../components/IndexTasks/utils";
import { useTasksState } from "../states/tasks";
import { useWorkflowsState } from "../states/workflows";

interface UseListingTasksProps {
  inExecutionTaskId: string | null;
}

export function useListingTasks({ inExecutionTaskId }: UseListingTasksProps) {
  const tasks = useTasksState((props) => props.state.tasks);
  const selectedWorkflowId = useWorkflowsState(
    (props) => props.state.selectedWorkflowId,
  );
  const workflowTasks = selectedWorkflowId
    ? tasks.filter((task) => task.workflowId === selectedWorkflowId)
    : [];
  const activeTask = inExecutionTaskId
    ? workflowTasks.find((task) => task.id === inExecutionTaskId) || null
    : null;
  const listingTasks: ListingTask[] =
    inExecutionTaskId && activeTask ? activeTask.subtasks : workflowTasks;
  const activeTasks = listingTasks.filter((task) => !task.completed);
  const completedTasks = listingTasks.filter((task) => task.completed);

  return {
    tasks: workflowTasks,
    listingTasks,
    activeTasks,
    completedTasks,
  };
}
