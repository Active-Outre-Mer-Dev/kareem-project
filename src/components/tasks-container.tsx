"use client";
import { useReducer, useState, useTransition, useEffect } from "react";
import { SummaryCard } from "./summary-card";
import { Button } from "@aomdev/ui";
import { IconLoader2 } from "@tabler/icons-react";
import { TaskCard } from "./task-card";
import { initialState, reducer } from "./check-reducer";
import { checks } from "@/lib/check";
import type { Check } from "@/lib/check";

type PropTypes = {
  id: string;
  licensePlate: string;
  children: React.ReactNode;
};

function filterChecks(filter: string, checks: Check[]) {
  return filter === "completed"
    ? checks.filter(task => task.checked)
    : filter === "incomplete"
    ? checks.filter(task => !task.checked)
    : checks;
}

export function TasksContainer({ children }: PropTypes) {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    checks
  });
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.step]);

  const filteredChecks = filterChecks(state.filter, state.checks);

  const onLoad = async () => {
    setLoading(true);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: state.checks })
    });
    if (res.ok) {
      startTransition(() => {
        dispatch({ type: "step", payload: "success" });
        setLoading(false);
      });
    }
  };

  const canSubmit = state.checks.every(check => {
    if (check.condition === "good") return true;
    return check.notification?.resolved !== undefined && check.notification?.person;
  });

  return (
    <>
      <div className="container mb-20">
        {state.step === "checks" ? (
          <div className="divContainer">
            <div className="CARD">
              {filteredChecks.map((check, index) => {
                return (
                  <TaskCard
                    condition={check.condition}
                    id={check.id}
                    conditions={check.conditions}
                    onCondition={(id, condition) => {
                      dispatch({ type: "condition", payload: { id, condition } });
                    }}
                    key={index}
                    title={check.name || ""}
                  />
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
                    <SummaryCard
                      onPerson={person => dispatch({ type: "person", payload: { person, id: check.id } })}
                      onResolved={resolved =>
                        dispatch({
                          type: "resolved",
                          payload: { id: check.id, resolved: resolved === "yes" }
                        })
                      }
                      condition={check.condition}
                      key={check.id}
                      title={check.name || ""}
                    />
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
                  disabled={!canSubmit}
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
