import { Select } from "../../../../../layout/components/atoms/Select";

interface IndexWorkflowSelectorOption {
  label: string;
  value: string;
}

interface IndexWorkflowSelectorProps {
  options: IndexWorkflowSelectorOption[];
  value?: string;
  isDisabled: boolean;
  onChange: (value: string) => void;
}

export function IndexWorkflowSelector({
  options,
  value,
  isDisabled,
  onChange,
}: IndexWorkflowSelectorProps) {
  return (
    <Select.Root
      options={options}
      value={value ?? undefined}
      onValueChange={onChange}
      disabled={isDisabled}
    >
      <Select.Trigger className="h-10 min-w-[50px] text-xs">
        <Select.DisplayValue placeholder="Select workflow" />
      </Select.Trigger>
    </Select.Root>
  );
}
