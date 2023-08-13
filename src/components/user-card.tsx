"use client";
import { ActionIcon, Card } from "@aomdev/ui";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { IconUsers, IconGasStation, IconManualGearbox, IconPaint } from "@tabler/icons-react";
import Image from "next/image";
import car from "@/assets/car.png";

type PropTypes = {
  firstName: string;
  lastName: string;
  licensePlate: string;
};

export function UserCard({ firstName, lastName, licensePlate }: PropTypes) {
  const formatter = new Intl.DateTimeFormat("fr", { dateStyle: "short", timeStyle: "short" });
  const [open, setOpen] = useState(false);
  const today = new Date();
  return (
    <div
      onClick={() => setOpen(prev => !prev)}
      data-open={open}
      className="bg-gradient-to-b from-tertiary-400 fixed  top-0 left-0 w-full to-primary-500 h-32 data-[open=false]:rounded-b-3xl data-[open=true]:h-screen z-50 "
    >
      <div className="h-1 bg-white absolute bottom-2 left-2/4 -translate-x-2/4 w-2/4 rounded-full" />
      <Card className="cardInfo">
        {!open ? (
          <>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 font-medium">{formatter.format(new Date())}</p>
              <ActionIcon>
                <IconPencil size={"75%"} />
              </ActionIcon>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-800">
                {firstName} {lastName}
              </p>
              <p className="text-gray-800 font-medium">{licensePlate}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <span className="font-medium text-gray-800">
                {firstName} {lastName}
              </span>
              <span className="text-gray-600">{formatter.format(new Date())}</span>
            </div>
            <figure className="mb-4 border-b border-neutral-100 space-y-4">
              <Image src={car} alt="" />
              <figcaption className="flex flex-col  border-t border-neutral-100 py-4 items-between gap-2">
                <div className="flex justify-between">
                  <span className="font-medium text-lg text-gray-900">Tesla Model S</span>
                  <span className="text-gray-700">{licensePlate}</span>
                </div>
                <span className="text-sm text-gray-600">Last checked on {formatter.format(today)}</span>
              </figcaption>
            </figure>
            <p className="uppercase text-gray-500  font-medium mb-4">Basic configuration</p>
            <div className="grid grid-cols-2 gap-y-2 text-gray-800 ">
              <span className="basis-1/2 grow">
                <IconUsers size={16} className="text-gray-600 mr-2 inline-block" />5 Passengers
              </span>
              <span className="basis-1/2 grow">
                <IconGasStation size={16} className="text-gray-600 mr-2 inline-block" />
                Electric
              </span>
              <span className="basis-1/2 grow">
                <IconPaint size={16} className="text-gray-600 mr-2 inline-block" />
                Red
              </span>
              <span className="basis-1/2 grow">
                <IconManualGearbox size={16} className="text-gray-600 mr-2 inline-block" />
                Automatic
              </span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
