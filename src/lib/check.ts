type Condition = {
  label: string;
  value: "good" | "bad" | "medium";
};

export class Check {
  checked: false;
  condition: string;
  id: string;
  notification?: Partial<{ person: "boss" | "mechanic"; resolved: boolean }>;
  constructor(public name: string, public conditions: Condition[]) {
    this.name = name;
    this.conditions = conditions;
    this.checked = false;
    this.condition = "";
    this.id = crypto.randomUUID();
  }
}

function defaultCondition(): Condition[] {
  return [
    { label: "Good", value: "good" },
    { label: "Low", value: "bad" }
  ];
}

const gasFluid = new Check("Gas Fluid", defaultCondition());
const engineOilLevel = new Check("Engine Oil Level", defaultCondition());
const coolantLevel = new Check("Coolant Level", defaultCondition());
const brakeFluid = new Check("Brake Fluid Level", defaultCondition());
const powerSteering = new Check("Power Steering Level", defaultCondition());
const tireCondition = new Check("Tire Condition", [
  { label: "Good Condition", value: "good" },
  { label: "Worn", value: "medium" },
  { label: "Severly Worn", value: "bad" }
]);
const tirePressure = new Check("Tire Pressure", defaultCondition());
const rims = new Check("Rims Condition", [
  { label: "Good condition", value: "good" },
  { label: "Damaged", value: "medium" },
  { label: "Severly Damaged", value: "bad" }
]);

export const checks = [
  gasFluid,
  engineOilLevel,
  coolantLevel,
  brakeFluid,
  powerSteering,
  tireCondition,
  tirePressure,
  rims
];
