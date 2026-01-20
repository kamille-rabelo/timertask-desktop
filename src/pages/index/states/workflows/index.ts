import { create } from "zustand";

export interface Workflow {
  id: string;
  title: string;
}

export const defaultWorkflows: Workflow[] = [
  {
    id: "workflow-work",
    title: "Work",
  },
  {
    id: "workflow-personal",
    title: "Personal",
  },
];

export interface WorkflowsState {
  workflows: Workflow[];
  selectedWorkflowId: string | null;
}

interface WorkflowsActions {
  setWorkflowsState: (workflows: Workflow[]) => void;
  setSelectedWorkflowId: (workflowId: string) => void;
  addWorkflow: (title: string) => void;
  editWorkflow: (workflowId: string, title: string) => void;
  deleteWorkflow: (workflowId: string) => void;
}

interface WorkflowsStore {
  state: WorkflowsState;
  actions: WorkflowsActions;
}

export const useWorkflowsState = create<WorkflowsStore>((set, get) => {
  function resolveSelectedWorkflowId(
    workflows: Workflow[],
    selectedWorkflowId: string | null,
  ) {
    if (workflows.length === 0) {
      return null;
    }

    if (selectedWorkflowId) {
      const hasSelectedWorkflow = workflows.some(
        (workflow) => workflow.id === selectedWorkflowId,
      );
      if (hasSelectedWorkflow) {
        return selectedWorkflowId;
      }
    }

    return workflows[0].id;
  }

  function setState(partial: Partial<WorkflowsState>) {
    set((store) => ({
      state: {
        workflows: partial.workflows ?? store.state.workflows,
        selectedWorkflowId:
          partial.selectedWorkflowId ?? store.state.selectedWorkflowId,
      },
      actions: store.actions,
    }));
  }

  function setWorkflowsState(workflows: Workflow[]) {
    const nextSelectedWorkflowId = resolveSelectedWorkflowId(
      workflows,
      get().state.selectedWorkflowId,
    );

    setState({
      workflows: workflows,
      selectedWorkflowId: nextSelectedWorkflowId,
    });
  }

  function setSelectedWorkflowId(workflowId: string) {
    const workflows = get().state.workflows;
    const hasWorkflow = workflows.some(
      (workflow) => workflow.id === workflowId,
    );
    if (!hasWorkflow) {
      return;
    }

    setState({
      selectedWorkflowId: workflowId,
    });
  }

  function addWorkflow(title: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const newWorkflow: Workflow = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
    };

    const workflows = [...get().state.workflows, newWorkflow];
    const nextSelectedWorkflowId = resolveSelectedWorkflowId(
      workflows,
      get().state.selectedWorkflowId,
    );

    setState({
      workflows: workflows,
      selectedWorkflowId: nextSelectedWorkflowId,
    });
  }

  function editWorkflow(workflowId: string, title: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    set((store) => ({
      state: {
        workflows: store.state.workflows.map((workflow) =>
          workflow.id === workflowId
            ? { ...workflow, title: trimmedTitle }
            : workflow,
        ),
        selectedWorkflowId: store.state.selectedWorkflowId,
      },
      actions: store.actions,
    }));
  }

  function deleteWorkflow(workflowId: string) {
    const workflows = get().state.workflows;
    if (workflows.length <= 1) {
      return;
    }

    const filteredWorkflows = workflows.filter(
      (workflow) => workflow.id !== workflowId,
    );
    const nextSelectedWorkflowId = resolveSelectedWorkflowId(
      filteredWorkflows,
      get().state.selectedWorkflowId === workflowId
        ? null
        : get().state.selectedWorkflowId,
    );

    setState({
      workflows: filteredWorkflows,
      selectedWorkflowId: nextSelectedWorkflowId,
    });
  }

  return {
    state: {
      workflows: [],
      selectedWorkflowId: null,
    },
    actions: {
      setWorkflowsState,
      setSelectedWorkflowId,
      addWorkflow,
      editWorkflow,
      deleteWorkflow,
    },
  };
});
