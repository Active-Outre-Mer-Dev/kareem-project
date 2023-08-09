"use client";
import { TextInput, Card, Button, Checkbox } from "@aomdev/ui";

export default function Home() {
  return (
    <>
    <div className="cardcontainer">
    <h1 className="font-heading font-medium text-3xl">Connexion</h1>
      <Card className="card">
        <TextInput label="Nom" required />
        <TextInput label="Prénom" required />
        <TextInput label="Plaque d'immatriculation" required />
        <Checkbox label="Se souvenir de moi" />
        <Button fullWidth size="sm" className="rounded-full mt-6">
        Suivant
        </Button>
      </Card>
    </div>
    </>
  );
}
