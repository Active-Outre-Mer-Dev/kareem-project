"use client";

import { useState } from "react";
import { TaskCard } from "./task-card";
import { Button, Checkbox, Select } from "@aomdev/ui";
import { AllTasks } from "@/app/page";

type PropTypes = {
  onNext: () => void;
  allTasks: AllTasks;
  onTasks: (tasks: AllTasks) => void;
};

export function TaskList({ onNext, allTasks, onTasks }: PropTypes) {
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

  const onDescription = (title: string, description: string) => {
    const newTasks = tasks.map(task => {
      return {
        ...task,
        description: title === task.title ? description : task.description
      };
    });
    setTasks(newTasks);
  };

  const completed = tasks.filter(task => task.checked);

  const onComplete = () => {
    onNext();
    onTasks(tasks);
  };

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
            <TaskCard
              key={index}
              description={task.description}
              title={task.title}
              onDescription={onDescription}
            >
              <Checkbox
                checked={task.checked}
                onCheckedChange={() => onToggle(task.title)}
                id={`${task.title}-checkbox`}
                name={task.title}
                style={{ borderRadius: "50%" }}
                className="rounded-full"
              />
            </TaskCard>
          );
        })}
      </div>
      <Button
        disabled={completed.length !== tasks.length}
        onClick={onComplete}
        fullWidth
        size="sm"
        className="rounded-full mt-6"
      >
        Suivant
      </Button>
    </>
  );
}
