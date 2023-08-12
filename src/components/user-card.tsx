import { ActionIcon, Card } from "@aomdev/ui";
import { IconPencil } from "@tabler/icons-react";

type PropTypes = {
  firstName: string;
  lastName: string;
  licensePlate: string;
};

export function UserCard({ firstName, lastName, licensePlate }: PropTypes) {
  return (
    <Card className="cardInfo">
      <div className="flex justify-between">
        <p className="text-sm text-gray-600 font-medium">{new Date().toDateString()}</p>
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
    </Card>
  );
}
