import { SuccessCard } from "@/components/success-card";
import { TasksContainer } from "@/components/tasks-container";
import { UserCard } from "@/components/user-card";
import json from "@/lib/data.json";
import { cookies as nextCookies } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page({ params }: { params: { id: string } }) {
  const cookies = nextCookies();

  let firstName = "";
  let lastName = "";

  firstName = cookies.get("firstName")?.value || "";
  lastName = cookies.get("lastName")?.value || "";

  const car = json.cars.find(car => car.id === params.id);
  if (!car) notFound();
  return (
    <>
      <UserCard lastName={lastName} firstName={firstName} {...car} />
      <TasksContainer id={params.id} licensePlate={"405-AAC"}>
        {/* @ts-expect-error */}
        <SuccessCard car={car} firstName={firstName} lastName={lastName} />
      </TasksContainer>
    </>
  );
}
