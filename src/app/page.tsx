"use client";
import { TaskCard } from "@/components/task-card";
import { TextInput, Card, Button, Checkbox, Select, ActionIcon, ThemeIcon } from "@aomdev/ui";
import { IconPencil, IconCheck, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { TaskList } from "@/components/task-list";

export default function Home() {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step === 2) return;
    setStep(prev => prev + 1);
  };

  const previous = () => {
    if (step === 1) return;
    setStep(prev => prev - 1);
  };

  return (
    <>
      {step === 0 && (
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <Card className="card">
            <TextInput label="Nom" required />
            <TextInput label="Prénom" required />
            <TextInput label="Plaque d'immatriculation" required />
            <Checkbox label="Se souvenir de moi" />
            <Button onClick={next} fullWidth size="sm" className="rounded-full mt-6">
              Suivant
            </Button>
          </Card>
        </div>
      )}
      {step === 1 && (
        <>
          <div className="bg-gradient-to-b from-tertiary-400 fixed  top-0 left-0 w-full to-primary-500 py-10 rounded-b-3xl">
            <Card className="cardInfo">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">{new Date().toDateString()}</p>
                <ActionIcon>
                  <IconPencil size={"75%"} />
                </ActionIcon>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-800">Kareem Lewis</p>
                <p className="text-gray-800 font-medium">4302-AAC</p>
              </div>
            </Card>
          </div>
          <div className="container">
            <div className="divContainer">
              <TaskList onNext={next} />
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="bg-gradient-to-b from-tertiary-400 fixed  top-0 left-0 w-full to-primary-500 py-10 rounded-b-3xl">
            <Card className="cardInfo">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 font-medium">{new Date().toDateString()}</p>
                <ActionIcon>
                  <IconPencil size={"75%"} />
                </ActionIcon>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-800">Kareem Lewis</p>
                <p className="text-gray-800 font-medium">4302-AAC</p>
              </div>
            </Card>
          </div>
          <div className="rec-contain">
            <div className="rec-contain2">
              <h1 className="recap">
                <strong>Récapitulatif</strong>
              </h1>
              <div className="recapCard">
                <Card className="recap2">Fluide de clignotant</Card>
                <Card className="recap2">Freins</Card>
                <Card className="recap2">Pare-brise</Card>
                <Card className="recap2">Rétroviseurs</Card>
                <Card className="recap2">Pneus</Card>
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
