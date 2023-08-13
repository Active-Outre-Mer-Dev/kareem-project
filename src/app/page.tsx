import { TextInput, Card, Button } from "@aomdev/ui";
import { Checkbox } from "./_components/client";
import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookies = nextCookies();
  const rememberMe = cookies.get("rememberMe") || null;
  rememberMe;
  let firstName = "";
  let lastName = "";
  if (rememberMe?.value === "on") {
    firstName = cookies.get("firstName")?.value || "";
    lastName = cookies.get("lastName")?.value || "";
  }

  async function onSubmit(data: FormData) {
    "use server";
    const cookies = nextCookies();
    const firstName = data.get("first_name");
    const lastName = data.get("last_name");
    const licensePlate = data.get("license_plate");
    const rememberMe = data.get("remember_me");
    if (rememberMe === "on") {
      cookies.set("firstName", firstName?.toString() || "");
      cookies.set("lastName", lastName?.toString() || "");
      cookies.set("rememberMe", "on");
    } else {
      cookies.set("rememberMe", "off");
    }
    redirect("/4502");
  }
  return (
    <>
      <>
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <Card className="card">
            <form className="space-y-4" action={onSubmit}>
              <TextInput label="Nom" defaultValue={firstName} required name="first_name" />
              <TextInput label="Prénom" defaultValue={lastName} required name="last_name" />
              <TextInput label="Plaque d'immatriculation" required name="license_plate" />
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
