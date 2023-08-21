import { Card, Radio } from "@aomdev/ui";
import { IconCheck, IconX } from "@tabler/icons-react";

type PropTypes = {
  conditions: { label: string; value: string }[];
  condition: string;
  title: string;
  id: string;
  onCondition: (id: string, condition: string) => void;
};

export function TaskCard({ title, id, conditions, onCondition, condition }: PropTypes) {
  return (
    <Card className="card2 ring-0">
      <div className="flex gap-2 items-start">
        <div
          className={`w-6 h-6 ${
            condition === "good"
              ? "bg-success-500 ring-success-500"
              : condition === "medium"
              ? "bg-warn-500 ring-warn-500"
              : condition === "bad"
              ? "bg-error-500 ring-error-500"
              : "bg-white ring-neutral-100"
          } rounded-full text-white flex items-center justify-center ring-1 `}
        >
          {condition === "good" ? (
            <IconCheck size={"75%"} className={`${!condition && "hidden"}`} />
          ) : (
            <IconX size={"75%"} className={`${!condition && "hidden"}`} />
          )}
        </div>
        <label htmlFor={`${title}-checkbox`} className="text-lg text-gray-800 select-none font-medium">
          {title}
        </label>
      </div>

      <form className="card-description">
        <fieldset className="col-span-2 mb-4">
          <legend className="text-gray-800  mb-4">Condition</legend>
          <Radio onValueChange={value => onCondition(id, value)} value={condition}>
            {conditions.map(condition => {
              return <Radio.Item key={condition.value} value={condition.value} label={condition.label} />;
            })}
          </Radio>
        </fieldset>
      </form>
    </Card>
  );
}
