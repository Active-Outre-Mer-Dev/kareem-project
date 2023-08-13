import { Card } from "@aomdev/ui";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import Link from "next/link";
import Image from "next/image";
import car from "@/assets/car.png";

export function SuccessCard() {
  const formatter = new Intl.DateTimeFormat("fr", { dateStyle: "short", timeStyle: "short" });
  const today = new Date();
  const lastChecked = new Date().setDate(today.getDate() - 5);
  return (
    <Card className="bg-neutral-50 w-4/5 ring-0">
      {" "}
      <div className="flex justify-between mb-4">
        <span className="text-gray-700 font-medium">Kareem Lewis</span>
        <time className="text-gray-60">{formatter.format(new Date())}</time>
      </div>
      <figure className="mb-4 border-b border-neutral-100 space-y-4">
        <Image src={car} alt="" />
        <figcaption className="flex flex-col  border-t border-neutral-100 py-4 items-between gap-2">
          <div className="flex justify-between">
            <span className="font-medium text-lg text-gray-900">Tesla Model S</span>
            <span className="text-gray-700">4503-AAC</span>
          </div>
          <span className="text-sm text-gray-600">Last checked on {formatter.format(lastChecked)}</span>
        </figcaption>
      </figure>
      <h1 className="text-xl font-heading font-medium text-center mb-2">Email sent!</h1>
      <p className="text-center leading-relaxed mb-4">
        Pariatur in et ipsum fugiat sunt laborum ullamco eu non ullamco officia.
      </p>
      <Link href={"/"} className={buttonStyles({ size: "sm" })}>
        Another one
      </Link>
    </Card>
  );
}
