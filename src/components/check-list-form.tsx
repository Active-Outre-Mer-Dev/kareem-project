"use client";

import { CarRelation } from "@/types/database.types";
import { Button, Card, Checkbox, Select, TextInput } from "@aomdev/ui";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import type { SelectProps } from "@aomdev/ui";

type PropTypes = {
  items: SelectProps["items"];
  rememberMe: boolean;
  defaultFirstName: string;
  defaultLastName: string;
  data: {
    last_checked: string | null;
    license_plate: string;
    model: string;
    car_checks: {
      car_license_plate: string;
      name: string;
      id: number;
    }[];
  }[];
};

export function CheckListForm({ items, defaultFirstName, defaultLastName, rememberMe, data }: PropTypes) {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("first_name")?.toString() || "";
    const lastName = formData.get("last_name")?.toString() || "";
    const licensePlate = formData.get("license_plate")?.toString() || "";
    const rememberMe = formData.get("remember_me")?.toString() || "";
    let currentCar: CarRelation | null = null;

    for (const car of data) {
      if (car.license_plate === licensePlate) currentCar = car as CarRelation;
    }

    const res = await fetch("/api/user-check-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, rememberMe: rememberMe === "on", currentCar, licensePlate })
    });
    if (res.ok) {
      const json = await res.json();
      router.push(`/${json.data}`);
    }
  };

  return (
    <Card className="card">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextInput label="Nom" defaultValue={defaultFirstName} required name="first_name" />
        <TextInput label="Prénom" defaultValue={defaultLastName} required name="last_name" />

        <Select items={items} placeholder="Select license plate" fullWidth name="license_plate" required />
        <Checkbox defaultChecked={rememberMe} label="Se souvenir de moi" name="remember_me" />

        <Button fullWidth size="sm" className="rounded-full mt-6">
          Suivant
        </Button>
      </form>
    </Card>
  );
}
