"use client";

import { useState } from "react";
import { TaskCard } from "./task-card";
import { ActionIcon, Button, Checkbox, Select } from "@aomdev/ui";
import { IconCheck } from "@tabler/icons-react";

const allTasks = [
  {
    title: "Vérif pneus",
    checked: false,
    description: ""
  },
  {
    title: "Vérif rétroviseurs",
    checked: false,
    description: ""
  },
  {
    title: "Vérif portes",
    checked: false,
    description: ""
  },
  {
    title: "Vérif moteur",
    checked: false,
    description: ""
  }
];

type PropTypes = {
  onNext: () => void;
};

export function TaskList({ onNext }: PropTypes) {
  const [tasks, setTasks] = useState(allTasks);
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "completed"
      ? tasks.filter(task => task.checked)
      : filter === "incomplete"
      ? tasks.filter(task => !task.checked)
      : tasks;

  const onToggle = (title: string) => {
    const newTasks = tasks.map(task => {
      return {
        ...task,
        checked: title === task.title ? !task.checked : task.checked
      };
    });
    setTasks(newTasks);
  };

  const completed = tasks.filter(task => task.checked);

  return (
    <>
      <div className="tasksfiltre">
        <Select
          value={filter}
          onValueChange={setFilter}
          items={[
            { label: "Tout", value: "all" },
            { label: "Complété", value: "completed" },
            { label: "Interminé", value: "incomplete" }
          ]}
        />
        <span className="text-gray-600 font-medium">
          {completed.length}/{tasks.length} tâches
        </span>
      </div>
      <div className="CARD">
        {filteredTasks.map((task, index) => {
          return (
            <TaskCard key={index} description={task.description} title={task.title}>
              <Checkbox
                checked={task.checked}
                onCheckedChange={() => onToggle(task.title)}
                id={`${task.title}-checkbox`}
                name={task.title}
                style={{ borderRadius: "50%" }}
                className="rounded-full"
              />
              {/* <ActionIcon
                onClick={() => onToggle(task.title)}
                className={`${
                  task.checked ? "bg-primary-600" : "bg-white ring-1 ring-neutral-100"
                } text-white `}
              >
                {task.checked ? <IconCheck size={"75%"} /> : null}
              </ActionIcon> */}
            </TaskCard>
          );
        })}
      </div>
      <Button
        disabled={completed.length !== tasks.length}
        onClick={onNext}
        fullWidth
        size="sm"
        className="rounded-full mt-6"
      >
        Suivant
      </Button>
    </>
  );
}
