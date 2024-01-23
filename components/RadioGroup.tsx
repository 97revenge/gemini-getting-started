import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo({ ...props }) {
  return (
    <RadioGroup
      defaultValue="comfortable"
      className="pb-2 pl-1"
      {...props}
    ></RadioGroup>
  );
}
