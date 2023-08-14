"use client";
import { useReducer, useState, useTransition } from "react";
import { SummaryCard } from "./summary-card";
import { Button, Select, Checkbox } from "@aomdev/ui";
import { IconLoader2 } from "@tabler/icons-react";
import { TaskCard } from "./task-card";
import { initialState, reducer } from "./check-reducer";
import { useRouter } from "next/navigation";

export type Task = {
  name: string | null;
  checked: boolean;
  description: string;
  checklist_id: string;
  id: number;
};

type PropTypes = {
  allTasks: Task[];
  defaultComplete: boolean;
  id: string;
  children: React.ReactNode;
  licensePlate: string;
};

function filterChecks(filter: string, checks: Task[]) {
  return filter === "completed"
    ? checks.filter(task => task.checked)
    : filter === "incomplete"
    ? checks.filter(task => !task.checked)
    : checks;
}

export function TasksContainer({ allTasks, defaultComplete, id, children, licensePlate }: PropTypes) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    checks: allTasks,
    isComplete: defaultComplete
  });

  const filteredChecks = filterChecks(state.filter, state.checks);

  const onLoad = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user-check-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, licensePlate })
      });
      if (res.ok) {
        startTransition(() => {
          router.refresh();
          dispatch({ type: "step", payload: "success" });
        });
      } else {
        const json = await res.json();
        throw new Error(json.message, { cause: json.cause });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        {state.step === "checks" ? (
          <div className="divContainer">
            <div className="tasksfiltre">
              <Select
                value={state.filter}
                onValueChange={payload => dispatch({ type: "filter", payload })}
                items={[
                  { label: "Tout", value: "all" },
                  { label: "Complété", value: "completed" },
                  { label: "Interminé", value: "incomplete" }
                ]}
              />
              {/* <span className="text-gray-600 font-medium">
                {completed.length}/{tasks.length} tâches
              </span> */}
            </div>
            <div className="CARD">
              {filteredChecks.map((check, index) => {
                return (
                  <TaskCard
                    id={check.id}
                    taskDescription={check.description}
                    key={index}
                    title={check.name || ""}
                    onDescription={(id, description) =>
                      dispatch({ type: "description", payload: { id, description } })
                    }
                  >
                    <Checkbox
                      radius={"full"}
                      checked={check.checked}
                      onCheckedChange={() => dispatch({ type: "check", id: check.id })}
                      id={`${check.name}-checkbox`}
                      name={check.name || ""}
                    />
                  </TaskCard>
                );
              })}
            </div>
            <Button
              disabled={!state.isComplete}
              onClick={() => dispatch({ type: "step", payload: "summary" })}
              fullWidth
              size="sm"
              className="rounded-full mt-6"
            >
              Suivant
            </Button>
          </div>
        ) : state.step === "summary" ? (
          <>
            <div className="rec-contain2">
              <h1 className="recap font-heading font-medium">Récapitulatif</h1>
              <div className="recapCard">
                {state.checks.map(check => {
                  return (
                    <SummaryCard key={check.id} title={check.name || ""} description={check.description} />
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={"neutral"}
                  onClick={() => dispatch({ type: "step", payload: "checks" })}
                  fullWidth
                  size="sm"
                  className="rounded-full mt-6 grow"
                >
                  Retour
                </Button>
                <Button
                  onClick={onLoad}
                  loading={loading || isPending}
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
          <>{children}</>
        )}
      </div>
    </>
  );
}
