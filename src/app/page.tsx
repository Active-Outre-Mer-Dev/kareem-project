import { cookies as nextCookies } from "next/headers";
import { cars } from "@/lib/car";
import { Button, Card, TextInput } from "@aomdev/ui";
import { Checkbox, Select } from "./_components/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookies = nextCookies();
  const rememberMe = cookies.get("rememberMe") || null;

  let firstName = "";
  let lastName = "";

  if (rememberMe?.value === "on") {
    firstName = cookies.get("firstName")?.value || "";
    lastName = cookies.get("lastName")?.value || "";
  }

  const formSubmit = async (data: FormData) => {
    "use server";
    const cookies = nextCookies();
    const remember = data.get("remember_me")?.toString() || "";
    const firstName = data.get("first_name")?.toString() || "";
    const lastName = data.get("last_name")?.toString() || "";
    const licensePlate = data.get("license_plate")?.toString() || "";

    const cookieOptions = { httpOnly: true, maxAge: 60 * 60 * 24 * 3 };
    if (remember === "on") {
      cookies.set("firstName", firstName, cookieOptions);
      cookies.set("lastName", lastName, cookieOptions);
      cookies.set("rememberMe", "on", cookieOptions);
    } else {
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("rememberMe", "");
    }
    redirect(`/${licensePlate}`);
  };

  const plates = cars.map(car => ({ label: car.licensePlate, value: car.id }));
  return (
    <>
      <>
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <Card className="card">
            <form className="space-y-4" action={formSubmit}>
              <TextInput label="Nom" defaultValue={firstName} required name="first_name" />
              <TextInput label="Prénom" defaultValue={lastName} required name="last_name" />

              <Select
                items={plates}
                placeholder="Select license plate"
                fullWidth
                name="license_plate"
                required
              />
              <Checkbox
                defaultChecked={rememberMe?.value === "on"}
                label="Se souvenir de moi"
                name="remember_me"
              />

              <Button fullWidth size="sm" className="rounded-full mt-6">
                Suivant
              </Button>
            </form>
          </Card>
        </div>
      </>
    </>
  );
}
