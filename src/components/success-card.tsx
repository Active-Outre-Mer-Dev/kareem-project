import { Card } from "@aomdev/ui";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import Link from "next/link";
import Image from "next/image";
import carPic from "@/assets/car.png";
import type { Car } from "@/lib/car";

type PropTypes = {
  firstName: string;
  lastName: string;
  car: Car;
};

export function SuccessCard({ car, firstName, lastName }: PropTypes) {
  const formatter = new Intl.DateTimeFormat("fr", { dateStyle: "short", timeStyle: "short" });
  return (
    <Card className="bg-neutral-50 w-4/5 ring-0">
      {" "}
      <div className="flex justify-between mb-4">
        <span className="text-gray-700 font-medium">
          {firstName} {lastName}
        </span>
        <time className="text-gray-60">{formatter.format(new Date())}</time>
      </div>
      <figure className="mb-4 border-b border-neutral-100 space-y-4">
        <Image src={carPic} alt="" />
        <figcaption className="flex flex-col  border-t border-neutral-100 py-4 items-between gap-2">
          <div className="flex justify-between">
            <span className="font-medium text-lg text-gray-900">{car.model}</span>
            <span className="text-gray-700">{car.licensePlate}</span>
          </div>
        </figcaption>
      </figure>
      <h1 className="text-xl font-heading font-medium text-center mb-2">Email sent!</h1>
      <Link href={"/"} className={buttonStyles({ size: "sm" })}>
        Another one
      </Link>
    </Card>
  );
}
