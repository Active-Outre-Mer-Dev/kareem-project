import { TasksContainer } from "@/components/tasks-container";
import { UserCard } from "@/components/user-card";

export default function Page() {
  return (
    <>
      <UserCard firstName="Agis" lastName="Carty" licensePlate="4503-AAC" />
      <TasksContainer />
    </>
  );
}
