"use client";
import { TextInput, Card, Button, Checkbox } from "@aomdev/ui";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep(1);
  };

  const previous = () => {
    setStep(0);
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
      {step === 1 && <></>}
    </>
  );
}
