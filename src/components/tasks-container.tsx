"use client";
import { useRef, useState } from "react";
import { TaskList } from "./task-list";
import { SummaryCard } from "./summary-card";
import { Button } from "@aomdev/ui";
import { SuccessCard } from "./success-card";
import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

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

export type AllTasks = typeof allTasks;

export function TasksContainer() {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(allTasks);
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timer | null>(null);
  const router = useRouter();

  const onNext = () => {
    if (step === 2) return;
    setStep(prev => prev + 1);
  };

  const onTasks = (tasks: typeof allTasks) => {
    setTasks(tasks);
  };
  const onPrevious = () => {
    if (step === 0) return;
    setStep(prev => prev - 1);
  };

  const onLoad = () => {
    router.prefetch("/success");
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      router.push("/success");
    }, 5000);
  };

  return (
    <>
      <div className="container">
        {step === 0 ? (
          <div className="divContainer">
            <TaskList onNext={onNext} onTasks={onTasks} allTasks={tasks} />
          </div>
        ) : step === 1 ? (
          <>
            <div className="rec-contain2">
              <h1 className="recap font-heading font-medium">Récapitulatif</h1>
              <div className="recapCard">
                {tasks.map((task, index) => {
                  return <SummaryCard key={index} title={task.title} description={task.description} />;
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={"neutral"}
                  onClick={onPrevious}
                  fullWidth
                  size="sm"
                  className="rounded-full mt-6 grow"
                >
                  Retour
                </Button>
                <Button
                  onClick={onLoad}
                  loading={loading}
                  fullWidth
                  size="sm"
                  className="rounded-full mt-6 grow group relative"
                >
                  <IconLoader2 className="group-data-[loading=false]:opacity-0 absolute  animate-spin" />
                  <span className={` group-data-[loading=true]:opacity-0`}>Valider</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <SuccessCard />
        )}
      </div>
    </>
  );
}
