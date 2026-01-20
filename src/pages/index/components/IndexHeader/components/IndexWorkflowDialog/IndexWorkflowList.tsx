import { useStoredWorkflows } from "../../../../hooks/useStoredWorkflows";
import { IndexWorkflowListItem } from "./IndexWorkflowListItem.tsx";

export function IndexWorkflowList() {
  const workflows = useStoredWorkflows();

  return (
    <>
      {workflows.map((workflow) => {
        const isDeleteDisabled = workflows.length <= 1;

        return (
          <IndexWorkflowListItem
            key={workflow.id}
            workflowId={workflow.id}
            workflowTitle={workflow.title}
            isDeleteDisabled={isDeleteDisabled}
          />
        );
      })}
    </>
  );
}
