"use client";
import { ActionIcon, Card } from "@aomdev/ui";
import { IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

type PropTypes = {
  title: string;
  description?: string;
};

export function SummaryCard({ description, title }: PropTypes) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="card2 ring-0">
      <div className="flex gap-2 items-center">
        <span className="h-2 w-2 inline-block bg-primary-600 rounded-full"></span>
        <p className="text-lg ">{title}</p>
      </div>
      <div className="flex justify-end items-center">
        <ActionIcon variant={"subtle"} onClick={() => setOpen(prev => !prev)}>
          <IconChevronUp className={`${open ? "" : "rotate-180 "} duration-200 ease-out`} />
        </ActionIcon>
      </div>
      {open ? (
        <p className="card-description-2 text-sm text-gray-600">
          {description || "Dolore nisi pariatur pariatur qui ea."}
        </p>
      ) : null}
    </Card>
  );
}
