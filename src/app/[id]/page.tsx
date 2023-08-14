import { TasksContainer } from "@/components/tasks-container";
import { notFound } from "next/navigation";
import { SuccessCard } from "@/components/success-card";
import { UserCardContainer } from "@/components/user-card-container";
import { fetchUserList } from "@/lib/fetch-car";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const { data, error } = await fetchUserList(params.id);
  if (error) notFound();
  const defaultComplete = data.user_checks.every(check => check.checked);
  const allTasks = data.user_checks.slice().sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <UserCardContainer listId={params.id} />
      <TasksContainer
        id={params.id}
        allTasks={allTasks}
        defaultComplete={defaultComplete}
        licensePlate={data.license_plate}
      >
        <SuccessCard licensePlate={data.license_plate} listId={params.id} />
      </TasksContainer>
    </>
  );
}
