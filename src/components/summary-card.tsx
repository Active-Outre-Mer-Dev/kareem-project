import { Card, Radio } from "@aomdev/ui";
import { IconCheck, IconX } from "@tabler/icons-react";

type PropTypes = {
  title: string;
  condition: string;
  onPerson: (person: "boss" | "mechanic") => void;
  onResolved: (resolved: string) => void;
};

export function SummaryCard({ title, condition, onPerson, onResolved }: PropTypes) {
  const isFailing = condition !== "good";

  return (
    <Card className="card2 ring-0">
      <div className="flex gap-2 items-center col-span-2">
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
        <p className="text-lg ">{title}</p>
      </div>
      <div className="row-start-2 col-span-2">
        {isFailing ? (
          <>
            <form className="space-y-6">
              <fieldset>
                <legend className="mb-4 font-medium">Who did you notify?</legend>
                <Radio onValueChange={onPerson}>
                  <Radio.Item value="boss" label="Boss" />
                  <Radio.Item value="mechanic" label="Mechanic" />
                </Radio>
              </fieldset>
              <fieldset>
                <legend className="mb-4 font-medium">Was the issue resolved?</legend>
                <Radio onValueChange={onResolved}>
                  <Radio.Item value="yes" label="Yes" />
                  <Radio.Item value="no" label="No" />
                </Radio>
              </fieldset>
            </form>
          </>
        ) : null}
      </div>
    </Card>
  );
}
