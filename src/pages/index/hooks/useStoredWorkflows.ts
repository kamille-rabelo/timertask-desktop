import { useEffect, useRef } from "react";
import {
  defaultWorkflows,
  useWorkflowsState,
  type Workflow,
} from "../states/workflows";

const localStorageKey = "timertasks:workflows";

export function useStoredWorkflows() {
  const workflows = useWorkflowsState((props) => props.state.workflows);
  const setWorkflowsState = useWorkflowsState(
    (props) => props.actions.setWorkflowsState,
  );
  const hasHydratedRef = useRef<boolean>(false);
  const workflowsRef = useRef<Workflow[]>(workflows);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedWorkflows = localStorage.getItem(localStorageKey);
    if (!storedWorkflows) {
      setWorkflowsState(defaultWorkflows);
      hasHydratedRef.current = true;
      return;
    }

    try {
      const parsedWorkflows = JSON.parse(storedWorkflows) as Workflow[];
      const normalizedWorkflows = parsedWorkflows.filter(
        (workflow) => workflow && workflow.id && workflow.title,
      );

      if (normalizedWorkflows.length === 0) {
        setWorkflowsState(defaultWorkflows);
      } else {
        setWorkflowsState(normalizedWorkflows);
      }
      hasHydratedRef.current = true;
    } catch {
      setWorkflowsState(defaultWorkflows);
      hasHydratedRef.current = true;
    }
  }, [setWorkflowsState]);

  useEffect(() => {
    workflowsRef.current = workflows;
  }, [workflows]);

  useEffect(() => {
    if (!hasHydratedRef.current) return;
    if (typeof window === "undefined") return;
    localStorage.setItem(localStorageKey, JSON.stringify(workflowsRef.current));
  }, [hasHydratedRef, workflows]);

  return workflows;
}
