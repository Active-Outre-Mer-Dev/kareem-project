"use client";
import { ActionIcon, Card, TextInput, Button } from "@aomdev/ui";
import { IconCheck, IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

type PropTypes = {
  children: React.ReactNode;
  description?: string;
  title: string;
};

export function TaskCard({ children, description, title }: PropTypes) {
  const [edit, setEdit] = useState(false);
  const [feedback, setFeedback] = useState(description || "");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setFeedback(formData.get("feedback")?.toString() || "");
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
          {edit ? <IconX size={"75%"} /> : feedback ? <IconPencil size={"75%"} /> : <IconPlus size={"75%"} />}
        </ActionIcon>
      </div>
      {edit ? (
        <form className="card-description" onSubmit={onSubmit}>
          <div className="bg-white rounded-md">
            <TextInput autoFocus size={"sm"} name="feedback" id="feedback" defaultValue={feedback} />
          </div>
          <Button size={"sm"}>Submit</Button>
        </form>
      ) : feedback ? (
        <p className="card-description text-gray-600 text-sm">{feedback}</p>
      ) : null}
    </Card>
  );
}
