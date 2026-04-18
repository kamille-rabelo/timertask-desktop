import { Settings } from "lucide-react";
import { Dialog } from "../../../../../../layout/components/atoms/Dialog";
import { IndexWorkflowFooter } from "./IndexWorkflowFooter.tsx";
import { IndexWorkflowList } from "./IndexWorkflowList.tsx";

export function IndexWorkflowDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button
          type="button"
          className="flex items-center p-2 justify-center rounded-xl border border-[var(--theme-secondary-current)] bg-[var(--theme-secondary-current)] text-White transition-colors hover:opacity-90"
        >
          <Settings className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Content title="Workflows" description="Manage your workflow list">
        <div className="flex flex-col gap-3">
          <IndexWorkflowList />
        </div>
        <Dialog.Footer>
          <IndexWorkflowFooter />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
