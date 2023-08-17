import { ActionIcon, Card, TextInput, Button, Radio } from "@aomdev/ui";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

type PropTypes = {
  taskDescription?: string;
  conditions: { label: string; value: string }[];
  condition: string;
  title: string;
  id: string;
  onDescription: (id: string, desc: string) => void;
  onCondition: (id: string, condition: string) => void;
};

export function TaskCard({
  taskDescription,
  title,
  onDescription,
  id,
  conditions,
  onCondition,
  condition
}: PropTypes) {
  const [edit, setEdit] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    onDescription(id, formData.get("feedback")?.toString() || "");
    setEdit(false);
  };

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
      <div className="flex justify-end">
        <ActionIcon onClick={() => setEdit(prev => !prev)}>
          <IconChevronDown className={`${edit ? "rotate-180" : ""} duration-200 ease-out`} />
        </ActionIcon>
      </div>
      {edit ? (
        <form className="card-description" onSubmit={onSubmit}>
          <fieldset className="col-span-2 mb-4">
            <legend className="text-gray-800  mb-4">Condition</legend>
            <Radio onValueChange={value => onCondition(id, value)} value={condition}>
              {conditions.map(condition => {
                return <Radio.Item key={condition.value} value={condition.value} label={condition.label} />;
              })}
            </Radio>
          </fieldset>
          <div className="flex gap-2">
            <div className="bg-white rounded-md">
              <TextInput autoFocus size={"sm"} name="feedback" id="feedback" defaultValue={taskDescription} />
            </div>
            <Button size={"sm"}>Submit</Button>
          </div>
        </form>
      ) : taskDescription ? (
        <p className="card-description text-gray-600 text-sm">{taskDescription}</p>
      ) : null}
    </Card>
  );
}
