import { fetchCar, fetchUserList } from "@/lib/fetch-car";
import { UserCard } from "./user-card";

type PropTypes = {
  listId: string;
};

export async function UserCardContainer({ listId }: PropTypes) {
  const { error, data: userListData } = await fetchUserList(listId);
  if (error) throw new Error("");

  const { error: carError, data: carData } = await fetchCar(userListData.license_plate);

  if (carError) throw new Error("");

  return (
    <UserCard
      licensePlate={carData.license_plate}
      firstName={userListData.first_name}
      lastName={userListData.last_name}
      createdAt={userListData.created_at}
      lastChecked={carData.last_checked}
      model={carData.model}
    />
  );
}
