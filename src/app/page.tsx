"use client";
import { TextInput, Card, Button, Checkbox, ActionIcon } from "@aomdev/ui";
import { IconPencil } from "@tabler/icons-react";
import { FormEvent, useState, useEffect } from "react";
import { TaskList } from "@/components/task-list";
import { SummaryCard } from "@/components/summary-card";
import { UserCard } from "@/components/user-card";

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

export default function Home() {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(allTasks);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [rememberMe, setRememberMe] = useState<string | null>(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const rememberMe = localStorage.getItem("rememberMe" || null);
    if (firstName && lastName && rememberMe === "on") {
      setFirstName(firstName);
      setLastName(lastName);
      setRememberMe("on");
    }
  }, []);

  const next = () => {
    if (step === 2) return;
    setStep(prev => prev + 1);
  };

  const previous = () => {
    if (step === 1) return;
    setStep(prev => prev - 1);
  };

  const onTasks = (tasks: typeof allTasks) => {
    setTasks(tasks);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first_name")?.toString() || "";
    const lastName = formData.get("last_name")?.toString() || "";
    const rememberMe = formData.get("remember_me");
    const licensePlate = formData.get("license_plate")?.toString() || "";

    if (rememberMe?.toString() === "on") {
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("rememberMe", "on");
    } else {
      localStorage.clear();
    }
    setFirstName(firstName);
    setLastName(lastName);
    setLicensePlate(licensePlate);
    next();
  };
  return (
    <>
      {step === 0 && (
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <Card className="card">
            <form className="space-y-4" onSubmit={onSubmit}>
              <TextInput label="Nom" required name="first_name" defaultValue={firstName} />
              <TextInput label="Prénom" required name="last_name" defaultValue={lastName} />
              <TextInput label="Plaque d'immatriculation" required name="license_plate" />
              <Checkbox
                checked={rememberMe === "on"}
                onCheckedChange={e => setRememberMe(e.valueOf() ? "on" : null)}
                label="Se souvenir de moi"
                name="remember_me"
              />
              <Button fullWidth size="sm" className="rounded-full mt-6">
                Suivant
              </Button>
            </form>
          </Card>
        </div>
      )}
      {step === 1 && (
        <>
          <div className="bg-gradient-to-b from-tertiary-400 fixed  top-0 left-0 w-full to-primary-500 py-10 rounded-b-3xl">
            <UserCard firstName={firstName} lastName={lastName} licensePlate={licensePlate} />
          </div>
          <div className="container">
            <div className="divContainer">
              <TaskList onNext={next} onTasks={onTasks} allTasks={tasks} />
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="bg-gradient-to-b from-tertiary-400 fixed  top-0 left-0 w-full to-primary-500 py-10 rounded-b-3xl">
            <UserCard firstName={firstName} lastName={lastName} licensePlate={licensePlate} />
          </div>
          <div className="rec-contain">
            <div className="rec-contain2">
              <h1 className="recap font-heading font-medium">Récapitulatif</h1>
              <div className="recapCard">
                {tasks.map(task => {
                  return <SummaryCard title={task.title} description={task.description} />;
                })}
              </div>

              <div className="flex gap-2">
                <Button fullWidth size="sm" className="rounded-full mt-6 grow">
                  Valider
                </Button>
                <Button
                  variant={"neutral"}
                  onClick={previous}
                  fullWidth
                  size="sm"
                  className="rounded-full mt-6 grow"
                >
                  Retour
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
