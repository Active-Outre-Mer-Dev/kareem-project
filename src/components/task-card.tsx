"use client";
import { ActionIcon, Card, TextInput, Button } from "@aomdev/ui";
import { IconCheck, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

type PropTypes = {
  children: React.ReactNode;
  taskDescription?: string;
  title: string;
  id: number;
  onDescription: (id: number, desc: string) => void;
};

export function TaskCard({ children, taskDescription, title, onDescription, id }: PropTypes) {
  const [edit, setEdit] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    onDescription(id, formData.get("feedback")?.toString() || "");
    setEdit(false);
  };

  return (
    <Card className="card2 ring-0">
      <div className="flex gap-2 items-center">
        {children}
        <label htmlFor={`${title}-checkbox`} className="text-lg text-gray-800 select-none">
          {title}
        </label>
      </div>
      <div className="flex justify-end">
        <ActionIcon onClick={() => setEdit(prev => !prev)}>
          {edit ? (
            <IconX size={"75%"} />
          ) : taskDescription ? (
            <IconPencil size={"75%"} />
          ) : (
            <IconPlus size={"75%"} />
          )}
        </ActionIcon>
      </div>
      {edit ? (
        <form className="card-description" onSubmit={onSubmit}>
          <div className="bg-white rounded-md">
            <TextInput autoFocus size={"sm"} name="feedback" id="feedback" defaultValue={taskDescription} />
          </div>
          <Button size={"sm"}>Submit</Button>
        </form>
      ) : taskDescription ? (
        <p className="card-description text-gray-600 text-sm">{taskDescription}</p>
      ) : null}
    </Card>
  );
}
