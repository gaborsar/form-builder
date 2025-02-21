export function hasOptions(type: string): boolean {
  return (
    type === "Dropdown" ||
    type === "MultiSelect" ||
    type === "ButtonGroup" ||
    type === "Slider" ||
    type === "RadioGroup" ||
    type === "CheckboxGroup" ||
    type === "SwitchGroup"
  );
}
