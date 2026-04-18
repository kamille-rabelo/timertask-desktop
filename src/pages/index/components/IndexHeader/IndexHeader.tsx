import { Logo } from "../../../../layout/components/atoms/Logo";
import { useStoredWorkflows } from "../../hooks/useStoredWorkflows";
import { useWorkflowsState } from "../../states/workflows";
import { IndexDarkModeToggle } from "./components/IndexDarkModeToggle";
import { IndexThemePicker } from "./components/IndexThemePicker";
import { IndexWorkflowDialog } from "./components/IndexWorkflowDialog/IndexWorkflowDialog";
import { IndexWorkflowSelector } from "./components/IndexWorkflowSelector";

type IndexHeaderProps = {
  showOnlyLogo?: boolean;
};

export function IndexHeader({ showOnlyLogo }: IndexHeaderProps) {
  const workflows = useStoredWorkflows();
  const selectedWorkflowId = useWorkflowsState(
    (props) => props.state.selectedWorkflowId,
  );
  const workflowActions = useWorkflowsState((props) => props.actions);

  const workflowOptions = workflows.map((workflow) => ({
    label: workflow.title,
    value: workflow.id,
  }));

  function handleWorkflowChange(value: string) {
    workflowActions.setSelectedWorkflowId(value);
  }

  if (showOnlyLogo) {
    return (
      <div className="flex w-full items-center justify-center pb-4 pt-2">
        <Logo />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between pb-4 pt-2">
      <Logo />
      <div className="flex items-center gap-3">
        <IndexWorkflowSelector
          options={workflowOptions}
          value={selectedWorkflowId ?? undefined}
          isDisabled={workflowOptions.length === 0}
          onChange={handleWorkflowChange}
        />
        <IndexWorkflowDialog />
        <IndexThemePicker />
        <IndexDarkModeToggle />
      </div>
    </div>
  );
}
