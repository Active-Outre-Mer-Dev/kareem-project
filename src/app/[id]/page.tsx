import { SuccessCard } from "@/components/success-card";
import { TasksContainer } from "@/components/tasks-container";
import { UserCard } from "@/components/user-card";
import { cars } from "@/lib/car";
import { cookies as nextCookies } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page({ params }: { params: { id: string } }) {
  const cookies = nextCookies();
  const rememberMe = cookies.get("rememberMe") || null;

  let firstName = "";
  let lastName = "";

  firstName = cookies.get("firstName")?.value || "";
  lastName = cookies.get("lastName")?.value || "";

  const car = cars.find(car => car.id === params.id);
  if (!car) notFound();
  return (
    <>
      <UserCard lastName={lastName} firstName={firstName} {...car} />
      <TasksContainer id={params.id} licensePlate={"405-AAC"}>
        <SuccessCard car={car} firstName={firstName} lastName={lastName} />
      </TasksContainer>
    </>
  );
}
